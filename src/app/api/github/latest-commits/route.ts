import { NextResponse } from 'next/server';
import { getLatestUserCommits } from '@/lib/github';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    const limit = parseInt(searchParams.get('limit') || '5');

    if (!username) return NextResponse.json({ error: 'Username required' }, { status: 400 });

    try {
        const finalCommits = await getLatestUserCommits(username, limit, {
            token: process.env.GITHUB_TOKEN,
        });

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