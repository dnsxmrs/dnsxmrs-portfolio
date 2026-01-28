'use client';

import { User, Users, GitBranch, GitPullRequest, GitCommit, BarChart3, UserCheck } from 'lucide-react';
import { useGithubStats } from '@/hooks/useGithubStats';

interface GithubStatsCardProps {
    username: string;
}

export default function GithubStatsCard({ username }: GithubStatsCardProps) {
    const { stats, loading, error } = useGithubStats(username);

    if (loading) {
        return (
            <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" /> GitHub Quick Stats
                </h3>
                <div className="space-y-3 animate-pulse">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-8 bg-[var(--muted)] rounded"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (error || !stats) {
        return (
            <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" /> GitHub Quick Stats
                </h3>
                <p className="text-sm text-[var(--muted-foreground)]">{error || 'No stats found'}</p>
            </div>
        );
    }

    return (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-[var(--foreground)] flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" /> GitHub Quick Stats
                </h3>
                {/* <a
                    href={`https://github.com/${username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[var(--accent)] hover:underline flex items-center gap-1"
                >
                    <Github className="h-4 w-4" /> View Profile
                </a> */}
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-[var(--accent)]" />
                    <span>Followers:</span>
                    <span className="font-bold text-[var(--foreground)]">{stats.followers}</span>
                </div>
                <div className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-[var(--accent)]" />
                    <span>Following:</span>
                    <span className="font-bold text-[var(--foreground)]">{stats.following}</span>
                </div>
                <div className="flex items-center gap-2">
                    <GitBranch className="h-4 w-4 text-[var(--accent)]" />
                    <span>Public Repos:</span>
                    <span className="font-bold text-[var(--foreground)]">{stats.publicRepos}</span>
                </div>
                <div className="flex items-center gap-2">
                    <GitCommit className="h-4 w-4 text-[var(--accent)]" />
                    <span>Commits (recent):</span>
                    <span className="font-bold text-[var(--foreground)]">{stats.totalCommits}</span>
                </div>
                <div className="flex items-center gap-2">
                    <GitPullRequest className="h-4 w-4 text-[var(--accent)]" />
                    <span>PRs (recent):</span>
                    <span className="font-bold text-[var(--foreground)]">{stats.totalPRs}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-[var(--accent)]" />
                    <span>Issues (recent):</span>
                    <span className="font-bold text-[var(--foreground)]">{stats.totalIssues}</span>
                </div>
            </div>
        </div>
    );
}
