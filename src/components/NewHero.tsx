'use client';

import { Github, Linkedin, Mail, Star } from 'lucide-react';
import FeaturedProjectCard from './FeaturedProjectCard';
import RecentCommits from './RecentCommits';
import GithubStatsCard from './GithubStatsCard';

export default function NewHero() {
    return (
        <section className="min-h-screen bg-[var(--background)]">
            {/* Hero Section */}
            <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                <div className="space-y-8">
                    {/* Main Heading */}
                    <div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--foreground)]">
                            Hey! I&apos;m{' '}
                            <span className="text-[var(--accent)]">Erice Marial</span>
                        </h1>
                    </div>

                    {/* Description */}
                    <div className="max-w-3xl">
                        <p className="text-lg md:text-xl text-[var(--muted-foreground)] leading-relaxed">
                            I&apos;m an aspiring {''}
                            <span className="text-[var(--foreground)]">Backend Developer</span>.
                        </p>
                        <p className="mt-4 text-lg md:text-xl text-[var(--muted-foreground)] leading-relaxed">
                            I create technologies through apps, web platforms, and systems that make human life easier.
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
                            <span className="text-sm border-b border-transparent group-hover:border-[var(--foreground)] transition-colors">
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
                            <span className="text-sm border-b border-transparent group-hover:border-[var(--foreground)] transition-colors">
                                LinkedIn
                            </span>
                        </a>
                        <span className="text-[var(--border)]">|</span>
                        <a
                            href="mailto:ericemarial@gmail.com"
                            className="flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors group"
                        >
                            <Mail className="h-5 w-5" />
                            <span className="text-sm border-b border-transparent group-hover:border-[var(--foreground)] transition-colors">
                                Email
                            </span>
                        </a>
                        <span className="text-[var(--border)]">|</span>
                        <a
                            href="#about"
                            className="flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors group"
                        >
                            <span className="text-sm border-b border-transparent group-hover:border-[var(--foreground)] transition-colors">
                                More about me →
                            </span>
                        </a>
                    </div>
                </div>

                {/* Featured Projects */}
                <div className="mt-24">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] flex items-center gap-2">
                            <Star className="h-6 w-6 text-[var(--accent)]" /> Featured Projects
                        </h2>
                        <a
                            href="#projects"
                            className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors underline decoration-[var(--accent)]/30 hover:decoration-[var(--accent)]"
                        >
                            View all →
                        </a>
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