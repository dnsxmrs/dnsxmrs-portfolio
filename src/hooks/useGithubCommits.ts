import { useState, useEffect } from 'react';

interface CommitData {
  sha: string;
  message: string;
  date: string;
  additions: number;
  deletions: number;
  repo: string;
  url: string;
}

export function useGithubCommits(username: string, limit: number = 5) {
  const [commits, setCommits] = useState<CommitData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/github/latest-commits?username=${username}&limit=${limit}`);

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Failed to fetch commits');
        }

        const data = await res.json();
        setCommits(data);
      } catch (err: unknown) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setCommits([]); // Ensure commits is an empty array on error
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [username, limit]);

  return { commits, loading, error };
}