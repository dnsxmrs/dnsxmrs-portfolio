import { NextResponse, type NextRequest } from 'next/server';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ path: string[] }> }
) {
    const { path } = await context.params;
    const { searchParams } = new URL(request.url);
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
        return NextResponse.json(
            { error: 'Server configuration error: GITHUB_TOKEN missing' },
            { status: 500 }
        );
    }

    try {
        // Construct the GitHub API URL with query parameters
        const githubUrl = new URL(`https://api.github.com/${path.join('/')}`);
        searchParams.forEach((value, key) => {
            githubUrl.searchParams.append(key, value);
        });

        const res = await fetch(githubUrl.toString(), {
            headers: {
                Authorization: `Bearer ${token}`,
                'X-GitHub-Api-Version': '2022-11-28',
                Accept: 'application/vnd.github+json',
            },
            // Cache for 1 hour on server, revalidate in background
            next: { revalidate: 3600 },
        });

        const data = await res.json();

        // Forward the Link header for pagination support
        const linkHeader = res.headers.get('Link');
        const headers: HeadersInit = {
            // Cache in browser for 5 minutes, stale-while-revalidate for 1 hour
            // This significantly reduces API calls while keeping data fresh
            'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
        };

        if (linkHeader) {
            headers['Link'] = linkHeader;
        }

        return NextResponse.json(data, {
            status: res.status,
            headers
        });
    } catch (error) {
        console.error('GitHub API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
