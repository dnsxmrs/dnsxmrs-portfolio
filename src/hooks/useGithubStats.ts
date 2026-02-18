import { useState, useEffect } from 'react';

interface GithubEvent {
    type: string;
}

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
                // Fetch user profile via Next.js proxy
                const userRes = await fetch(`/api/github/users/${username}`, {
                    cache: 'no-store',
                });
                if (!userRes.ok) throw new Error('Failed to fetch user profile');
                const user = await userRes.json();

                // Fetch PRs and Issues (last 100 events) via Next.js proxy
                const eventsRes = await fetch(`/api/github/users/${username}/events/public`, {
                    cache: 'no-store',
                });
                if (!eventsRes.ok) throw new Error('Failed to fetch user events');
                const events = await eventsRes.json();

                let totalCommits = 0;
                let totalPRs = 0;
                let totalIssues = 0;

                events.forEach((event: GithubEvent) => {
                    if (event.type === 'PushEvent') totalCommits += 1;
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
