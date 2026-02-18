import { useState, useEffect } from 'react';

interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
  stats?: {
    additions: number;
    deletions: number;
  };
}

interface CommitData {
  sha: string;
  message: string;
  author: string;
  date: string;
  url: string;
  additions: number;
  deletions: number;
  repo: string;
}

export function useGithubCommits(username: string, limit: number = 5) {
  const [commits, setCommits] = useState<CommitData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get user's repositories via Next.js proxy
        const reposResponse = await fetch(
          `/api/github/users/${username}/repos?sort=updated&per_page=10`,
          { cache: 'no-store' }
        );

        if (!reposResponse.ok) {
          throw new Error('Failed to fetch repositories');
        }

        const repos = await reposResponse.json();
        const allCommits: CommitData[] = [];

        // Fetch commits from each repo
        for (const repo of repos.slice(0, 5)) {
          try {
            const commitsResponse = await fetch(
              `/api/github/repos/${username}/${repo.name}/commits?per_page=3&author=${username}`,
              { cache: 'no-store' }
            );

            if (commitsResponse.ok) {
              const repoCommits: GitHubCommit[] = await commitsResponse.json();

              for (const commit of repoCommits) {
                // Fetch commit details for stats via Next.js proxy
                const commitDetailResponse = await fetch(
                  `/api/github/repos/${username}/${repo.name}/commits/${commit.sha}`,
                  { cache: 'no-store' }
                );

                if (commitDetailResponse.ok) {
                  const commitDetail = await commitDetailResponse.json();

                  allCommits.push({
                    sha: commit.sha,
                    message: commit.commit.message.split('\n')[0], // First line only
                    author: commit.commit.author.name,
                    date: commit.commit.author.date,
                    url: commit.html_url,
                    additions: commitDetail.stats?.additions || 0,
                    deletions: commitDetail.stats?.deletions || 0,
                    repo: repo.name,
                  });
                }
              }
            }
          } catch (err) {
            console.error(`Error fetching commits for ${repo.name}:`, err);
          }
        }

        // Sort by date and limit
        const sortedCommits = allCommits
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, limit);

        setCommits(sortedCommits);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch commits');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchCommits();
    }
  }, [username, limit]);

  return { commits, loading, error };
}
