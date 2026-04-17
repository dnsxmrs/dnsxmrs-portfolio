export interface Commit {
    sha: string;
    message: string;
    repo: string;
    authorName: string;
    date: string;
    url: string;
    additions: number;
    deletions: number;
}

interface GitHubRepo {
    name: string;
    pushed_at: string;
    owner?: {
        login: string;
    };
}

interface GitHubCommitListItem {
    sha: string;
    url: string;
    html_url: string;
    commit: {
        message: string;
        author: {
            name: string;
            date: string;
        } | null;
    };
}

interface GitHubCommitDetail {
    stats?: {
        additions?: number;
        deletions?: number;
    };
}

interface CacheEntry {
    expiresAt: number;
    data: Commit[];
}

export interface GetLatestUserCommitsOptions {
    token?: string;
    cacheTtlMs?: number;
}

const DEFAULT_REPO_LIMIT = 20;
const DEFAULT_COMMITS_PER_REPO = 5;
const DEFAULT_CACHE_TTL_MS = 5 * 60 * 1000;
const CACHE = new Map<string, CacheEntry>();

function buildHeaders(token?: string): HeadersInit {
    const headers: HeadersInit = {
        'X-GitHub-Api-Version': '2022-11-28',
        Accept: 'application/vnd.github+json',
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    return headers;
}

function isFresh(entry: CacheEntry | undefined): entry is CacheEntry {
    return Boolean(entry && entry.expiresAt > Date.now());
}

/**
 * Fetches latest commits across a user's repositories, sorted globally by date.
 *
 * - Repositories are fetched by most-recent push activity and limited to top 20.
 * - Up to 5 commits are fetched per repository in parallel.
 * - Repo-level failures are isolated to avoid failing the whole result.
 * - Commits are deduplicated by SHA and globally sorted by author date.
 */
export async function getLatestUserCommits(
    username: string,
    limit: number,
    options: GetLatestUserCommitsOptions = {}
): Promise<Commit[]> {
    const safeUsername = username.trim();
    const safeLimit = Math.max(0, Math.floor(limit));

    if (!safeUsername || safeLimit === 0) {
        return [];
    }

    const token = options.token ?? process.env.GITHUB_TOKEN;
    const cacheTtlMs = options.cacheTtlMs ?? DEFAULT_CACHE_TTL_MS;
    const cacheKey = `${safeUsername}:${safeLimit}:${token ? 'auth' : 'anon'}`;
    const cached = CACHE.get(cacheKey);

    if (isFresh(cached)) {
        return cached.data;
    }

    const headers = buildHeaders(token);
    const publicReposUrl = `https://api.github.com/users/${encodeURIComponent(safeUsername)}/repos?sort=pushed&per_page=100`;
    const ownedReposUrl = 'https://api.github.com/user/repos?sort=pushed&per_page=100&affiliation=owner';

    let repos: GitHubRepo[] = [];
    try {
        const [publicReposRes, ownedReposRes] = await Promise.all([
            fetch(publicReposUrl, {
                headers,
                next: { revalidate: 0 },
            }),
            token
                ? fetch(ownedReposUrl, {
                    headers,
                    next: { revalidate: 0 },
                })
                : Promise.resolve(null),
        ]);

        const publicReposJson: unknown = publicReposRes.ok ? await publicReposRes.json() : [];
        const publicRepos = Array.isArray(publicReposJson) ? (publicReposJson as GitHubRepo[]) : [];

        let ownedRepos: GitHubRepo[] = [];
        if (ownedReposRes && ownedReposRes.ok) {
            const ownedReposJson: unknown = await ownedReposRes.json();
            if (Array.isArray(ownedReposJson)) {
                ownedRepos = (ownedReposJson as GitHubRepo[]).filter(
                    (repo) => repo.owner?.login?.toLowerCase() === safeUsername.toLowerCase()
                );
            }
        }

        // Merge public + token-auth owned repos and dedupe by repo name.
        repos = Array.from(new Map([...publicRepos, ...ownedRepos].map((repo) => [repo.name, repo])).values());
    } catch {
        return [];
    }

    if (repos.length === 0) {
        return [];
    }

    const topRepos = repos
        .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
        .slice(0, DEFAULT_REPO_LIMIT);

    const commitRequests = topRepos.map(async (repo) => {
        const commitsUrl = `https://api.github.com/repos/${encodeURIComponent(safeUsername)}/${encodeURIComponent(repo.name)}/commits?per_page=${DEFAULT_COMMITS_PER_REPO}&author=${encodeURIComponent(safeUsername)}`;

        try {
            const commitsRes = await fetch(commitsUrl, {
                headers,
                next: { revalidate: 0 },
            });

            // Some repositories can be empty or inaccessible; skip safely.
            if (!commitsRes.ok) {
                return [] as Commit[];
            }

            const commitsJson: unknown = await commitsRes.json();
            if (!Array.isArray(commitsJson)) {
                return [] as Commit[];
            }

            return (commitsJson as GitHubCommitListItem[])
                .map((item) => {
                    const author = item.commit.author;
                    if (!author?.date) {
                        return null;
                    }

                    return {
                        sha: item.sha,
                        message: item.commit.message.split('\n')[0],
                        repo: repo.name,
                        authorName: author.name,
                        date: author.date,
                        url: item.html_url,
                        additions: 0,
                        deletions: 0,
                        // Keep the API URL temporarily so we can fetch stats later.
                        apiUrl: item.url,
                    };
                })
                .filter((commit): commit is (Commit & { apiUrl: string }) => commit !== null);
        } catch {
            return [] as Commit[];
        }
    });

    const perRepoCommits = await Promise.all(commitRequests);
    const flattened = perRepoCommits.flat() as Array<Commit & { apiUrl?: string }>;

    const deduped = Array.from(new Map(flattened.map((commit) => [commit.sha, commit])).values());
    const topCommits = deduped
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, safeLimit);

    // Fetch stats only for the final selected commits to keep API calls bounded.
    const result = await Promise.all(
        topCommits.map(async (commit) => {
            if (!commit.apiUrl) {
                return {
                    ...commit,
                    additions: 0,
                    deletions: 0,
                } as Commit;
            }

            try {
                const detailRes = await fetch(commit.apiUrl, {
                    headers,
                    next: { revalidate: 0 },
                });

                const details: GitHubCommitDetail | null = detailRes.ok ? await detailRes.json() : null;
                return {
                    sha: commit.sha,
                    message: commit.message,
                    repo: commit.repo,
                    authorName: commit.authorName,
                    date: commit.date,
                    url: commit.url,
                    additions: details?.stats?.additions ?? 0,
                    deletions: details?.stats?.deletions ?? 0,
                } satisfies Commit;
            } catch {
                return {
                    sha: commit.sha,
                    message: commit.message,
                    repo: commit.repo,
                    authorName: commit.authorName,
                    date: commit.date,
                    url: commit.url,
                    additions: 0,
                    deletions: 0,
                } satisfies Commit;
            }
        })
    );

    CACHE.set(cacheKey, {
        expiresAt: Date.now() + cacheTtlMs,
        data: result,
    });

    return result;
}
