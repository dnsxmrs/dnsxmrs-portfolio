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
            cache: 'no-store',
        });

        const data = await res.json();

        // Forward the Link header for pagination support
        const linkHeader = res.headers.get('Link');
        const headers: HeadersInit = {
            'Cache-Control': 'no-store, max-age=0',
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
