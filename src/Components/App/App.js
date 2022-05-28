import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [{artist: 'artist1', name: 'song1', album: 'album1', id: 1},
                      {artist: 'artist2', name: 'song2', album: 'album2', id: 2},
                      {artist: 'artist3', name: 'song3', album: 'album3', id: 3}],
      playlistName: 'playlist 1',
      playlistTracks: [{artist: 'playlistArtist1', name: 'playlistSong1', album: 'playlistAlbum1', id: 4},
                       {artist: 'playlistArtist2', name: 'playlistSong2', album: 'playlistAlbum2', id: 5},
                       {artist: 'playlistArtist3', name: 'playlistSong3', album: 'playlistAlbum3', id: 6}]
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    const tracks = this.state.playlistTracks;
    if(tracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }

    tracks.push(track);

    this.setState({ playlistTracks: tracks });
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);

    this.setState({ playlistTracks: tracks });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist(){
    const trackUris = this.state.playlistTracks.map(track => track.uri);
  }

  search(searchTerm) {
    console.log(searchTerm);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} 
                           onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} 
                      playlistTracks={this.state.playlistTracks}
                      onRemove={this.removeTrack}
                      isRemoval={true}
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    )
  }  
}

export default App;
