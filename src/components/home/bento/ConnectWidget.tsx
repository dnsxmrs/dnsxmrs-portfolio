'use client';

import { Mail } from 'lucide-react';

export default function ConnectWidget() {
    return (
        <div className="bento-card w-full h-full flex flex-col justify-between relative overflow-hidden group">
            {/* Decorative orange glow */}
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-[var(--accent)]/15 rounded-full blur-2xl group-hover:bg-[var(--accent)]/25 transition-all duration-700 pointer-events-none" />

            <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">
                    Let&apos;s work together
                </p>
            </div>

            <div className="flex flex-col gap-2 mt-auto">
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                    New opportunities, collaborations, and tech conversations are always welcome.
                </p>
                <a
                    href="mailto:ericemarial@gmail.com"
                    className="w-full flex items-center justify-center gap-2 bg-[var(--accent)] hover:brightness-110 active:scale-95 text-white font-semibold py-2.5 px-4 rounded-xl transition-all text-sm shadow-md shadow-[var(--accent)]/25 mt-1"
                >
                    <Mail className="w-4 h-4" />
                    Book a Chat
                </a>
            </div>
        </div>
    );
}
