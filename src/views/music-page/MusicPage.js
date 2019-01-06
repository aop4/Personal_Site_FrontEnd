import React, { Component } from 'react';
import MusicPlayerInterface from './MusicPlayerInterface';
import axios from 'axios';
import SongSelector from './SongSelector';
import './music-page.css';
import { BASE_URL } from '../../constants';

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
        this.getAlbums();
    }

    getAlbums() {
        axios.get(BASE_URL + '/albums')
        .then((resp) => {
            // set the current album to the first album and the current song
            // to the first song
            let albums = resp.data;
            this.setState({
                albums: albums,
                currentAlbum: albums[0],
                currentSong: albums[0].songs[0]
            });
        });
    }

    /* Updates the play count of `song` in the database */
    updatePlayCount(song, album) {
        axios.patch(BASE_URL + '/albums/' + album.id + '/songs/' + song.id)
        .then(() => {}, (err) => {
            console.log(err);
        });
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
        this.musicPlayer.current.playNew(song);
        this.updatePlayCount(song, this.state.currentAlbum);
        this.setState({
            currentSongIndex: index,
            currentSong: song
        });
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
        this.setState({ currentAlbum: album })
    }

    render() {
        return (
            <div className="music-container">
                <h1>Albums</h1>
                {this.state.albums.map((album) =>
                    <button key={ album.id }
                        onClick={ () => this.setCurrentAlbum(album) }
                        className={ "album-btn " + (this.state.currentAlbum.id === album.id ? ' active-link':'') }>
                        { album.title }
                    </button>
                )}
                <p>{ this.state.currentAlbum.description }</p>
                <div className="controls-container">
                    <MusicPlayerInterface
                        ref={ this.musicPlayer }
                        song={ this.state.currentSong }
                        playNextSong={ () => this.playNextSong() }
                        playPrevSong={ () => this.playPrevSong() }
                        playFirstSong={ () => this.playSong(0) } />
                    {this.state.currentAlbum.songs.map((song, index) =>
                        <SongSelector song={ song }
                            playSong={ () => this.playSong(index) }
                            key={ song.id }
                            currentSong={ this.state.currentSong } />
                    )}
                </div>
            </div>
        );
    }
}
