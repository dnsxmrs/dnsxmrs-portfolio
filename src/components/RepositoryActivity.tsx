'use client';

import { ExternalLink, BarChart3 } from 'lucide-react';
import { useGithubLanguages } from '@/hooks/useGithubLanguages';

interface RepositoryActivityProps {
  username: string;
}

const languageColors: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Python: '#3776AB',
  'C#': '#239120',
  PHP: '#777BB4',
  Java: '#007396',
  Go: '#00ADD8',
  Rust: '#DEA584',
  HTML: '#E34F26',
  CSS: '#1572B6',
  C: '#A8B9CC',
  'C++': '#F34B7D',
  Ruby: '#CC342D',
  Shell: '#89E051',
  Swift: '#FA7343',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
};

export default function RepositoryActivity({ username }: RepositoryActivityProps) {
  const { languages, loading, error } = useGithubLanguages(username);

  if (loading) {
    return (
      <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
        <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5" /> Repository Activity
        </h3>
        <div className="h-8 bg-[var(--muted)] rounded animate-pulse"></div>
      </div>
    );
  }

  if (error || Object.keys(languages).length === 0) {
    return (
      <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
        <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5" /> Repository Activity
        </h3>
        <p className="text-sm text-[var(--muted-foreground)]">
          {error || 'No language data available'}
        </p>
      </div>
    );
  }

  // Calculate percentages
  const total = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
  const languagePercentages = Object.entries(languages)
    .map(([lang, bytes]) => ({
      language: lang,
      percentage: (bytes / total) * 100,
      bytes,
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 8); // Top 8 languages

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[var(--foreground)] flex items-center gap-2">
          <BarChart3 className="h-5 w-5" /> Repository Activity
        </h3>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[var(--accent)] hover:underline flex items-center gap-1"
        >
          View on GitHub <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      {/* Language Bar */}
      <div className="w-full h-2 bg-[var(--muted)] rounded-full overflow-hidden flex mb-4">
        {languagePercentages.map(({ language, percentage }) => (
          <div
            key={language}
            style={{
              width: `${percentage}%`,
              backgroundColor: languageColors[language] || '#6B7280',
            }}
            className="h-full"
            title={`${language}: ${percentage.toFixed(1)}%`}
          />
        ))}
      </div>

      {/* Language Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
        {languagePercentages.map(({ language, percentage }) => (
          <div key={language} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: languageColors[language] || '#6B7280' }}
            />
            <span className="text-[var(--muted-foreground)]">
              {language}•<span className="font-medium">{percentage.toFixed(0)}%</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
