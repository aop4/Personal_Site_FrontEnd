import React, { Component } from 'react';
import MusicPlayerInterface from './MusicPlayerInterface';
import axios from 'axios';
import SongSelector from './SongSelector';
import './music-page.css';
import { BASE_URL } from '../../constants';
import LoadingScreen from '../loading-screen/LoadingScreen';
import { If, Then, Else } from 'react-if';
import parse from 'html-react-parser';

export default class MusicPage extends Component {

    constructor(props) {
        super(props);
        this.musicPlayer = React.createRef();
        this.state = {
            albums: [],
            currentAlbum: {songs: []},
            currentSong: {},
            currentSongIndex: 0
        };
        this.loadingScreen = React.createRef();
    }

    componentDidMount() {
        this.getAlbums();
    }

    getAlbums() {
        this.loadingScreen.current.onLoadingStarted();
        axios.get(BASE_URL + '/albums')
        .then((resp) => {
            this.loadingScreen.current.onLoadingSucceeded();
            // set the current album to the first album and the current song
            // to the first song
            let albums = resp.data;
            this.renderAlbumDescriptions(albums);
            this.setState({
                albums: albums,
                currentAlbum: albums[0],
                currentSong: albums[0].songs[0]
            });
        }, (err) => {
            this.loadingScreen.current.onLoadingFailed();
        });
    }

    renderAlbumDescriptions(albums) {
        albums.forEach(album => {
            if (album.description) {
                album.description = parse(album.description || '');
            }
            if (album.spanish_desc) {
                album.spanish_desc = parse(album.spanish_desc || '');
            }
        });
    }

    /* Increments the play count of `song` in the database */
    updatePlayCount(song, album) {
        let url = `${BASE_URL}/albums/${album.id}/songs/${song.id}`;
        axios.patch(url, {play_count: 1});
    }

    /**
     * Attempts to play the indexth song of currentAlbum.songs.
     * If index is negative, nothing happens. If index is too large for the album,
     * that indicates the last track has ended, and so the music player is reset.
     */
    playSong(index) {
        if (index < 0) {
            return;
        }
        if (index >= this.state.currentAlbum.songs.length) {
            // we have passed the last song in the album, so reset the music player
            // in case the user presses play again
            this.resetPlayer();
            return;
        }
        let song = this.state.currentAlbum.songs[index];
        this.setState({
            currentSongIndex: index,
            currentSong: song
        });
        this.musicPlayer.current.playNew(song);
        this.updatePlayCount(song, this.state.currentAlbum);
    }

    /**
     * Handles a song skip triggered by the user clicking the skip-forward button.
     */
    handleSongSkip() {
        // ignore song skips at the last song. If playSong() were called, it would
        // cause the music player to reset and playback to halt.
        if (this.state.currentSongIndex < this.state.currentAlbum.songs.length - 1) {
            this.playNextSong();
        }
    }

    playNextSong() {
        this.playSongOffsetN(1);
    }

    playPrevSong() {
        this.playSongOffsetN(-1);
    }

    /**
     * Attempts to play the song that is n songs from this.currentSong in
     * this.currentAlbum.songs. If n is positive, it will attempt to play the
     * song n songs ahead of this.currentSong. Else it will attempt to play
     * the song n songs behind the current song.
     */
    playSongOffsetN(n) {
        let nextSongIndex = this.state.currentSongIndex + n;
        this.playSong(nextSongIndex);
    }

    /**
     * Sets the current album and resets the audio player if the selected album has changed.
     */
    setCurrentAlbum(album) {
        if (album !== this.state.currentAlbum) {
            this.setState({ currentAlbum: album }, this.resetPlayer);
        }
    }

    /**
     * Halts the music player and resets the current song to the first song in the
     * current album.
     */
    resetPlayer() {
        this.musicPlayer.current.pause();
        let queuedSong = this.state.currentAlbum.songs[0];
        this.setState({
            currentSong: queuedSong,
            currentSongIndex: 0
        });
    }

    render() {
        return (
            <div className="music-container">
                <h1>{ this.props.lang === 'es' ? 'Álbumes':'Albums' }</h1>
                <If condition={ this.props.lang === 'es' }>
                    <Then>
                        <p>Escribo y grabo canciones para divertirme. Si le gustan éstas, es posible que disfrute de escuchar a <a href="https://bloomcliffe.bandcamp.com">Bloomcliffe</a>.</p>
                    </Then>
                    <Else>
                        <p>I write and record music for kicks. You may also like the songs I write as <a href="https://bloomcliffe.bandcamp.com">Bloomcliffe</a>.</p>
                    </Else>
                </If>
                {this.state.albums.map((album) =>
                    <button key={ album.id }
                        onClick={ () => this.setCurrentAlbum(album) }
                        className={ "album-btn " + (this.state.currentAlbum.id === album.id ? ' active-link':'') }>
                        { album.title }
                    </button>
                )}
                <div className="album-container">
                    <p>
                        { this.props.lang === 'es' ? this.state.currentAlbum.spanish_desc : this.state.currentAlbum.description }
                    </p>
                    <div className="image-and-controls">
                        <If condition={ this.state.currentAlbum.album_art_path !== ''
                            && this.state.currentAlbum.album_art_path !== undefined }>
                            <Then>
                                <img className="album-cover"
                                    src={ BASE_URL + this.state.currentAlbum.album_art_path }
                                    alt="Album Artwork" />
                            </Then>
                        </If>
                        <div className="controls-container">
                            <MusicPlayerInterface
                                ref={ this.musicPlayer }
                                currentSong={ this.state.currentSong }
                                playNextSong={ () => this.playNextSong() }
                                handleSongSkip={ () => this.handleSongSkip() }
                                playPrevSong={ () => this.playPrevSong() }
                                updatePlayCount={ () => this.updatePlayCount(this.state.currentSong, this.state.currentAlbum) } />
                            <LoadingScreen ref={ this.loadingScreen } />
                            {this.state.currentAlbum.songs.map((song, index) =>
                                <SongSelector song={ song }
                                    playSong={ () => this.playSong(index) }
                                    key={ song.id }
                                    currentSong={ this.state.currentSong }
                                    currentAlbum={ this.state.currentAlbum } />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
