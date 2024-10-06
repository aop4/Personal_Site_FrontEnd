import React, { Component } from 'react';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';
import './music-player-interface.css';
import ReactPlayer from 'react-player';
import { BASE_URL } from '../../constants';
import { If, Then, Else } from 'react-if';

export default class MusicPlayerInterface extends Component {

    constructor(props) {
        super(props);
        this.audioPlayer = React.createRef();
        this.state = {
            playing: false,
            songUrl: '',
            fractionPlayed: 0 // the fraction of the current song that's been
                                // played (in range [0, 1])
        };
    }

    playNew(song) {
        this.setURL(BASE_URL + song.file_path);
        this.resume();
    }

    setURL(songUrl) {
        this.setState({
            url: songUrl
        });
    }

    handlePlayPauseBtnClick() {
        if (this.state.playing) { 
            this.pause();
        }
        else {
            // If the user hit the play button and the current song hasn't been
            // started yet, then update the play count (this is for the first
            // play of the first song if triggered via the Play button)
            if (this.state.fractionPlayed === 0) {
                this.props.updatePlayCount();
            }
            this.resume();
        }
    }

    /* Resumes or initializes playback. */
    resume() {
        this.setState({
            playing: true
        });
    }

    pause() {
        this.setState({
            playing: false
        });
    }
    
    /* Plays the next song in the queue after a short delay. */
    queueNextSong() {
        setTimeout(() => this.props.playNextSong(), 1000);
    }

    /* fractionPlayed is a value between 0 and 1. This function moves the slider
    so that it is (fractionPlayed * 100)% to the end. When a song is 50% over,
    fractionPlayed is passed into this from the MusicPlayerInterface as 0.5, and
    the slider will move incrementally to its halfway point. */
    updateSlider(fractionPlayed) {
        this.setState({ fractionPlayed: fractionPlayed });
    }

    render() {
        return (
            <div className="center music-player">
                <ReactPlayer className="hidden"
                    url={ BASE_URL + (this.props.currentSong.file_path || '') }
                    ref={ this.audioPlayer }
                    playing={ this.state.playing }
                    onEnded={ () => this.queueNextSong() }
                    onProgress={ (data) => this.updateSlider(data.played) }
                    progressInterval={ 1000 } />
                <Slider max={ 1 }
                    step={ 0.001 }
                    value={ this.state.fractionPlayed }
                    onChange={ newVal => this.setState({ fractionPlayed: newVal }) }
                    onAfterChange={ (newVal) => this.audioPlayer.current.seekTo(newVal) }
                    railStyle={ {background: '#ddd'} }
                    trackStyle={ {background: '#4a86e8'} }/>
                <div className="player-controls">
                    <button aria-label="Play Previous Song" onClick={ () => this.props.playPrevSong() }>
                        <i className="fa-solid fa-backward prev-skip-btn"/>
                    </button>
                    <button aria-label="Play or Pause Audio" onClick={ () => this.handlePlayPauseBtnClick() }>
                        <If condition={ this.state.playing }>
                            <Then><i className="fa-solid fa-pause play-pause-btn" /></Then>
                            <Else><i className="fa-solid fa-play play-pause-btn"/></Else>
                        </If>
                    </button>
                    <button aria-label="Play Next Song" onClick={ () => this.props.handleSongSkip() }>
                        <i className="fa-solid fa-forward prev-skip-btn"/>
                    </button>
                </div>
            </div>
        );
    }

}
