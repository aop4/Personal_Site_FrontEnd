import React, { Component } from 'react';
import { If, Then, Else } from 'react-if';
import {SlideDown} from '@teskon/react-slidedown';
import Downloader from 'js-file-downloader';
import parse from 'html-react-parser';
import axios from 'axios';
import '@teskon/react-slidedown/lib/slidedown.css';
import './song-selector.css';

import { BASE_URL } from '../../constants';

export default class SongSelector extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hideLyrics: true,
            wasDownloaded: false
        };
    }

    toggleLyrics() {
        this.setState({
            hideLyrics: !this.state.hideLyrics
        });
    }

    downloadSong(song) {
        new Downloader({
            url: BASE_URL + song.file_path
        })
        .then(() => {
            this.setState({
                wasDownloaded: true
            });
            this.updateDownloadCount(song, this.props.currentAlbum);
        });
    }

    /**
     * Increments the download count of `song` in the database
     */
    updateDownloadCount(song, album) {
        let url = `${BASE_URL}/albums/${album.id}/songs/${song.id}`;
        axios.patch(url, {download_count: 1});
    }

    render() {
        return (
            <div>
                <div className="song-selector">
                    <button onClick={ () => this.props.playSong() }
                        className={"select-song-btn " + 
                            (this.props.currentSong.id === this.props.song.id ? 'active-link':'') }>
                        { this.props.song.title }
                    </button>
                    <div>
                        <If condition={ !!this.props.song.lyrics }>
                            <Then>
                                <button className="lyrics-btn"
                                    onClick={ () => this.toggleLyrics() }>Lyrics</button>
                            </Then>
                        </If>
                        <If condition={ !this.state.wasDownloaded }>
                            <Then>
                                <button aria-label="Download Song"
                                        onClick={ () => this.downloadSong(this.props.song) }
                                        title= { 'Download ' + this.props.song.title }
                                        className="download-button">
                                    <i className="fa-solid fa-download"/>
                                </button>
                            </Then>
                            <Else>
                                <i className="fa-solid fa-check song-downloaded-checkmark"/>
                            </Else>
                        </If>
                    </div>
                </div>
                <SlideDown closed={ this.state.hideLyrics }>
                    <p className="lyrics">
                        { parse(this.props.song.lyrics || '') }
                    </p>
                </SlideDown>
            </div>
        );
    }
}
