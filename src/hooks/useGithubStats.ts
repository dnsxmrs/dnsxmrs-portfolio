import { useState, useEffect } from 'react';

export interface GithubStats {
  publicRepos: number;
  followers: number;
  following: number;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
}

export function useGithubStats(username: string) {
  const [stats, setStats] = useState<GithubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        // Fetch user profile
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) throw new Error('Failed to fetch user profile');
        const user = await userRes.json();

        // Fetch PRs and Issues (last 100 events)
        const eventsRes = await fetch(`https://api.github.com/users/${username}/events/public`);
        if (!eventsRes.ok) throw new Error('Failed to fetch user events');
        const events = await eventsRes.json();

        let totalCommits = 0;
        let totalPRs = 0;
        let totalIssues = 0;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        events.forEach((event: any) => {
          if (event.type === 'PushEvent') totalCommits += event.payload.commits?.length || 0;
          if (event.type === 'PullRequestEvent') totalPRs += 1;
          if (event.type === 'IssuesEvent') totalIssues += 1;
        });

        setStats({
          publicRepos: user.public_repos,
          followers: user.followers,
          following: user.following,
          totalCommits,
          totalPRs,
          totalIssues,
        });
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setStats(null);
      } finally {
        setLoading(false);
      }
    }
    if (username) fetchStats();
  }, [username]);

  return { stats, loading, error };
}
