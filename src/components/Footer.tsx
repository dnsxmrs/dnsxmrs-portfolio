'use client';

import { Github, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-[var(--border)] bg-[var(--muted)]/30 py-8 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div className="flex items-center space-x-2 text-[var(--muted-foreground)] text-sm">
                        {/* dynamic year displaying if 2025 this year then display 2025, if above 2025 then display 2025 - current year */}
                        <span>
                            © {new Date().getFullYear() === 2025 ? '2025' : '2025 - ' + new Date().getFullYear()} dnsxmrs
                        </span>
                    </div>

                    <div className="flex items-center flex-wrap justify-center gap-4">
                        <a
                            href="https://github.com/dnsxmrs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--muted-foreground)] transition-colors duration-300 hover:text-[var(--accent)] focus:outline-none focus:text-[var(--accent)]"
                            aria-label="GitHub"
                        >
                            <Github className="h-5 w-5" />
                        </a>
                        <a
                            href="https://facebook.com/dnsxmrs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--muted-foreground)] transition-colors duration-300 hover:text-[var(--accent)] focus:outline-none focus:text-[var(--accent)]"
                            aria-label="Facebook"
                        >
                            <Facebook className="h-5 w-5" />
                        </a>
                        <a
                            href="https://instagram.com/dnsxmrs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--muted-foreground)] transition-colors duration-300 hover:text-[var(--accent)] focus:outline-none focus:text-[var(--accent)]"
                            aria-label="Instagram"
                        >
                            <Instagram className="h-5 w-5" />
                        </a>
                        <a
                            href="https://twitter.com/dnsxmrs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--muted-foreground)] transition-colors duration-300 hover:text-[var(--accent)] focus:outline-none focus:text-[var(--accent)]"
                            aria-label="Twitter"
                        >
                            <Twitter className="h-5 w-5" />
                        </a>
                        <span className="text-[var(--border)] hidden sm:inline">|</span>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="text-sm text-[var(--muted-foreground)] transition-colors duration-300 hover:text-[var(--accent)] focus:outline-none focus:text-[var(--accent)] whitespace-nowrap"
                        >
                            Back to top ↑
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
