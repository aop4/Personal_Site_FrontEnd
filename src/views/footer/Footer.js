import React, { Component } from 'react';
import { If, Then, Else } from 'react-if';
import './footer.css';

export default class Footer extends Component {
    render() {
        return (
            <footer className="center footer">
                <a href="https://github.com/aop4">GitHub</a> • 
                <a href="https://www.linkedin.com/in/andrew-puglionesi/"> LinkedIn</a> • 
                <a href="https://www.google.com/search?q=Andrew+Puglionesi"
                    target="_blank"
                    rel="noopener noreferrer"> Google me
                </a> •
                <a href="https://www.youtube.com/channel/UCbTleumNUKaZeGD8OdSlVqA"> YouTube</a> •
                <a href="https://www.flickr.com/photos/rusty_giraffe"> Flickr</a>

                <p>
                    <If condition={ this.props.lang === 'es' }>
                        <Then>
                            Creado de cero con React, Ruby on Rails, y &lt;3.
                        </Then>
                        <Else>
                            Built from scratch with React, Ruby on Rails, and &lt;3.
                        </Else>
                    </If>
                </p>
            </footer>
        );
    }
}
