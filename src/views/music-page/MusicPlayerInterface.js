import React, { Component } from 'react';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';
import './music-player-interface.css';
import ReactPlayer from 'react-player';
import { BASE_URL } from '../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
                <button onClick={ () => this.props.playPrevSong() }>
                    <FontAwesomeIcon icon="backward" />
                </button>
                <button onClick={ () => this.handlePlayPauseBtnClick() }>
                    <If condition={ this.state.playing }>
                        <Then><FontAwesomeIcon icon="pause" /></Then>
                        <Else><FontAwesomeIcon icon="play" /></Else>
                    </If>
                </button>
                <button onClick={ () => this.props.playNextSong() }>
                    <FontAwesomeIcon icon="forward" />
                </button>
            </div>
        );
    }

}
