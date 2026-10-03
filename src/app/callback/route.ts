import { NextRequest, NextResponse } from "next/server";
import { exchangeSpotifyCode } from "@/lib/spotify";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    const code = request.nextUrl.searchParams.get("code");
    const error = request.nextUrl.searchParams.get("error");
    const returnedState = request.nextUrl.searchParams.get("state");
    const storedState = request.cookies.get("spotify_oauth_state")?.value;

    if (error) {
        return NextResponse.json({ error: `Spotify authorization was denied: ${error}` }, { status: 400 });
    }

    if (!returnedState || !storedState || returnedState !== storedState) {
        return NextResponse.json({ error: "Spotify OAuth state validation failed" }, { status: 400 });
    }

    if (!code) {
        return NextResponse.json({ error: "Spotify authorization code is missing" }, { status: 400 });
    }

    try {
        const refreshToken = await exchangeSpotifyCode(code);
        const response = new NextResponse(
            [
                "Spotify authorization succeeded.",
                "",
                "Add this value to .env.local as SPOTIFY_REFRESH_TOKEN, then restart the dev server:",
                "",
                refreshToken,
            ].join("\n"),
            {
                headers: {
                    "Content-Type": "text/plain; charset=utf-8",
                },
            }
        );

        response.cookies.delete("spotify_oauth_state");
        return response;
    } catch (error) {
        console.error("Spotify callback failed:", error);
        return NextResponse.json({ error: "Spotify authorization could not be completed" }, { status: 500 });
    }
}
