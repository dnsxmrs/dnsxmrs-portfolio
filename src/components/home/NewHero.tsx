'use client';

import { Github, Linkedin, Mail, Star, X, Calendar } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import FeaturedProjectCard from './FeaturedProjectCard';
import RecentCommits from './RecentCommits';
import GithubStatsCard from './GithubStatsCard';

export default function NewHero() {
    const [primeOpen, setPrimeOpen] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setPrimeOpen(false);
            }
        };

        if (primeOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [primeOpen]);

    // ...existing code...
    return (
        <section className="min-h-screen bg-[var(--background)]">
            {/* Hero Section */}
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                <div className="space-y-8">
                    {/* Main Heading */}
                    <div>
                        <h1 className="text-lg sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)]">
                            Hey! I&apos;m{' '}
                            <span className="text-[var(--accent)]">Erice Marial</span>
                        </h1>
                    </div>

                    {/* Description */}
                    <div className="max-w-3xl">
                        <p className="mt-4 text-base sm:text-lg md:text-xl text-[var(--muted-foreground)] leading-relaxed">
                            I&apos;m an aspiring <span className="text-[var(--foreground)]">Backend Developer</span>. I create technologies through apps, web platforms, and systems that make human life easier.
                            Currently exploring modern tech stacks while leveraging {''}
                            <span className="text-[var(--foreground)]">AI as both a development tool and a feature</span> —
                            building smarter applications that enhance user experiences.
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex flex-wrap items-center gap-6">
                        <a
                            href="https://github.com/dnsxmrs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors group"
                        >
                            <Github className="h-5 w-5" />
                            <span className="text-sm sm:text-base border-b border-transparent group-hover:border-[var(--foreground)] transition-colors">
                                GitHub
                            </span>
                        </a>
                        <span className="text-[var(--border)]">|</span>
                        <a
                            href="https://www.linkedin.com/in/erice-michael-marial-76b74a300/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors group"
                        >
                            <Linkedin className="h-5 w-5" />
                            <span className="text-sm sm:text-base border-b border-transparent group-hover:border-[var(--foreground)] transition-colors">
                                LinkedIn
                            </span>
                        </a>
                        <span className="text-[var(--border)]">|</span>
                        <a
                            href="mailto:ericemarial@gmail.com"
                            className="flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors group"
                        >
                            <Mail className="h-5 w-5" />
                            <span className="text-sm sm:text-base border-b border-transparent group-hover:border-[var(--foreground)] transition-colors">
                                Email
                            </span>
                        </a>
                        <span className="text-[var(--border)]">|</span>
                        <Link
                            href="/about"
                            className="flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors group"
                        >
                            <span className="text-sm sm:text-base border-b border-transparent group-hover:border-[var(--foreground)] transition-colors">
                                More about me →
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Experience Bar */}
                <div className="flex flex-wrap items-center gap-4 mt-8 text-sm sm:text-base md:text-lg font-medium text-[var(--muted-foreground)] relative">
                    {/* PRIME Philippines - Current */}
                    <button
                        type="button"
                        className="flex items-center gap-2 focus:outline-none group relative cursor-pointer hover:scale-105 transition-transform duration-200"
                        onClick={() => setPrimeOpen((v) => !v)}
                        aria-label="Show PRIME Philippines details"
                    >
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block align-middle"><circle cx="12" cy="12" r="10" fill="#1A237E" /><text x="12" y="16" textAnchor="middle" fontSize="10" fill="white" fontFamily="Arial" fontWeight="bold">PR</text></svg>
                        <span className="text-[var(--foreground)] text-sm group-hover:text-[var(--accent)] transition-colors">PRIME Philippines</span>
                    </button>
                    {/* Popover for PRIME Philippines */}
                    {primeOpen && (
                        <div ref={popupRef} className="absolute left-0 bottom-15 z-10 w-96 bg-[var(--background)] border border-[var(--border)] rounded-xl shadow-[0_0_40px_15px_rgba(0,0,0,0.08)] dark:shadow-[0_0_40px_15px_rgba(0,0,0,0.3)] p-5 text-left animate-fade-in">
                            <div className="flex gap-4">
                                {/* Left side - Logo */}
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 rounded-full bg-[#1A237E] flex items-center justify-center">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <text x="12" y="16" textAnchor="middle" fontSize="12" fill="white" fontFamily="Arial" fontWeight="bold">PR</text>
                                        </svg>
                                    </div>
                                </div>

                                {/* Right side - Content */}
                                <div className="flex-1 min-w-0 mb-4">
                                    <div className="flex items-start justify-between py-0">
                                        <h3 className="font-medium text-sm text-[var(--foreground)]">PRIME Philippines</h3>
                                        <button onClick={() => setPrimeOpen(false)} aria-label="Close" className="p-1 rounded hover:bg-[var(--border)] flex-shrink-0">
                                            <X className="w-4 h-4 text-[var(--muted-foreground)]" />
                                        </button>
                                    </div>
                                    <div className="text-sm text-[var(--foreground)]">Operations Intern</div>
                                </div>
                            </div>
                            {/* Description */}
                            <div className="text-sm text-[var(--muted-foreground)] mb-3 leading-relaxed">
                                Currently an intern at PRIME Philippines, helping make operations more efficient and assisting the senior supervisor with daily tasks and process improvements.
                            </div>

                            {/* Date */}
                            <div className="text-xs text-[var(--muted-foreground)] flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>Feb 2026 – Present</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Featured Projects */}
                <div className="mt-24">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--foreground)] flex items-center gap-2">
                            <Star className="h-5 w-5 sm:h-6 sm:w-6 text-[var(--accent)]" /> Featured Projects
                        </h2>
                        <Link
                            href="/projects"
                            className="text-xs sm:text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors underline decoration-[var(--accent)]/30 hover:decoration-[var(--accent)]"
                        >
                            View all →
                        </Link>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Replace with your actual GitHub repos */}
                        <FeaturedProjectCard owner="dnsxmrs" repo="sjsfi-sis-registrar" />
                        <FeaturedProjectCard owner="dnsxmrs" repo="sjsfi-sis-student" />
                    </div>
                </div>

                {/* GitHub Activity Section */}
                <div className="mt-30 grid gap-6 md:grid-cols-2">
                    <RecentCommits username="dnsxmrs" limit={5} />
                    <GithubStatsCard username="dnsxmrs" />
                </div>
            </div>
        </section>
    );
}