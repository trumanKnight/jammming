import React from 'react';
import { Track } from '../Track/Track';

import './Tracklist.css';

export class Tracklist extends React.Component {
    render() {
        return(
            <div className="Tracklist">
                {
                    this.props.tracks?.map(track => {
                        return <Track track={track} key={track.id}/>
                    })
                }
            </div>
        )
    }
}