'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { FaSpotify } from 'react-icons/fa';
import Image from 'next/image';
import { Music2 } from 'lucide-react';

type NowPlayingData = {
    isPlaying: boolean;
    title?: string;
    artist?: string;
    album?: string;
    albumImageUrl?: string;
    songUrl?: string;
    durationMs?: number;
    fetchedAt?: number; // server timestamp (Date.now())
};

const IDLE_INTERVAL = 30_000;       // 30s when nothing is playing
const BUFFER = 2_000;               // 2s buffer after estimated song end
const FALLBACK_INTERVAL = 30_000;   // 30s if duration/progress unknown while playing

export default function NowPlayingWidget() {
    const [data, setData] = useState<NowPlayingData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Track when the fetch request was sent (client clock) to avoid drift
    const fetchSentAtRef = useRef<number>(0);

    // ── Clear any pending timer ─────────────────────────────────────
    const clearTimer = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, []);

    // ── Schedule the next poll based on song state ──────────────────
    const scheduleNext = useCallback(
        (result: NowPlayingData, clientFetchTime: number) => {
            clearTimer();

            let delay: number;

            if (!result.isPlaying) {
                // State A — Idle: poll every 30s
                delay = IDLE_INTERVAL;
            } else if (
                result.durationMs &&
                result.durationMs > 0 &&
                result.fetchedAt
            ) {
                // State B — Playing with known duration
                // Use client-side elapsed time since we sent the request
                // to avoid server/client clock drift
                const clientElapsed = Date.now() - clientFetchTime;
                const remaining = result.durationMs - clientElapsed;
                delay = Math.max(remaining + BUFFER, BUFFER);
            } else {
                // State C — Fallback: duration unknown
                delay = FALLBACK_INTERVAL;
            }

            timeoutRef.current = setTimeout(fetchNowPlaying, delay);
        },
        [] // eslint-disable-line react-hooks/exhaustive-deps
    );

    // ── Fetch now-playing data ──────────────────────────────────────
    const fetchNowPlaying = useCallback(async () => {
        const sentAt = Date.now();
        fetchSentAtRef.current = sentAt;

        try {
            const res = await fetch('/api/now-playing');
            if (res.ok) {
                const json: NowPlayingData = await res.json();
                setData(json);
                scheduleNext(json, sentAt);
            } else {
                scheduleNext({ isPlaying: false }, sentAt);
            }
        } catch (error) {
            console.error('Error fetching now playing:', error);
            scheduleNext({ isPlaying: false }, sentAt);
        } finally {
            setIsLoading(false);
        }
    }, [scheduleNext]);

    // ── Initial fetch + cleanup ─────────────────────────────────────
    useEffect(() => {
        fetchNowPlaying();
        return clearTimer;
    }, [fetchNowPlaying, clearTimer]);

    // ── Tab Visibility: pause when hidden, refresh when visible ─────
    useEffect(() => {
        const handleVisibility = () => {
            if (document.visibilityState === 'hidden') {
                // Tab hidden → kill all timers (save API calls)
                clearTimer();
            } else {
                // Tab visible → immediate refresh + restart scheduling
                fetchNowPlaying();
            }
        };

        document.addEventListener('visibilitychange', handleVisibility);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibility);
        };
    }, [fetchNowPlaying, clearTimer]);

    // ── Loading skeleton ────────────────────────────────────────────
    if (isLoading) {
        return (
            <div className="bento-card w-full h-full animate-pulse flex flex-col gap-4 items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[var(--border)]" />
                <div className="space-y-2 w-full max-w-[140px]">
                    <div className="h-3 bg-[var(--border)] rounded-full w-full" />
                    <div className="h-2.5 bg-[var(--border)] rounded-full w-2/3 mx-auto" />
                </div>
            </div>
        );
    }

    // ── Idle state ──────────────────────────────────────────────────
    if (!data?.isPlaying) {
        return (
            <div className="bento-card w-full h-full flex flex-col items-center justify-center gap-3 text-center">
                <div className="w-14 h-14 rounded-full bg-[var(--border)]/60 flex items-center justify-center">
                    <Music2 className="w-6 h-6 text-[var(--muted-foreground)]" />
                </div>
                <div>
                    <p className="text-sm font-medium text-[var(--foreground)]">Not listening</p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-0.5 flex items-center justify-center gap-1">
                        <FaSpotify className="w-3 h-3" /> Spotify
                    </p>
                </div>
            </div>
        );
    }

    // ── Now Playing state ───────────────────────────────────────────
    return (
        <a
            href={data.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bento-card w-full h-full flex flex-col items-center justify-between group relative overflow-hidden"
        >
            {/* Green glow when playing */}
            <div className="absolute inset-0 bg-[#1DB954]/5 pointer-events-none rounded-2xl" />

            {/* Header */}
            <div className="w-full flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] flex items-center gap-1.5">
                    <span className="flex gap-[3px] h-2.5 items-end">
                        <span className="w-[3px] bg-[#1DB954] rounded-t animate-[music-bar_1s_ease-in-out_infinite] origin-bottom h-full" />
                        <span className="w-[3px] bg-[#1DB954] rounded-t animate-[music-bar_1.2s_ease-in-out_infinite] origin-bottom h-[60%]" style={{ animationDelay: '0.2s' }} />
                        <span className="w-[3px] bg-[#1DB954] rounded-t animate-[music-bar_0.8s_ease-in-out_infinite] origin-bottom h-[80%]" style={{ animationDelay: '0.4s' }} />
                    </span>
                    Now Playing
                </span>
                <FaSpotify className="w-4 h-4 text-[#1DB954] group-hover:scale-110 transition-transform" />
            </div>

            {/* Album Art */}
            <div className="relative w-[80px] h-[80px] rounded-xl overflow-hidden shadow-lg flex-shrink-0 bg-[var(--border)] group-hover:scale-105 transition-transform duration-500 group-hover:shadow-xl">
                {data.albumImageUrl ? (
                    <Image
                        src={data.albumImageUrl}
                        alt={data.album || 'Album cover'}
                        fill
                        className="object-cover"
                        sizes="80px"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <FaSpotify className="w-8 h-8 text-[var(--muted-foreground)]" />
                    </div>
                )}
            </div>

            {/* Track info — title + artist only */}
            <div className="w-full text-center">
                <p className="text-sm font-semibold text-[var(--foreground)] truncate leading-tight" title={data.title}>
                    {data.title}
                </p>
                <p className="text-xs text-[var(--muted-foreground)] truncate mt-0.5" title={data.artist}>
                    {data.artist}
                </p>
            </div>
        </a>
    );
}
