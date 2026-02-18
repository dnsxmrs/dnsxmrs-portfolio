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

                // Fetch repository details via Next.js proxy
                const repoResponse = await fetch(
                    `/api/github/repos/${owner}/${repo}`,
                    { cache: 'no-store' }
                );

                if (!repoResponse.ok) {
                    throw new Error('Repository not found');
                }

                const repoData: GitHubRepo = await repoResponse.json();

                // Fetch contributors count via Next.js proxy
                const contributorsResponse = await fetch(
                    `/api/github/repos/${owner}/${repo}/contributors?per_page=1`,
                    { cache: 'no-store' }
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

                // Fetch languages via Next.js proxy
                const languagesResponse = await fetch(
                    `/api/github/repos/${owner}/${repo}/languages`,
                    { cache: 'no-store' }
                );
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
