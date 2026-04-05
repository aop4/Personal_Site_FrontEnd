import React, { Component } from 'react';
import './page-not-found.css';

export default class PageNotFound extends Component {
    render() {
        return (
            <div className="center not-found-container">
                <i className="fa-solid fa-map-signs not-found-img" />
                <h1>Page not found</h1>
                <p>Oops! Check the URL in your browser or <a href="/">go home</a>.</p>
            </div>
        )
    }
}
