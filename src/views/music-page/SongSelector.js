import React, { Component } from 'react';
import { If, Then } from 'react-if';
import {SlideDown} from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';
import './song-selector.css';

export default class SongSelector extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hideLyrics: true
        }
    }

    toggleLyrics() {
        this.setState({
            hideLyrics: !this.state.hideLyrics
        });
    }

    render() {
        return (
            <div>
                <button onClick={ () => this.props.playSong() }
                    className={"select-song-btn " + 
                        (this.props.currentSong.id === this.props.song.id ? 'active-link':'') }>
                    { this.props.song.title }
                </button>
                <If condition={ this.props.song.lyrics.length > 0 }>
                    <Then>
                        <button className="lyrics-btn"
                            onClick={ () => this.toggleLyrics() }>Lyrics</button>
                        <SlideDown closed={ this.state.hideLyrics }>
                            <p className="lyrics">
                                { this.props.song.lyrics }
                            </p>
                        </SlideDown>
                    </Then>
                </If>
            </div>
        );
    }
}
