'use client';

import { ExternalLink, Link, Zap } from 'lucide-react';
import { useGithubCommits } from '@/hooks/useGithubCommits';

interface RecentCommitsProps {
  username: string;
  limit?: number;
}

export default function RecentCommits({ username, limit = 5 }: RecentCommitsProps) {
  const { commits, loading, error } = useGithubCommits(username, limit);

  if (loading) {
    return (
      <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[var(--foreground)] flex items-center gap-2">
            <Zap className="h-5 w-5" /> Recent Commits
          </h3>
        </div>
        <div className="space-y-3 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-[var(--muted)] rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error || commits.length === 0) {
    return (
      <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
        <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5" /> Recent Commits
        </h3>
        <p className="text-sm text-[var(--muted-foreground)]">
          {error || 'No commits found'}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-[var(--foreground)] flex items-center gap-2">
          <Zap className="h-5 w-5" /> Recent Commits
        </h3>
      </div>

      <div className="space-y-3">
        {commits.map((commit) => (
          <a
            rel="noopener noreferrer"
            key={commit.sha}
            href={commit.url}
            target="_blank"
            className="block group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors truncate">
                  <span className="font-medium">{commit.repo}:</span> {commit.message}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)] flex-shrink-0">
                <span className="text-green-500">+{commit.additions}</span>
                <span>/</span>
                <span className="text-red-500">-{commit.deletions}</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      <a
        rel="noopener noreferrer"
        href={`https://github.com/${username}`}
        target="_blank"
        className="mt-4 inline-flex items-center gap-1 text-sm text-[var(--accent)] hover:underline"
      >
        View on GitHub <ExternalLink className="h-3 w-3" />
      </a>
    </div>
  );
}
