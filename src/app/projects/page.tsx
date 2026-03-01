import { Layers } from 'lucide-react';
import FeaturedProjectCard from '@/components/home/FeaturedProjectCard';

const FEATURED_REPOS = [
    { owner: 'BenJr23', repo: 'mgsi-bms-superadmin' },
    { owner: 'dnsxmrs', repo: 'mgsi-bms-client' },
    { owner: 'dnsxmrs', repo: 'e-wastewise' },
    { owner: 'dnsxmrs', repo: 'e-kwento' },
    { owner: 'dnsxmrs', repo: 'sjsfi-sis-registrar' },
    { owner: 'dnsxmrs', repo: 'sjsfi-sis-student' },
    { owner: 'dnsxmrs', repo: 'sjsfi-website-admin' },
    { owner: 'dnsxmrs', repo: 'sjsfi-website' },
    { owner: 'dnsxmrs', repo: 'uvdesk-community-v1.1.7' },
    { owner: 'dnsxmrs', repo: 'VRMS' },
    { owner: 'dnsxmrs', repo: 'fipos' },
    { owner: 'dnsxmrs', repo: 'kds' },
    { owner: 'dnsxmrs', repo: 'fiweb' },
];

export default function ProjectsPage() {
    return (
        <main className="min-h-screen bg-[var(--background)] px-4 py-16 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-3 mb-12">
                    <Layers className="h-8 w-8 text-[var(--foreground)]" />
                    <h1 className="text-4xl font-bold text-[var(--foreground)]">
                        Projects
                    </h1>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {FEATURED_REPOS.map((repo) => (
                        <FeaturedProjectCard
                            key={`${repo.owner}/${repo.repo}`}
                            owner={repo.owner}
                            repo={repo.repo}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}