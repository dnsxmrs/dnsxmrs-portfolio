export const getRecentTracks = async () => {
    const API_KEY = process.env.LASTFM_API_KEY;
    const USERNAME = process.env.LASTFM_USERNAME;
    
    if (!API_KEY || !USERNAME) {
        throw new Error("Missing Last.fm environment variables");
    }

    const endpoint = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=1`;
    
    return fetch(endpoint, {
        next: {
            revalidate: 0 // We don't want to cache now playing data
        }
    });
};
