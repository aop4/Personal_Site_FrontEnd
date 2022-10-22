import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { If, Then } from 'react-if';
import Zoom from 'react-reveal/Zoom';
import { BIOGRAPHY_ENTRIES } from './BiographyEntries';
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
                                <Zoom bottom cascade>
                                    <div className="bio-entry-separator">
                                        <FontAwesomeIcon icon="ellipsis-v" />
                                        <FontAwesomeIcon icon="ellipsis-v" />
                                        <FontAwesomeIcon icon="ellipsis-v" />
                                    </div>
                                </Zoom>
                            </Then>
                        </If>
                        <Zoom bottom>
                            <FontAwesomeIcon icon={entry.icon}
                                className="biography-entry-icon"
                                style={{ color: entry.iconColor }} />
                            <h1 className="biography-entry-year">{ entry.year }</h1>
                            {entry.paragraphs.map((paragraph, index) => 
                                <p className="biography-entry-text" key={index}>{ paragraph }</p>
                            )}
                        </Zoom>
                    </div>
                )}
            </div>
        );
    }
}
