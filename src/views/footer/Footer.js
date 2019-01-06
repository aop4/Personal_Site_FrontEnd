import React, { Component } from 'react';
import './footer.css';

export default class Footer extends Component {
    render() {
        return (
            <div className="center footer">
                <a href="https://github.com/aop4">GitHub</a> • 
                <a href="https://www.linkedin.com/in/andrew-puglionesi/"> LinkedIn</a> • 
                <a href="https://stringsofcharacters.wordpress.com/"> WordPress blog</a> • 
                <a href="https://www.youtube.com/channel/UCbTleumNUKaZeGD8OdSlVqA"> YouTube</a> •
                <a href="https://www.google.com/search?q=Andrew+Puglionesi"
                    target="_blank"
                    rel="noopener noreferrer"> Google me
                </a>
                <p>Built from scratch with React, Ruby on Rails, and &lt;3.</p>
            </div>
        );
    }
}
