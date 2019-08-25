import React, { Component } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../constants';
import LoadingScreen from '../loading-screen/LoadingScreen';
import Lightbox from 'react-image-lightbox';

import 'react-image-lightbox/style.css';
import './photography-page.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class PhotographyPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            photos: [],
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
            let photos = resp.data.photo;
            this.setState({
                photos: photos,
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
        let photos = this.state.photos;
        photos.forEach((photo) => {
            // URL structure and image size details: https://www.flickr.com/services/api/misc.urls.html
            let url = `http://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
            photo.url = url;
        });
        this.setState({
            photos: photos,
            showLightbox: false
        });
    }

    showLightbox() {
        if (this.state.didLoadPhotos) {
            this.setState({
                showLightbox: true
            });
        }
    }

    hideLightbox() {
        this.setState({
            showLightbox: false
        });
    }

    showPrevPhoto() {
        let photoIndex = this.state.currPhotoIndex;
        let photos = this.state.photos;
        photoIndex = (photoIndex - 1 + photos.length) % photos.length;
        this.setState({
            currPhotoIndex: photoIndex
        });
    }

    showNextPhoto() {
        let photoIndex = this.state.currPhotoIndex;
        let photos = this.state.photos;
        photoIndex = (photoIndex + 1) % photos.length;
        this.setState({
            currPhotoIndex: photoIndex
        });
    }

    render() {
        return (
            <div className="photos-page">
                <h1>{ this.props.lang === 'es' ? 'Fotos' : 'Photos' }</h1>
                {/* in-page carousel */}
                <div className={ "photos-container " + (this.state.didLoadPhotos ? '' : 'hidden') } >
                    <LoadingScreen ref={ this.loadingScreen }>
                    </LoadingScreen>
                    <div className="carousel">
                        <FontAwesomeIcon icon="chevron-left"
                            className="photo-select-arrow"
                            onClick={ () => this.showPrevPhoto() } />
                        <div className="img-container">
                            <FontAwesomeIcon className={ "full-screen-icon cursor-pointer" + (this.state.didLoadPhotos ? '' : 'hidden') }
                                icon="expand-arrows-alt"
                                onClick={ () => this.showLightbox() } />
                            <img className="curr-photo"
                                src={ this.state.photos.length ? this.state.photos[this.state.currPhotoIndex].url : '' }
                                alt=''/>
                        </div>
                        <FontAwesomeIcon icon="chevron-right"
                            className="photo-select-arrow"
                            onClick={ () => this.showNextPhoto() } />
                    </div>
                </div>
                {/* full-page lightbox */}
                { this.state.showLightbox && 
                    <Lightbox onCloseRequest={ () => this.hideLightbox() }
                        mainSrc={ this.state.photos[this.state.currPhotoIndex].url }
                        // I would put function calls here, but React doesn't jive with them
                        nextSrc={ this.state.photos[ (this.state.currPhotoIndex + 1) % this.state.photos.length ].url }
                        prevSrc={ this.state.photos[ (this.state.currPhotoIndex - 1 + this.state.photos.length) % this.state.photos.length ].url }
                        onMovePrevRequest={ () => this.showPrevPhoto() }
                        onMoveNextRequest={ () => this.showNextPhoto() } />
                }
                <p className="center">
                    { this.props.lang === 'es' ? 'Mira más fotos mías en ' : 'Check out more of my photos on ' }
                    <a href="https://www.flickr.com/photos/rusty_giraffe/">Flickr</a>.
                </p>
            </div>
        );
    }
}
