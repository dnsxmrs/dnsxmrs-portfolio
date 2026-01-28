import { useState, useEffect } from 'react';

interface GitHubRepo {
    name: string;
    full_name: string;
    description: string;
    stargazers_count: number;
    html_url: string;
    language: string;
    languages_url: string;
    topics: string[];
    owner: {
        login: string;
    };
}

interface GitHubContributor {
    login: string;
    contributions: number;
}

export interface RepoData {
    name: string;
    fullName: string;
    description: string;
    stars: number;
    url: string;
    language: string;
    languages: Record<string, number>;
    topics: string[];
    contributors: number;
    owner: string;
}

export function useGithubRepo(owner: string, repo: string) {
    const [data, setData] = useState<RepoData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRepoData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch repository details
                const repoResponse = await fetch(
                    `https://api.github.com/repos/${owner}/${repo}`
                );

                if (!repoResponse.ok) {
                    throw new Error('Repository not found');
                }

                const repoData: GitHubRepo = await repoResponse.json();

                // Fetch contributors count
                const contributorsResponse = await fetch(
                    `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=1`
                );

                let contributorsCount = 0;
                if (contributorsResponse.ok) {
                    const linkHeader = contributorsResponse.headers.get('Link');
                    if (linkHeader) {
                        const match = linkHeader.match(/page=(\d+)>; rel="last"/);
                        contributorsCount = match ? parseInt(match[1]) : 0;
                    } else {
                        const contributors: GitHubContributor[] = await contributorsResponse.json();
                        contributorsCount = contributors.length;
                    }
                }

                // Fetch languages
                const languagesResponse = await fetch(repoData.languages_url);
                const languages: Record<string, number> = languagesResponse.ok
                    ? await languagesResponse.json()
                    : {};

                setData({
                    name: repoData.name,
                    fullName: repoData.full_name,
                    description: repoData.description || 'No description available',
                    stars: repoData.stargazers_count,
                    url: repoData.html_url,
                    language: repoData.language || 'Unknown',
                    languages,
                    topics: repoData.topics || [],
                    contributors: contributorsCount,
                    owner: repoData.owner.login,
                });
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch repository data');
            } finally {
                setLoading(false);
            }
        };

        if (owner && repo) {
            fetchRepoData();
        }
    }, [owner, repo]);

    return { data, loading, error };
}
