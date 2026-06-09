import {
    Github,
    Linkedin,
    Mail,
    Cpu,
    Layers,
    Calendar,
    QrCode,
    Building2,
    GraduationCap,
    Smartphone,
    Globe
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
                    <div className="space-y-6">
                        <div className="relative w-full aspect-square max-w-[300px] rounded-2xl overflow-hidden border border-[var(--border)] bg-gradient-to-br from-[var(--accent)]/10 to-[var(--card)]">
                            <Image
                                src="/pic.webp"
                                alt="Erice Marial"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Quick Contact & Socials */}
                        <div className="space-y-4 pt-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                                Connect With Me
                            </h3>
                            <div className="flex flex-col gap-3">
                                <Link
                                    href="https://github.com/dnsxmrs"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors group"
                                >
                                    <Github className="h-4 w-4" />
                                    <span>@dnsxmrs</span>
                                </Link>
                                <a
                                    href="https://www.linkedin.com/in/erice-michael-marial-76b74a300/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors group"
                                >
                                    <Linkedin className="h-4 w-4" />
                                    <span>Erice Michael Marial</span>
                                </a>
                                <a
                                    href="mailto:ericemarial@gmail.com"
                                    className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors group"
                                >
                                    <Mail className="h-4 w-4" />
                                    <span>ericemarial@gmail.com</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Bio & Experience Section */}
                    <div className="space-y-12">
                        {/* Introduction */}
                        <div className="space-y-4">
                            <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
                                Hey! I&apos;m <span className="text-[var(--foreground)] font-semibold">Erice Michael D. Marial</span>{' '}
                                — an aspiring Full Stack Developer based in the Philippines. I like to build{' '}
                                <span className="text-[var(--foreground)]">systems that simplify complex workflows</span>,
                                bridging the gap between elegant software architecture and physical telemetry.
                            </p>
                            <p className="text-md text-[var(--muted-foreground)] leading-relaxed">
                                Below is a breakdown of my engineering background, latest work, and internship systems.
                            </p>
                        </div>

                        {/* PowerTrack Section */}
                        <section className="space-y-6 pt-6 border-t border-[var(--border)]">
                            <div className="flex items-start gap-3">
                                <GraduationCap className="h-6 w-6 mt-1 text-[var(--accent)] flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl font-bold text-[var(--foreground)]">
                                        PowerTrack
                                    </h2>
                                    <p className="text-sm font-medium text-[var(--muted-foreground)]">
                                        Smart Energy Analytics & Academic Pitch
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)]/30 space-y-4">
                                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                                    <strong className="text-[var(--foreground)]">Concept:</strong> PowerTrack is a Smart Appliance-Level Energy Analytics and Decision-Support System designed as a cost-effective energy mitigation solution for Philippine Small and Medium Enterprises (SMEs). Rather than showing retrospective aggregate bills, it utilizes safe, non-invasive hardware clamps on breakers to spot power-hungry equipment in real-time before bills arrive.
                                </p>

                                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                                    <div className="space-y-2">
                                        <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] flex items-center gap-1.5">
                                            <Smartphone className="w-3.5 h-3.5 text-[var(--accent)]" />
                                            Mobile Client (React Native + Expo)
                                        </h4>
                                        <ul className="text-xs text-[var(--muted-foreground)] space-y-1 list-disc list-inside">
                                            <li><span className="font-semibold text-[var(--foreground)]">Starter:</span> Real-time tracking and overload alerts.</li>
                                            <li><span className="font-semibold text-[var(--foreground)]">Professional:</span> Analytics tab with comparative historical tracking.</li>
                                            <li><span className="font-semibold text-[var(--foreground)]">Enterprise:</span> Recommendation sheets and Power Health Score.</li>
                                        </ul>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] flex items-center gap-1.5">
                                            <Globe className="w-3.5 h-3.5 text-[var(--accent)]" />
                                            Web Portal (Next.js + TypeScript)
                                        </h4>
                                        <ul className="text-xs text-[var(--muted-foreground)] space-y-1 list-disc list-inside">
                                            <li>Administrative multi-branch interface.</li>
                                            <li>Aggregates telemetry data from different sub-distribution lines onto a single dashboard for commercial operations managers.</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="pt-2 border-t border-[var(--border)]/50">
                                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] flex items-center gap-1.5 mb-2">
                                        <Cpu className="w-3.5 h-3.5 text-[var(--accent)]" />
                                        Edge Hardware Integration
                                    </h4>
                                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                                        Data is streamed via an <strong className="text-[var(--foreground)]">ESP32 Edge Gateway</strong> featuring localized network error buffers to ensure stream stability during Wi-Fi dropouts. It coordinates with <strong className="text-[var(--foreground)]">Split-Core Current Transformers (CT Sensors)</strong> attached externally to breaker branches to capture 100% accurate electrical metrics safely without cutting wires.
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 pt-1">
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--border)] text-[var(--foreground)]">React Native</span>
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--border)] text-[var(--foreground)]">Next.js</span>
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--border)] text-[var(--foreground)]">Supabase</span>
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--border)] text-[var(--foreground)]">ESP32 / IoT</span>
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--border)] text-[var(--foreground)]">TypeScript</span>
                                </div>
                            </div>
                        </section>

                        {/* Internship Section */}
                        <section className="space-y-6 pt-6 border-t border-[var(--border)]">
                            <div className="flex items-start gap-3">
                                <Building2 className="h-6 w-6 mt-1 text-[var(--accent)] flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl font-bold text-[var(--foreground)]">
                                        Internship Experience
                                    </h2>
                                    <p className="text-sm font-medium text-[var(--muted-foreground)]">
                                        Full Stack Engineer at GreatWork Global (MGSI Systems)
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {/* BMS Card */}
                                <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)]/30 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-lg text-[var(--foreground)] flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-[var(--accent)]" />
                                            Booking Management System (BMS)
                                        </h3>
                                        <span className="text-[10px] font-mono bg-[var(--accent)]/10 text-[var(--accent)] px-2 py-0.5 rounded">Next.js & Supabase</span>
                                    </div>
                                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                                        An enterprise portal driving GreatWork Global&apos;s co-working real estate ecosystem. Engineered client interfaces and admin dashboards with automated scheduling flows, timezone-aware analytics engines (calculating branch occupancy rates), OTP password recovery, and secure Role-Based Access Control (RBAC).
                                    </p>
                                </div>

                                {/* IMS Card */}
                                <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)]/30 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-lg text-[var(--foreground)] flex items-center gap-2">
                                            <QrCode className="w-4 h-4 text-[var(--accent)]" />
                                            Inventory Management System (IMS)
                                        </h3>
                                        <span className="text-[10px] font-mono bg-[var(--accent)]/10 text-[var(--accent)] px-2 py-0.5 rounded">Prisma & Server Actions</span>
                                    </div>
                                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                                        Internal logistics and asset-tracking software built to eliminate hub administration overhead. Managed database structure via Prisma schema mapped to Asset/Category tables and piped frontend updates directly through Next.js Server Actions.
                                    </p>
                                    <ul className="text-xs text-[var(--muted-foreground)] space-y-1 list-disc list-inside">
                                        <li>Engineered an end-to-end QR Code verification scanner pipeline, stress-tested for optical facility lighting.</li>
                                        <li>Field-deployed on-site at the SM Mega Tower (Ortigas Branch) to audit Grade A assets in real time.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Classic Project Suites */}
                        <section className="space-y-6 pt-6 border-t border-[var(--border)]">
                            <div className="flex items-start gap-3">
                                <Layers className="h-6 w-6 mt-1 text-[var(--accent)] flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl font-bold text-[var(--foreground)]">
                                        Core System Collections
                                    </h2>
                                    <p className="text-sm font-medium text-[var(--muted-foreground)]">
                                        Full-Scale Integrated Platforms
                                    </p>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)]/20">
                                    <h3 className="font-semibold text-[var(--foreground)] mb-2">SJSFI School Suite</h3>
                                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed mb-3">
                                        A comprehensive school platform covering administration and student lifecycles.
                                    </p>
                                    <div className="flex flex-col gap-1.5 text-xs text-[var(--foreground)]">
                                        <Link href="https://github.com/dnsxmrs/sjsfi-sis-registrar" target="_blank" className="underline hover:text-[var(--accent)]">Registrar Administration</Link>
                                        <Link href="https://github.com/dnsxmrs/sjsfi-sis-student" target="_blank" className="underline hover:text-[var(--accent)]">Interactive Student Portal</Link>
                                        <Link href="https://github.com/dnsxmrs/sjsfi-website" target="_blank" className="underline hover:text-[var(--accent)]">Public School Website</Link>
                                        <Link href="https://github.com/dnsxmrs/sjsfi-website-admin" target="_blank" className="underline hover:text-[var(--accent)]">AI Content Admin Hub</Link>
                                    </div>
                                </div>

                                <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)]/20">
                                    <h3 className="font-semibold text-[var(--foreground)] mb-2">Restaurant Operations Suite</h3>
                                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed mb-3">
                                        Synchronized systems optimized for real-time food service workflows.
                                    </p>
                                    <div className="flex flex-col gap-1.5 text-xs text-[var(--foreground)]">
                                        <Link href="https://github.com/dnsxmrs/kds" target="_blank" className="underline hover:text-[var(--accent)]">Kitchen Display System (KDS)</Link>
                                        <Link href="https://github.com/dnsxmrs/fiweb" target="_blank" className="underline hover:text-[var(--accent)]">Ordering Web Portal</Link>
                                        <Link href="https://github.com/dnsxmrs/fipos" target="_blank" className="underline hover:text-[var(--accent)]">Point of Sale Terminal (POS)</Link>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Tech Stack Summary */}
                        <section className="space-y-4 pt-6 border-t border-[var(--border)]">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                                Tech Stack Summary
                            </h3>
                            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                                I actively engineer and maintain projects using technologies including{' '}
                                <span className="text-[var(--foreground)] font-medium">Laravel</span>,{' '}
                                <span className="text-[var(--foreground)] font-medium">C#</span>,{' '}
                                <span className="text-[var(--foreground)] font-medium">Python</span>,{' '}
                                <span className="text-[var(--foreground)] font-medium">Next.js / React</span>,{' '}
                                <span className="text-[var(--foreground)] font-medium">Supabase / PostgreSQL</span>,{' '}
                                and <span className="text-[var(--foreground)] font-medium">Redis</span>.
                            </p>
                        </section>

                        {/* Personal Interests */}
                        <section className="pt-6 border-t border-[var(--border)]">
                            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
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
                                {' '}if you&apos;d like to chat!
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
