import { NextResponse } from "next/server";
import { getRecentTracks } from "@/lib/lastfm";
import { getCurrentlyPlaying } from "@/lib/spotify";

export const dynamic = "force-dynamic";

const API_KEY = process.env.LASTFM_API_KEY;

export async function GET() {
    try {
        const spotify = await getCurrentlyPlaying();

        if (spotify.status === "playing") {
            const track = spotify.track;

            return NextResponse.json({
                isPlaying: true,
                title: track.name,
                artist: track.artists?.map((artist) => artist.name).join(", ") || "Unknown artist",
                album: track.album?.name || "",
                albumImageUrl: track.album?.images?.[0]?.url,
                songUrl: track.external_urls?.spotify,
                durationMs: track.duration_ms || 0,
                fetchedAt: Date.now() - spotify.progressMs,
            });
        }

        if (spotify.status === "idle") {
            return NextResponse.json({ isPlaying: false });
        }
    } catch (error) {
        console.error("Spotify fetching error; falling back to Last.fm:", error);
    }

    try {
        const response = await getRecentTracks();

        if (!response.ok) {
            return NextResponse.json(
                { isPlaying: false },
                { status: 500 }
            );
        }

        const data = await response.json();
        const tracks = data?.recenttracks?.track;

        if (!tracks || !tracks.length) {
            return NextResponse.json({ isPlaying: false });
        }

        const track = tracks[0];
        const isPlaying = track["@attr"]?.nowplaying === "true";

        if (!isPlaying) {
            return NextResponse.json({ isPlaying: false });
        }

        // Fetch track duration from track.getInfo
        let durationMs = 0;
        try {
            const trackInfoRes = await fetch(
                `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${API_KEY}&artist=${encodeURIComponent(track.artist["#text"])}&track=${encodeURIComponent(track.name)}&format=json`
            );
            if (trackInfoRes.ok) {
                const trackInfo = await trackInfoRes.json();
                durationMs = parseInt(trackInfo?.track?.duration || "0", 10);
            }
        } catch {
            // Duration fetch failed — we'll fall back to idle polling on the client
        }

        return NextResponse.json({
            isPlaying: true,
            title: track.name,
            artist: track.artist["#text"],
            album: track.album["#text"],
            albumImageUrl: track.image[track.image.length - 1]["#text"],
            songUrl: track.url,
            durationMs, // 0 if unknown
            fetchedAt: Date.now(), // client uses this to estimate remaining time
        });
    } catch (error) {
        console.error("Last.fm fetching error:", error);
        return NextResponse.json(
            { isPlaying: false },
            { status: 500 }
        );
    }
}
