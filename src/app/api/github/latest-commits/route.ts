import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface Repo {
    name: string;
}

interface GitHubCommit {
    sha: string;
    url: string;
    commit: {
        message: string;
        author: {
            date: string;
        };
    };
    repository?: {
        name: string;
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

        // 1. Fetch repos (sorted by last updated)
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`, {
            headers: githubHeaders,
            cache: 'no-store',
        });

        if (!reposRes.ok) {
            const err = await reposRes.json().catch(() => ({}));
            return NextResponse.json(
                { error: err?.message || 'Failed to fetch repositories from GitHub' },
                { status: reposRes.status }
            );
        }

        const reposJson: unknown = await reposRes.json();
        const repos: Repo[] = Array.isArray(reposJson) ? reposJson : [];

        // 2. Fetch commits from these repos in PARALLEL
        const commitPromises = repos.map(async (repo: Repo) => {
            const res = await fetch(`https://api.github.com/repos/${username}/${repo.name}/commits?per_page=3&author=${username}`, {
                headers: githubHeaders,
                cache: 'no-store',
            });
            if (!res.ok) return [];
            const commits: GitHubCommit[] = await res.json();
            return commits.map((c) => ({ ...c, repository: { name: repo.name } }));
        });

        const results = await Promise.all(commitPromises);
        const allCommits: GitHubCommit[] = results.flat();

        // 3. Sort and limit
        const latestCommits = allCommits
            .sort((a, b) => new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime())
            .slice(0, limit);

        // 4. Fetch details (stats) for only the final survivors
        const finalCommits = await Promise.all(latestCommits.map(async (c: GitHubCommit) => {
            const detailRes = await fetch(c.url, {
                headers: githubHeaders,
                cache: 'no-store',
            });
            const details: GitHubCommit | null = detailRes.ok ? await detailRes.json() : null;
            return {
                sha: c.sha,
                message: c.commit.message.split('\n')[0],
                date: c.commit.author.date,
                additions: details?.stats?.additions || 0,
                deletions: details?.stats?.deletions || 0,
                repo: c.repository?.name || "Unknown"
            };
        }));

        return NextResponse.json(finalCommits, {
            headers: { 'Cache-Control': 'no-store, max-age=0' }
        });
    } catch (error: unknown) {
        console.error('Failed to sync GitHub commits:', error);
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to sync commits' }, { status: 500 });
    }
}