import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './page-not-found.css';

export default class PageNotFound extends Component {
    render() {
        return (
            <div className="center not-found-container">
                <FontAwesomeIcon icon="map-signs" className="not-found-img" />
                <h1>Page not found</h1>
                <p>Oops! Check the URL in your browser or <a href="/">go home</a>.</p>
            </div>
        )
    }
}
