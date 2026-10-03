import { NextResponse } from "next/server";
import { getSpotifyAuthorizationUrl } from "@/lib/spotify";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const state = crypto.randomUUID();
        const response = NextResponse.redirect(getSpotifyAuthorizationUrl(state));

        response.cookies.set("spotify_oauth_state", state, {
            httpOnly: true,
            maxAge: 600,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Spotify login setup failed:", error);
        return NextResponse.json({ error: "Spotify login is not configured" }, { status: 500 });
    }
}
