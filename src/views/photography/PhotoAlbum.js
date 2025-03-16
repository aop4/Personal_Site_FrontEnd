import { Component } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import './photo-album.scss';

export default class PhotoAlbum extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currPhotoIndex: 0,
            showLightbox: false
        }
    }

    showLightbox() {
        this.setState({
            showLightbox: true
        });
    }

    hideLightbox() {
        this.setState({
            showLightbox: false
        });
    }

    openPhoto(photoIndex) {
        this.setState({
            currPhotoIndex: photoIndex
        });
        this.showLightbox();
    }

    render() {
        return (
            <div>
                <h2 className="photo-album-title">{this.props.album.title}</h2>
                <div className="thumbnail-container">
                    { this.props.album.photo.map((photo, index) =>
                        <img src={photo.url}
                            className='img-thumbnail'
                            onClick={ () => this.openPhoto(index) }
                            alt={'Photo title: ' + photo.title}
                            key={photo.id}></img>
                    )}
                    <Lightbox open={ this.state.showLightbox }
                        close={ () => this.hideLightbox() }
                        slides={
                            this.props.album.photo.map(photo => ({'src': photo.url}))
                        }
                        index={this.state.currPhotoIndex}
                        animation={{ fade: 500, swipe: 500, easing: { fade: "ease", swipe: "ease-out", navigation: "ease-in-out" } }} />
                </div>
            </div>
        );
    }
}