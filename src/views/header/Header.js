import React, { Component } from 'react';
import { scaleDown as Menu } from 'react-burger-menu';
import './header.css';
import Sidebar from '../sidebar/Sidebar';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';

class BaseComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false
        }
    }
    
    hideOrShowMenu(menuState) {
        /* if the menu was closed, hide it reliably (see menuClassName reference
        below; the class 'hidden' hides menu) */
        if (! menuState.isOpen) {
            this.setState({menuOpen: false});
        }
        // if the menu was opened, show it
        else {
            this.setState({menuOpen: true});
        }
    }

    /* Returns a link to the current page in a different language.  */
    changeLanguageLink() {
        let url = this.props.location.pathname; // current URL path
        // if we're in Spanish (URL ends in /es), cut off the /es to return link
        // to English page
        if (this.props.match.params.lang === 'es') {
            return url.slice(0, -3);
        }
        // otherwise return a link to the Spanish version of current page
        else if (url === '/') {
            return '/es'; // don't append a '/' to the path '/'
        }
        return url + '/es'; // append a slash to any other path
    }
    
    render() {
        return (    
            <div id="header" className="header">
                <Menu id="burger-menu"
                    onStateChange={ (menuState) => this.hideOrShowMenu(menuState) }
                    menuClassName={ this.state.menuOpen ? 'bm-menu':'hidden' }
                    crossButtonClassName={ this.state.menuOpen ? 'bm-cross-button':'hidden' }>
                    <Sidebar lang={ this.props.lang } />
                </Menu>
                <Link className="lang-toggle" 
                    to={ this.changeLanguageLink() }
                    onClick={ this.props.changeLanguage }>
                    { this.props.otherLang === 'es' ? 'Español' : 'English' }
                </Link>
            </div>
        );
    }
}


const Base = BaseComponent;
export default withRouter(Base);
