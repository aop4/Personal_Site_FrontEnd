import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './loading-screen.css';

/* A component that's a generic loading screen  */
export default class LoadingScreen extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            showSpinner: false,
            hideAll: true
        };
    }

    /* call when loading of data begins. Shows a loading message and a spinner */
    onLoadingStarted() {
        this.setState({
            message: 'Waking up a snoring server...',
            showSpinner: true,
            hideAll: false
        });
    }

    /* call when loading of data fails. Shows a failure message */
    onLoadingFailed() {
        this.setState({
            message: 'Failed to load content.',
            showSpinner: false,
            hideAll: false
        });
    }

    /* call when loading of data occurs successfully. Hides the component. */
    onLoadingSucceeded() {
        this.setState({
            message: '',
            showSpinner: false,
            hideAll: true
        });
    }

    render() {
        return (
            <div className={ 'loading-container ' + (this.state.hideAll ? 'hidden':'') }>
                <FontAwesomeIcon icon="peace"
                    className={ "loading-icon " + (this.state.showSpinner ? '':'hidden') }
                    spin />
                <p>{ this.state.message }</p>
            </div>
        );
    }

}
