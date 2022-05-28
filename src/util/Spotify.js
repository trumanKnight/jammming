let accessToken;
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = 'http://localhost:3000';

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken
        }

        //check for access token match
        const accessTokenMatch = window.location.href.match('/access_token=([^&]*/)');
        const expiresInMatch = window.location.href.match('/expires_in=([^&]*/)');

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            //wipe access token and URL parameters
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    }
}

export default Spotify;