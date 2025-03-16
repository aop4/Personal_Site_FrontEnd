import React, { Component } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../constants';
import LoadingScreen from '../loading-screen/LoadingScreen';
import PhotoAlbum from './PhotoAlbum';

import './photography-page.scss';

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

    /**
     * Pre-compute URLs for photos on Flickr. (Flickr API responses do not contain
     * full URLs).
     */
    setPhotoUrls() {
        let albums = this.state.albums;
        albums.forEach((album) => {
            album.photo.forEach((photo) => {
                // URL structure and image size details: https://www.flickr.com/services/api/misc.urls.html
                let url = `http://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
                photo.url = url;
            });
        })
        this.setState({
            albums: albums,
            showLightbox: false
        });
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
                    { this.props.lang === 'es' ? 'Mira más fotos mías en ' : 'Check out more of my photos on ' }
                    <a href="https://www.flickr.com/photos/rusty_giraffe/">Flickr</a>.
                </p>
            </div>
        );
    }
}
