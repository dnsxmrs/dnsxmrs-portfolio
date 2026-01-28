import { useState, useEffect } from 'react';

interface LanguageStats {
  [key: string]: number;
}

export function useGithubLanguages(username: string) {
  const [languages, setLanguages] = useState<LanguageStats>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get user's repositories
        const reposResponse = await fetch(
          `/api/github/users/${username}/repos?per_page=100`
        );

        if (!reposResponse.ok) {
          throw new Error('Failed to fetch repositories');
        }

        const repos = await reposResponse.json();
        const languageStats: LanguageStats = {};

        // Aggregate languages from all repos
        for (const repo of repos) {
          if (repo.languages_url) {
            try {
              const langResponse = await fetch(repo.languages_url.replace('https://api.github.com', '/api/github'));
              if (langResponse.ok) {
                const repoLanguages: LanguageStats = await langResponse.json();
                
                // Add to total
                Object.entries(repoLanguages).forEach(([lang, bytes]) => {
                  languageStats[lang] = (languageStats[lang] || 0) + bytes;
                });
              }
            } catch (err) {
              console.error(`Error fetching languages for ${repo.name}:`, err);
            }
          }
        }

        setLanguages(languageStats);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch languages');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchLanguages();
    }
  }, [username]);

  return { languages, loading, error };
}
