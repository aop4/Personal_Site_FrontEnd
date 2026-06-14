import React, { Component } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../constants';
import LoadingScreen from '../loading-screen/LoadingScreen';
import PhotoAlbum from './PhotoAlbum';

import './photography-page.scss';
import { Trans } from 'react-i18next';

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

    /**
     * Retrieves a URL for the provided photo object. Chooses lower resolutions for smaller screens, but prioritizes
     * image quality and the aesthetic benefits of anti-aliasing.
     * See Flickr documentation to understand image size names: https://www.flickr.com/services/api/misc.urls.html.
     * Note that the URL for a given image size won't be returned by Flickr when the photo's max resolution is well below that image size.
     */
    getPhotoUrl(photo) {
        // the secret value included in photo object works only for size 'b' and below
        let legacyUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;

        if (this.isHighDefMonitor()) {
            return this.firstPopulatedUrl([photo.url_4k, photo.url_3k, photo.url_k, photo.url_h, legacyUrl]);
        } else {
            return this.firstPopulatedUrl([photo.url_k, photo.url_h, legacyUrl]);
        }
    }

    isHighDefMonitor() {
        return window.screen.width >= 1920;
    }

    firstPopulatedUrl(urls) {
        return urls.find(url => url?.length > 0);
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
