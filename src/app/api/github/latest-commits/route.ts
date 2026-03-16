import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    const limit = parseInt(searchParams.get('limit') || '5');

    if (!username) return NextResponse.json({ error: 'Username required' }, { status: 400 });

    try {
        // 1. Fetch repos (Sorted by last updated)
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`, {
            headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` }
        });
        const repos = await reposRes.json();

        // 2. Fetch commits from these repos in PARALLEL
        const commitPromises = repos.map(async (repo: any) => {
            const res = await fetch(`https://api.github.com/repos/${username}/${repo.name}/commits?per_page=3&author=${username}`, {
                headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` }
            });
            return res.ok ? await res.json() : [];
        });

        const results = await Promise.all(commitPromises);
        const allCommits = results.flat();

        // 3. Sort and limit
        const latestCommits = allCommits
            .sort((a, b) => new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime())
            .slice(0, limit);

        // 4. Fetch details (stats) for only the final survivors
        const finalCommits = await Promise.all(latestCommits.map(async (c: any) => {
            const detailRes = await fetch(c.url, {
                headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` }
            });
            const details = await detailRes.json();
            return {
                sha: c.sha,
                message: c.commit.message.split('\n')[0],
                date: c.commit.author.date,
                additions: details.stats?.additions || 0,
                deletions: details.stats?.deletions || 0,
                repo: c.repository?.name || "Unknown"
            };
        }));

        return NextResponse.json(finalCommits, {
            headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate' }
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to sync' }, { status: 500 });
    }
}