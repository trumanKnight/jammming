import React from 'react';
import { Tracklist } from '../Tracklist/Tracklist';

import './Playlist.css';

export class Playlist extends React.Component {
    render() {
        return(
            <div className="Playlist">
                <input value="New Playlist"/>
                <Tracklist tracks={this.props.playlistTracks}
                           onRemove={this.props.onRemove}
                           isRemoval={true}/>
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>   
        )
    }
}