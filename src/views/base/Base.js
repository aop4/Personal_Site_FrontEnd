import React, { Component } from 'react';
import Header from '../header/Header';
import './base.css';
import SidebarWithRouter from '../sidebar/Sidebar';

export default class Base extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lang: "English",
            otherLang: "Español"
        };
    }
    
    /* Toggles the current language between "English" and "Spanish" */
    changeLanguage() {
        this.setState({
            lang: this.state.otherLang,
            otherLang: this.state.lang
        });
    }
    
    render() {
        return (
            <div>
                <div className="main-container">
                    <Header changeLanguage={ this.changeLanguage.bind(this) } 
                        lang={ this.state.lang }
                        otherLang={ this.state.otherLang }/>
                    <div className="flex-container">
                        <div className="sidebar">
                            <SidebarWithRouter lang={ this.state.lang } />
                        </div>
                        <div className="content">
                            { this.props.content } {/* shows component passed in */ }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
