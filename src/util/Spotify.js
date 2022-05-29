let accessToken;
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = 'http://hesitant-body.surge.sh';

const Spotify = {
    getAccessToken() {
        console.log('Getting Access Token');
        if (accessToken) {
            console.log('Access Token already generated');
            return accessToken;
        }

        //check for access token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            //wipe access token and URL parameters
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        };
    },

    async search(searchTerm) {
        const accessToken = Spotify.getAccessToken();

        console.log('Starting fetch')
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log('Fetch succesfull -- calling response.json()')
        const jsonResponse = await response.json();

        console.log('response.json() succesfull -- checking if null')
        if (!jsonResponse.tracks) {
            return [];
        }
        return (jsonResponse.tracks.items?.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
        })));
    },

    async savePlaylist(playlistName, trackUris) {
        if ( !playlistName || !trackUris.length ) {
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}`};
        let userId;

        const response = await fetch('https://api.spotify.com/v1/me', {headers: headers})
        const jsonResponse = await response.json();

        userId = jsonResponse.id;
        const response2 = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
            {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ name: playlistName})

            });
        const jsonResponse2 = await response2.json();
        

        const playlistId = jsonResponse2.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, 
            {headers: headers,
            method: 'POST',
            body: JSON.stringify({ uris: trackUris})
            })
    }
}

export default Spotify;