import React, { Component } from 'react';
import Header from '../header/Header';
import './base.css';
import SidebarWithRouter from '../sidebar/Sidebar';
import {withRouter} from 'react-router-dom';

class BaseComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lang: "en"
        };
        // if the page is in Spanish ('/es' is at end of URL as a parameter)
        if (this.props.match.params.lang === 'es') {
            this.state.lang = "es";
        }
    }

    componentDidMount() {
        this.setTitle();
    }

    componentDidUpdate(prevProps) {
        // Change the document title when switching between pages
        if (prevProps.title !== this.props.title) {
            this.setTitle();
        }
    }

    setTitle() {
        document.title = (this.props.title ? this.props.title : 'Andrew Puglionesi');
    }

    /* Used to update the language when the content component is not changed
    but the URL language parameter is changed (e.g. from '/' to '/es') */
    changeLanguage() {
        let newLanguage = this.state.lang === 'en' ? 'es' : 'en';
        this.setState({
            lang: newLanguage
        });
    }
    
    render() {
        return (
            <div>
                <div className="main-container">
                    <Header lang={ this.state.lang }
                        changeLanguage={ this.changeLanguage.bind(this) }/>
                    <div className="flex-container">
                        <nav className="sidebar">
                            <SidebarWithRouter lang={ this.state.lang } />
                        </nav>
                        <div className="content">
                            {/* component passed in as main content */ }
                            {React.cloneElement(this.props.content, {lang: this.state.lang}) }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const Base = withRouter(BaseComponent);
export default Base;
