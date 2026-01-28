import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: { path: string[] } }
) {
    const path = params.path.join('/');
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
        return NextResponse.json(
            { error: 'Server configuration error: GITHUB_TOKEN missing' },
            { status: 500 }
        );
    }

    try {
        const res = await fetch(`https://api.github.com/${path}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'X-GitHub-Api-Version': '2022-11-28',
            },
            next: { revalidate: 3600 }, // Cache data for 1 hour to save API calls
        });

        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        console.error('GitHub API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
