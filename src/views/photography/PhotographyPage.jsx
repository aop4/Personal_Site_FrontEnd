import React, { Component } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../constants';
import LoadingScreen from '../loading-screen/LoadingScreen';
import PhotoAlbum from './PhotoAlbum';

import './photography-page.scss';
import { Trans } from 'react-i18next';

// Flickr image size documentation: https://www.flickr.com/services/api/misc.urls.html
const PHOTO_SIZES = Object.freeze({
    '3k': 3072,
    'k': 2048,
    'h': 1600,
    'b': 1024
});

export default class PhotographyPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            albums: [],
            didLoadPhotos: false,
            currPhotoIndex: 0
        }
        this.loadingScreen = React.createRef();
    }

    componentDidMount() {
        this.retrievePhotos();
    }
    
    /**
     * Retrieve photos from the back end. It's actually a layer between the
     * front end and the Flickr API (I don't want the API key and secret
     * to be visible in an outgoing client request).
     */
    retrievePhotos() {
        this.loadingScreen.current.onLoadingStarted();
        axios.get(BASE_URL + '/photos')
        .then((resp) => {
            this.loadingScreen.current.onLoadingSucceeded();
            this.setState({
                albums: resp.data,
                didLoadPhotos: true
            });
            this.setPhotoUrls();
        }, (err) => {
            this.loadingScreen.current.onLoadingFailed();
        });
    }

    setPhotoUrls() {
        let albums = this.state.albums;
        albums.forEach((album) => {
            album.photo.forEach((photo) => {
                photo.url = this.getPhotoUrl(photo);
            });
        })
        this.setState({
            albums: albums
        });
    }

    getPhotoUrl(photo) {
        let screenSize = Math.max(window.screen.availWidth, window.screen.availHeight);
        // Note that the Flickr URL for a given image size won't be returned when a photo's max resolution is well below that image size.
        // So we can't choose the same size for every photo.
        if (screenSize > PHOTO_SIZES['3k'] && photo.url_4k) {
            return photo.url_4k;
        } else if (screenSize > PHOTO_SIZES['k'] && photo.url_3k) {
            return photo.url_3k;
        } else if (screenSize > PHOTO_SIZES['h'] && photo.url_k) {
            return photo.url_k;
        } else if (screenSize > PHOTO_SIZES['b'] && photo.url_h) {
            return photo.url_h;
        } else {
            // legacy url format - works only for size 'b' and below
            return `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
        }
    }

    render() {
        return (
            <div className="photos-page">
                <LoadingScreen ref={ this.loadingScreen }>
                </LoadingScreen>
                { this.state.albums.map((album) =>
                    <PhotoAlbum album={album}
                                key={album.id}>
                    </PhotoAlbum>
                )}
                <p className="center">
                    <Trans i18nKey="photos.flickr.intro"/>
                    <a href="https://www.flickr.com/photos/rusty_giraffe/">Flickr</a>.
                </p>
            </div>
        );
    }
}
