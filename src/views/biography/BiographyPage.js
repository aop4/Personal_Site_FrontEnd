import React, { Component } from 'react';
import { If, Then } from 'react-if';
import { BIOGRAPHY_ENTRIES } from './BiographyEntries';
import { Fade } from 'react-awesome-reveal';

import './biography.css';

export default class BiographyPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            biographyEntries: BIOGRAPHY_ENTRIES
        };
    }

    render() {
        return (
            <div className="bio-container">
                {this.state.biographyEntries.map((entry, index) =>
                    <div className="biography-entry" key={index}>
                        <If condition={ index > 0 }>
                            <Then>
                                <Fade triggerOnce direction="up" duration={500}>
                                    <div className="bio-entry-separator">
                                        <i className="fa-solid fa-ellipsis-vertical bio-entry-dots"></i>
                                        <i className="fa-solid fa-ellipsis-vertical bio-entry-dots"></i>
                                        <i className="fa-solid fa-ellipsis-vertical bio-entry-dots"></i>
                                    </div>
                                </Fade>
                            </Then>
                        </If>
                        <Fade triggerOnce cascade direction="up" duration={500}>
                            <i className={'biography-entry-icon fa-solid ' + entry.icon}
                                style={{ color: entry.iconColor }}/>
                            <h1 className="biography-entry-year">{ entry.year }</h1>
                        </Fade>
                        <Fade triggerOnce duration={700}>
                            {entry.paragraphs.map((paragraph, index) => 
                                <p className="biography-entry-text" key={index}>{ paragraph }</p>
                            )}
                        </Fade>
                    </div>
                )}
            </div>
        );
    }
}
