'use client';

import { MousePointerClick, Globe } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import PusherClient from 'pusher-js';
import { incrementClickBy, getClickCount } from '@/app/actions/clicks';

export default function ClickCounterWidget() {
    const [count, setCount] = useState<number | null>(null);
    const [clicks, setClicks] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
    const [isLive, setIsLive] = useState(false);
    const rippleId = useRef(0);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // ── Batching: accumulate rapid clicks, flush to server periodically ──
    const pendingClicks = useRef(0);
    const flushTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const flushClicks = useCallback(() => {
        const batch = pendingClicks.current;
        if (batch <= 0) return;
        pendingClicks.current = 0;

        // Fire-and-forget — don't await so it never blocks the UI
        incrementClickBy(batch).catch(() => {
            // If the server call fails, the optimistic count will be
            // corrected on the next Pusher broadcast or page reload.
        });
    }, []);

    // Flush any remaining clicks when the component unmounts
    useEffect(() => {
        return () => {
            if (flushTimer.current) clearTimeout(flushTimer.current);
            // Flush synchronously before unmount
            const batch = pendingClicks.current;
            if (batch > 0) {
                pendingClicks.current = 0;
                incrementClickBy(batch).catch(() => { });
            }
        };
    }, []);

    // ── Hydrate initial count from Redis + localStorage ──────────────
    useEffect(() => {
        getClickCount().then((c) => setCount(c));
        const saved = localStorage.getItem('portfolio-clicks');
        if (saved) setClicks(parseInt(saved, 10));
    }, []);

    // ── Subscribe to Pusher for real-time updates ─────────────────────
    useEffect(() => {
        const pusher = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
        });

        const channel = pusher.subscribe('global-clicks');

        channel.bind('click-update', (data: { count: number }) => {
            setCount(data.count);
        });

        pusher.connection.bind('connected', () => setIsLive(true));
        pusher.connection.bind('disconnected', () => setIsLive(false));
        pusher.connection.bind('error', () => setIsLive(false));

        // Mark live once the subscription succeeds
        channel.bind('pusher:subscription_succeeded', () => setIsLive(true));

        return () => {
            channel.unbind_all();
            pusher.unsubscribe('global-clicks');
            pusher.disconnect();
        };
    }, []);

    // ── Ripple effect on click ────────────────────────────────────────
    const spawnRipple = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = rippleId.current++;
        setRipples((prev) => [...prev, { id, x, y }]);
        setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 600);
    }, []);

    // ── Handle click ──────────────────────────────────────────────────
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        // Optimistic global update — feels instant
        setCount((prev) => (prev ?? 0) + 1);

        // Track personal clicks — use functional updater to avoid stale closure
        setClicks((prev) => {
            const next = prev + 1;
            localStorage.setItem('portfolio-clicks', next.toString());
            return next;
        });

        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 250);

        spawnRipple(e);

        // Batch rapid clicks: accumulate and flush after 150ms of inactivity
        pendingClicks.current += 1;
        if (flushTimer.current) clearTimeout(flushTimer.current);
        flushTimer.current = setTimeout(flushClicks, 150);
    };

    const displayCount = count !== null ? count.toLocaleString() : '—';

    return (
        <div className="bento-card w-full h-full flex flex-col justify-between relative overflow-hidden group">
            {/* Ambient glow on click */}
            <div
                className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
                style={{
                    background:
                        'radial-gradient(ellipse at center, var(--accent) 0%, transparent 70%)',
                    opacity: isAnimating ? 0.15 : 0,
                }}
            />

            {/* Live indicator */}
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                    <Globe className="w-3 h-3 text-[var(--muted-foreground)]" />
                    <span className="text-[10px] font-mono text-[var(--muted-foreground)] uppercase tracking-widest">
                        Global Clicks
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <span
                        className="block w-1.5 h-1.5 rounded-full"
                        style={{
                            backgroundColor: isLive ? '#22c55e' : '#6b7280',
                            boxShadow: isLive ? '0 0 6px #22c55e' : 'none',
                            animation: isLive ? 'pulse-dot 2s ease-in-out infinite' : 'none',
                        }}
                    />
                    <span className="text-[9px] font-mono text-[var(--muted-foreground)]">
                        {isLive ? 'LIVE' : '...'}
                    </span>
                </div>
            </div>

            {/* Counter display */}
            <div className="flex-1 flex items-center justify-center">
                <div
                    className="text-5xl font-black tabular-nums text-[var(--foreground)] tracking-tighter transition-all duration-150 select-none"
                    style={{
                        transform: isAnimating ? 'scale(1.1)' : 'scale(1)',
                        textShadow: isAnimating
                            ? '0 0 20px color-mix(in srgb, var(--accent) 40%, transparent)'
                            : 'none',
                    }}
                >
                    {displayCount}
                </div>
            </div>

            {/* Click button with ripple */}
            <div className="flex flex-col items-center gap-2">
                <button
                    ref={buttonRef}
                    onClick={handleClick}
                    disabled={count === null}
                    className="relative w-full py-3 rounded-xl bg-[var(--accent)] hover:brightness-110 active:scale-[0.97] text-white font-bold tracking-wide uppercase text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-[var(--accent)]/20 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                    {/* Ripple effects */}
                    {ripples.map((ripple) => (
                        <span
                            key={ripple.id}
                            className="absolute rounded-full bg-white/30 animate-[ripple_0.6s_ease-out_forwards] pointer-events-none"
                            style={{
                                left: ripple.x - 20,
                                top: ripple.y - 20,
                                width: 40,
                                height: 40,
                            }}
                        />
                    ))}
                    <MousePointerClick className="w-4 h-4" />
                    Click Me
                </button>
                <p className="text-[10px] text-[var(--muted-foreground)] font-mono">
                    you&apos;ve clicked {clicks} {clicks === 1 ? 'time' : 'times'}
                </p>
            </div>

            {/* Inline keyframes for ripple + pulse */}
            <style jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(6);
            opacity: 0;
          }
        }
        @keyframes pulse-dot {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
        }
      `}</style>
        </div>
    );
}
