import React, { Component } from 'react';

export default class Resume extends Component {
    
    /* This looks too creative, but I don't even know how long I spent trying
    to do something normal. Resizes the PDF iframe so its height actually matches
    the PDF inside of it. I can think of some new features for HTML6... */
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
                    src='/AndrewPuglionesiResume.pdf' />
            </div>
        );
    }
}
