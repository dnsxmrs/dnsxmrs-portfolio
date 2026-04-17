import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface EventCommit {
    sha: string;
    message: string;
    url: string; // API URL for commit details
}

interface PushEvent {
    type: string;
    repo: { name: string }; // "user/repo"
    created_at: string;
    payload: {
        commits?: EventCommit[];
    };
}

interface CommitDetail {
    sha: string;
    commit: {
        author: {
            date: string;
        };
    };
    stats?: {
        additions: number;
        deletions: number;
    };
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    const limit = parseInt(searchParams.get('limit') || '5');
    const token = process.env.GITHUB_TOKEN;

    if (!username) return NextResponse.json({ error: 'Username required' }, { status: 400 });

    try {
        const githubHeaders: HeadersInit = {
            'X-GitHub-Api-Version': '2022-11-28',
            Accept: 'application/vnd.github+json',
        };

        if (token) {
            githubHeaders.Authorization = `Bearer ${token}`;
        }

        // 1. Fetch recent events across ALL repos in a single call
        const eventsRes = await fetch(
            `https://api.github.com/users/${username}/events?per_page=100`,
            { headers: githubHeaders, cache: 'no-store' }
        );

        if (!eventsRes.ok) {
            const err = await eventsRes.json().catch(() => ({}));
            return NextResponse.json(
                { error: err?.message || 'Failed to fetch events from GitHub' },
                { status: eventsRes.status }
            );
        }

        const events: PushEvent[] = await eventsRes.json();

        // 2. Extract individual commits from PushEvents (already chronological)
        const rawCommits: { sha: string; message: string; url: string; repo: string; eventDate: string }[] = [];

        for (const event of events) {
            if (event.type !== 'PushEvent' || !event.payload.commits) continue;

            const repoShortName = event.repo.name.split('/')[1] || event.repo.name;

            for (const commit of event.payload.commits) {
                rawCommits.push({
                    sha: commit.sha,
                    message: commit.message.split('\n')[0],
                    url: commit.url,
                    repo: repoShortName,
                    eventDate: event.created_at,
                });
            }
        }

        // 3. Deduplicate by SHA (same commit can appear in multiple events) & take top N
        const seen = new Set<string>();
        const uniqueCommits = rawCommits.filter((c) => {
            if (seen.has(c.sha)) return false;
            seen.add(c.sha);
            return true;
        }).slice(0, limit);

        // 4. Fetch stats for only the final commits
        const finalCommits = await Promise.all(
            uniqueCommits.map(async (c) => {
                const detailRes = await fetch(c.url, {
                    headers: githubHeaders,
                    cache: 'no-store',
                });
                const details: CommitDetail | null = detailRes.ok ? await detailRes.json() : null;

                return {
                    sha: c.sha,
                    message: c.message,
                    date: details?.commit?.author?.date || c.eventDate,
                    additions: details?.stats?.additions || 0,
                    deletions: details?.stats?.deletions || 0,
                    repo: c.repo,
                    url: `https://github.com/${username}/${c.repo}/commit/${c.sha}`,
                };
            })
        );

        return NextResponse.json(finalCommits, {
            headers: { 'Cache-Control': 'no-store, max-age=0' },
        });
    } catch (error: unknown) {
        console.error('Failed to sync GitHub commits:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to sync commits' },
            { status: 500 }
        );
    }
}