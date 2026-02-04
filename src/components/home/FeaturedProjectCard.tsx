'use client';

import { Github, ExternalLink } from 'lucide-react';
import { useGithubRepo } from '@/hooks/useGithubRepo';

interface FeaturedProjectCardProps {
    owner: string;
    repo: string;
}

export default function FeaturedProjectCard({ owner, repo }: FeaturedProjectCardProps) {
    const { data, loading, error } = useGithubRepo(owner, repo);

    if (loading) {
        return (
            <div className="group relative overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--card)] p-6 animate-pulse">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-1.5">
                            <div className="h-3 w-3 rounded-full bg-[var(--muted)]"></div>
                            <div className="h-3 w-3 rounded-full bg-[var(--muted)]"></div>
                            <div className="h-3 w-3 rounded-full bg-[var(--muted)]"></div>
                        </div>
                        <div className="h-4 w-12 bg-[var(--muted)] rounded"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 bg-[var(--muted)] rounded w-3/4"></div>
                        <div className="h-3 bg-[var(--muted)] rounded w-full"></div>
                        <div className="h-3 bg-[var(--muted)] rounded w-2/3"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="group relative overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
                <div className="text-center text-[var(--muted-foreground)]">
                    <p className="text-sm">{error || 'Failed to load repository'}</p>
                    <p className="text-xs mt-1">
                        {owner}/{repo}
                    </p>
                </div>
            </div>
        );
    }

    // Get top 3 languages by bytes
    const topLanguages = Object.entries(data.languages)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([lang]) => lang);

    // Language color mapping
    const languageColors: Record<string, string> = {
        TypeScript: 'text-blue-500 bg-blue-500/10',
        JavaScript: 'text-yellow-500 bg-yellow-500/10',
        Python: 'text-blue-400 bg-blue-400/10',
        'C#': 'text-purple-500 bg-purple-500/10',
        PHP: 'text-indigo-500 bg-indigo-500/10',
        Java: 'text-red-500 bg-red-500/10',
        Go: 'text-cyan-500 bg-cyan-500/10',
        Rust: 'text-orange-500 bg-orange-500/10',
        HTML: 'text-red-400 bg-red-400/10',
        CSS: 'text-blue-300 bg-blue-300/10',
        'Next.js': 'text-purple-500 bg-purple-500/10',
        React: 'text-blue-500 bg-blue-500/10',
        'Node.js': 'text-green-500 bg-green-500/10',
        Vue: 'text-green-400 bg-green-400/10',
        Blade: 'text-red-500 bg-red-500/10',
        Tailwind: 'text-cyan-500 bg-cyan-500/10',
    };

    return (
        <div className="group relative overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--card)] p-6 transition-all hover:border-[var(--accent)]/50 hover:shadow-lg">
            <div className="space-y-4">
                {/* Terminal Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                            <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
                            <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
                            <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
                        <Github className="h-3.5 w-3.5" />
                        <span>★ {data.stars.toLocaleString()}</span>
                    </div>
                </div>

                {/* Project Info */}
                <div>
                    <div className="flex items-center gap-1 mb-2">
                        <span className="text-[var(--accent)] font-mono text-sm">{data.owner}</span>
                        <span className="text-[var(--muted-foreground)]">/</span>
                        <span className="text-[var(--foreground)] font-mono text-sm font-semibold">
                            {data.name}
                        </span>
                    </div>
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed line-clamp-2">
                        {data.description}
                    </p>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                    {topLanguages.length > 0 ? (
                        topLanguages.map((lang) => (
                            <span
                                key={lang}
                                className={`px-2 py-1 text-xs rounded-md ${languageColors[lang] || 'bg-[var(--muted)] text-[var(--foreground)]'
                                    }`}
                            >
                                {lang}
                            </span>
                        ))
                    ) : (
                        <span className="px-2 py-1 text-xs rounded-md bg-[var(--muted)] text-[var(--foreground)]">
                            {data.language}
                        </span>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                    <span className="text-xs text-[var(--muted-foreground)]">
                        {data.contributors} Contributor{data.contributors !== 1 ? 's' : ''}
                    </span>
                    <a
                        href={data.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[var(--accent)] hover:underline flex items-center gap-1"
                    >
                        View on GitHub <ExternalLink className="h-3 w-3" />
                    </a>
                </div>
            </div>
        </div>
    );
}
