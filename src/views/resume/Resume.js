import React, { Component } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../constants';

export default class Resume extends Component {
    
    /* Resizes the PDF iframe so its height matches the PDF inside of it. */
    resizeIframe(event) {
        const pdfHeightWidthRatio = 11 / 8.5; // height:width ratio for one-page pdf
        let iframe = event.target;
        let frameWidth = iframe.clientWidth; // width of iframe in HTML doc
        // scale the height of the iframe based on its computed width
        let frameHeight = frameWidth * pdfHeightWidthRatio;
        iframe.style.height = frameHeight + 'px';
    }
    
    render() {
        return (
            <div className="container">
                <iframe className="frame"
                    style={ {
                        minWidth: "90%", 
                        marginLeft: '20px',
                        height: '90vh'
                    } }
                    title="file"
                    src='/resume.pdf' />
            </div>
        );
    }

    /**
     * After the page loads, this sends a request to the base URL. (To conserve
     * resources, the back end sleeps when there's no traffic. This wakes it up
     * so that other pages will load quickly, because this may be a common
     * entrypoint to the site.)
     */
    componentDidMount() {
        axios.get(BASE_URL);
    }
}
