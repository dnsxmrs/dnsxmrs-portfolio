'use client';

import { MapPin, Clock } from 'lucide-react';
import { useState, useEffect, type ComponentType } from 'react';
import dynamic from 'next/dynamic';

// Must be dynamically imported — Leaflet needs the browser's window object
const LeafletMap: ComponentType = dynamic(
    () => import('./LeafletMap') as Promise<{ default: ComponentType }>,
    {
        ssr: false,
        loading: () => <div className="w-full h-full bg-[var(--border)]/40 rounded-xl animate-pulse" />,
    }
);

export default function MapWidget() {
    const [time, setTime] = useState<string>('');

    useEffect(() => {
        const updateTime = () => {
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: 'Asia/Manila',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            });
            setTime(formatter.format(new Date()));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bento-card w-full h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-3 flex-shrink-0">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[var(--accent)]" />
                    Based In
                </span>
                <span className="text-[10px] font-mono font-medium text-[var(--muted-foreground)] flex items-center gap-1 bg-[var(--border)]/50 px-2 py-1 rounded-lg">
                    <Clock className="w-2.5 h-2.5 text-[var(--accent)]" />
                    {time || '--:--:--'}
                </span>
            </div>

            {/* Map */}
            <div className="relative flex-1 rounded-xl overflow-hidden bg-[var(--border)]/40 min-h-0">
                <LeafletMap />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-2.5 flex-shrink-0">
                <p className="text-xs font-medium text-[var(--foreground)]">San Isidro, Montalban</p>
                <span className="text-[10px] font-mono bg-[var(--accent)]/10 text-[var(--accent)] px-2 py-0.5 rounded-md font-semibold">PH</span>
            </div>
        </div>
    );
}
