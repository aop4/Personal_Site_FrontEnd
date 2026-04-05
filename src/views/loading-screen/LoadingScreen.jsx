import React, { Component } from 'react';
import './loading-screen.css';

/* A component that's a generic loading screen  */
export default class LoadingScreen extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            hideAll: true,
            isLoading: false
        };
    }

    /* call when loading of data begins. Shows a loading message and a spinner */
    onLoadingStarted() {
        this.setState({
            isLoading: true
        });
        // add a slight delay to avoid jerky rendering on quick loads
        setTimeout(() => { this.displayLoadingScreen() }, 100);
    }

    displayLoadingScreen() {
        // if still loading after delay
        if (this.state.isLoading) {
            this.setState({
                message: 'Waking up a snoring server...',
                hideAll: false
            });
        }
    }

    /* call when loading of data fails. Shows a failure message */
    onLoadingFailed() {
        this.setState({
            message: 'Failed to load content.',
            hideAll: false,
            isLoading: false
        });
    }

    /* call when loading of data occurs successfully. Hides the component. */
    onLoadingSucceeded() {
        this.setState({
            message: '',
            hideAll: true,
            isLoading: false
        });
    }

    render() {
        return (
            <div className={ 'loading-container ' + (this.state.hideAll ? 'hidden':'') }>
                <i className={"fa-solid fa-peace loading-icon fa-spin" + (this.state.isLoading ? '':' hidden')} />
                <p>{ this.state.message }</p>
            </div>
        );
    }

}
