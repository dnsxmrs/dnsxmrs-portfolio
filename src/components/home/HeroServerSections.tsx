import { Star } from 'lucide-react';
import Link from 'next/link';
import FeaturedProjectCard from './FeaturedProjectCard';
import RecentCommits from './RecentCommits';
import GithubStatsCard from './GithubStatsCard';

// Server Component: Renders Featured Projects and GitHub Activity
export default function HeroServerSections() {
    return (
        <>
            {/* Featured Projects */}
            <div className="mt-24">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] flex items-center gap-2">
                        <Star className="h-6 w-6 text-[var(--accent)]" /> Featured Projects
                    </h2>
                    <Link
                        href="/projects"
                        className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors underline decoration-[var(--accent)]/30 hover:decoration-[var(--accent)]"
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
        </>
    );
}