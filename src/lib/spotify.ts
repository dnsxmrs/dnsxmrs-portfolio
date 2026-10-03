const ACCOUNTS_API = "https://accounts.spotify.com";
const WEB_API = "https://api.spotify.com/v1";

type SpotifyImage = {
    url: string;
};

type SpotifyTrack = {
    name: string;
    external_urls?: {
        spotify?: string;
    };
    artists?: Array<{ name: string }>;
    album?: {
        name?: string;
        images?: SpotifyImage[];
    };
    duration_ms?: number;
};

type CurrentlyPlayingResponse = {
    is_playing?: boolean;
    progress_ms?: number;
    item?: SpotifyTrack | null;
};

export type SpotifyNowPlaying =
    | { status: "playing"; track: SpotifyTrack; progressMs: number }
    | { status: "idle" }
    | { status: "unavailable" };

const getBasicAuthorization = () => {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        throw new Error("Missing Spotify client credentials");
    }

    return `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`;
};

export const getSpotifyAccessToken = async (refreshToken = process.env.SPOTIFY_REFRESH_TOKEN) => {
    if (!refreshToken) {
        throw new Error("Missing Spotify refresh token");
    }

    const response = await fetch(`${ACCOUNTS_API}/api/token`, {
        method: "POST",
        headers: {
            Authorization: getBasicAuthorization(),
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
        }),
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(`Spotify token refresh failed with status ${response.status}`);
    }

    const data = await response.json();
    if (!data.access_token) {
        throw new Error("Spotify token response did not include an access token");
    }

    return data.access_token as string;
};

export const getCurrentlyPlaying = async (): Promise<SpotifyNowPlaying> => {
    const accessToken = await getSpotifyAccessToken();
    const response = await fetch(`${WEB_API}/me/player/currently-playing`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
    });

    if (response.status === 204) {
        return { status: "idle" };
    }

    if (!response.ok) {
        throw new Error(`Spotify currently-playing request failed with status ${response.status}`);
    }

    const data: CurrentlyPlayingResponse = await response.json();
    if (!data.is_playing || !data.item) {
        return { status: "idle" };
    }

    return {
        status: "playing",
        track: data.item,
        progressMs: data.progress_ms ?? 0,
    };
};

export const getSpotifyAuthorizationUrl = (state: string) => {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

    if (!clientId || !redirectUri) {
        throw new Error("Missing Spotify OAuth environment variables");
    }

    const params = new URLSearchParams({
        client_id: clientId,
        response_type: "code",
        redirect_uri: redirectUri,
        scope: "user-read-currently-playing",
        state,
    });

    return `${ACCOUNTS_API}/authorize?${params.toString()}`;
};

export const exchangeSpotifyCode = async (code: string) => {
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

    if (!redirectUri) {
        throw new Error("Missing Spotify redirect URI");
    }

    const response = await fetch(`${ACCOUNTS_API}/api/token`, {
        method: "POST",
        headers: {
            Authorization: getBasicAuthorization(),
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "authorization_code",
            code,
            redirect_uri: redirectUri,
        }),
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(`Spotify authorization code exchange failed with status ${response.status}`);
    }

    const data = await response.json();
    if (!data.refresh_token) {
        throw new Error("Spotify token response did not include a refresh token");
    }

    return data.refresh_token as string;
};
