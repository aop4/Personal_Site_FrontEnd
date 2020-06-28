import React, { Component } from 'react';
import MusicPlayerInterface from './MusicPlayerInterface';
import axios from 'axios';
import SongSelector from './SongSelector';
import './music-page.css';
import { BASE_URL } from '../../constants';
import LoadingScreen from '../loading-screen/LoadingScreen';
import { If, Then } from 'react-if';
import renderHTML from 'react-render-html';

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
            album.description = renderHTML(album.description);
            album.spanish_desc = renderHTML(album.spanish_desc);
        });
    }

    /* Increments the play count of `song` in the database */
    updatePlayCount(song, album) {
        let url = `${BASE_URL}/albums/${album.id}/songs/${song.id}`;
        axios.patch(url, {play_count: 1});
    }

    /* Returns true if index is not a valid index for this.currentAlbum.songs
    (i.e., if the index doesn't correspond to a song). */
    invalidSongIndex(index) {
        return (index < 0 || index >= this.state.currentAlbum.songs.length);
    }

    /* Attempts to play the indexth song of this.currentAlbum.songs.
    If index is out of bounds, nothing happens. */
    playSong(index) {
        if (this.invalidSongIndex(index)) {
            console.log("Invalid song index");
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

    playNextSong() {
        this.playSongOffsetN(1);
    }

    playPrevSong() {
        this.playSongOffsetN(-1);
    }

    /* Attempts to play the song that is n songs from this.currentSong in
    this.currentAlbum.songs. If n is positive, it will attempt to play the
    song n songs ahead of this.currentSong. Else it will attempt to play
    the song n songs behind the current song. If this.currentSongIndex + n is 
    out of bounds, nothing happens. */
    playSongOffsetN(n) {
        let nextSongIndex = this.state.currentSongIndex + n;
        this.playSong(nextSongIndex);
    }

    setCurrentAlbum(album) {
        this.setState({ currentAlbum: album });
    }

    render() {
        return (
            <div className="music-container">
                <h1>{ this.props.lang === 'es' ? 'Álbumes':'Albums' }</h1>
                {this.state.albums.map((album) =>
                    <button key={ album.id }
                        onClick={ () => this.setCurrentAlbum(album) }
                        className={ "album-btn " + (this.state.currentAlbum.id === album.id ? ' active-link':'') }>
                        { album.title }
                    </button>
                )}
                <div className="album-container">
                    <p>
                        { this.props.lang === 'es' && this.state.currentAlbum.spanish_desc.length > 0 ? this.state.currentAlbum.spanish_desc : this.state.currentAlbum.description }
                    </p>
                    <If condition={ this.state.currentAlbum.album_art_path !== ''
                        && this.state.currentAlbum.album_art_path !== undefined }>
                        <Then>
                            <img className="album-cover"
                                src={ BASE_URL + this.state.currentAlbum.album_art_path }
                                alt="" />
                        </Then>
                    </If>
                    <div className="controls-container">
                        <MusicPlayerInterface
                            ref={ this.musicPlayer }
                            currentSong={ this.state.currentSong }
                            playNextSong={ () => this.playNextSong() }
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
        );
    }
}
