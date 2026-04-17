import { use } from 'react';

interface CommitData {
  sha: string;
  message: string;
  date: string;
  additions: number;
  deletions: number;
  repo: string;
  url: string;
}

interface CommitResult {
  commits: CommitData[];
  error: string | null;
}

// Cache promises so the same request isn't fired twice across re-renders
const promiseCache = new Map<string, Promise<CommitResult>>();

function getCommitsPromise(username: string, limit: number): Promise<CommitResult> {
  const key = `${username}:${limit}`;

  if (!promiseCache.has(key)) {
    const promise = fetch(
      `/api/github/latest-commits?username=${encodeURIComponent(username)}&limit=${limit}`,
      { cache: 'no-store' }
    )
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          return {
            commits: [] as CommitData[],
            error: (errorData.error as string) || 'Failed to fetch commits',
          };
        }
        const data: CommitData[] = await res.json();
        return { commits: data, error: null };
      })
      .catch((err) => {
        // Allow retry on network failure
        promiseCache.delete(key);
        return {
          commits: [] as CommitData[],
          error: err instanceof Error ? err.message : 'An unknown error occurred',
        };
      });

    promiseCache.set(key, promise);
  }

  return promiseCache.get(key)!;
}

/**
 * Suspense-based hook — the component will suspend until
 * the fetch completes, so `loading` is always false on return.
 * Wrap the consuming component in <Suspense> for a loading fallback.
 */
export function useGithubCommits(username: string, limit: number = 5) {
  const { commits, error } = use(getCommitsPromise(username, limit));
  return { commits, loading: false as const, error };
}