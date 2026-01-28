import { Github, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';

export default function AboutContent() {
    return (
        <div className="min-h-screen bg-[var(--background)]">
            <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                {/* About Me Heading */}
                <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-12">
                    About Me
                </h1>

                <div className="grid md:grid-cols-[300px_1fr] gap-8 md:gap-12">
                    {/* Avatar/Image Section */}
                    <div className="relative">
                        <div className="relative w-full aspect-square max-w-[300px] rounded-2xl overflow-hidden border border-[var(--border)] bg-gradient-to-br from-[var(--accent)]/10 to-[var(--card)]">
                            <Image
                                src="/pic.webp"
                                alt="Erice Marial"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Bio Section */}
                    <div className="space-y-6">
                        {/* Introduction */}
                        <div className="space-y-4">
                            <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
                                Hey! I&apos;m <span className="text-[var(--foreground)] font-semibold">Erice Marial</span>{' '}
                                (
                                <a
                                    href="https://github.com/dnsxmrs"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[var(--foreground)] underline decoration-[var(--accent)]/30 hover:decoration-[var(--accent)] transition-colors"
                                >
                                    @dnsxmrs
                                </a>
                                ) — an aspiring Backend Developer based in the Philippines. I like to build{' '}
                                <span className="text-[var(--foreground)]">systems that simplify complex workflows</span>.
                            </p>

                            <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
                                Some of my notable work includes two main collections of related systems:<br /><br />
                                <span className="font-semibold text-[var(--foreground)]">SJSFI Suite</span> — a set of platforms for school management, featuring the{' '}
                                <a
                                    href="https://github.com/dnsxmrs/sjsfi-sis-registrar"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[var(--foreground)] underline decoration-[var(--accent)]/30 hover:decoration-[var(--accent)] transition-colors"
                                >
                                    Registrar System
                                </a>
                                {', '}
                                <a
                                    href="https://github.com/dnsxmrs/sjsfi-sis-student"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[var(--foreground)] underline decoration-[var(--accent)]/30 hover:decoration-[var(--accent)] transition-colors"
                                >
                                    Student Portal
                                </a>
                                {', '}
                                <a
                                    href="https://github.com/dnsxmrs/sjsfi-website"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[var(--foreground)] underline decoration-[var(--accent)]/30 hover:decoration-[var(--accent)] transition-colors"
                                >
                                    (Unofficial) School Website
                                </a>
                                {' and '}
                                <a
                                    href="https://github.com/dnsxmrs/sjsfi-website-admin"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[var(--foreground)] underline decoration-[var(--accent)]/30 hover:decoration-[var(--accent)] transition-colors"
                                >
                                    AI & Content Management
                                </a>
                                .<br /><br />
                                <span className="font-semibold text-[var(--foreground)]">Restaurant Suite</span> — a group of systems for restaurant operations, including the{' '}
                                <a
                                    href="https://github.com/dnsxmrs/kds"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[var(--foreground)] underline decoration-[var(--accent)]/30 hover:decoration-[var(--accent)] transition-colors"
                                >
                                    Kitchen Display System
                                </a>
                                {', '}
                                <a
                                    href="https://github.com/dnsxmrs/fiweb"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[var(--foreground)] underline decoration-[var(--accent)]/30 hover:decoration-[var(--accent)] transition-colors"
                                >
                                    Online Ordering Website
                                </a>
                                {' and '}
                                <a
                                    href="https://github.com/dnsxmrs/fipos"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[var(--foreground)] underline decoration-[var(--accent)]/30 hover:decoration-[var(--accent)] transition-colors"
                                >
                                    POS
                                </a>
                                .<br /><br />
                                My work focuses on backend development and system architecture, building tools that work together to solve real-world problems.
                            </p>

                            <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
                                I maintain several projects using technologies including{' '}
                                <span className="text-[var(--foreground)]">Laravel</span>,{' '}
                                <span className="text-[var(--foreground)]">C#</span>,{' '}
                                <span className="text-[var(--foreground)]">Python</span>, and{' '}
                                <span className="text-[var(--foreground)]">Next.js</span>.
                            </p>
                        </div>

                        {/* Personal Interests */}
                        <div className="pt-6 border-t border-[var(--border)]">
                            <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
                                Outside of software, I enjoy music mixing (think DJ vibes), playing ukulele, and diving into
                                video games. I stay up-to-date by reading articles about new tech and industry updates. When I&apos;m
                                not behind a screen, you&apos;ll find me playing table tennis or badminton, driving around, or
                                going on spontaneous adventures exploring the world around me. Feel free to{' '}
                                <a
                                    href="mailto:ericemarial@gmail.com"
                                    className="text-[var(--foreground)] underline decoration-[var(--accent)]/30 hover:decoration-[var(--accent)] transition-colors"
                                >
                                    shoot me an email
                                </a>
                                {' '}if you&apos;d like to chat.
                            </p>
                        </div>

                        {/* Social Links */}
                        <div className="flex flex-wrap items-center gap-4 pt-6">
                            <a
                                href="https://github.com/dnsxmrs"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                            >
                                <Github className="h-5 w-5" />
                                <span className="text-sm">GitHub</span>
                            </a>
                            <span className="text-[var(--muted-foreground)]">×</span>
                            <a
                                href="https://www.linkedin.com/in/erice-michael-marial-76b74a300/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                            >
                                <Linkedin className="h-5 w-5" />
                                <span className="text-sm">LinkedIn</span>
                            </a>
                            <span className="text-[var(--muted-foreground)]">×</span>
                            <a
                                href="mailto:ericemarial@gmail.com"
                                className="flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                            >
                                <Mail className="h-5 w-5" />
                                <span className="text-sm">Email</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
