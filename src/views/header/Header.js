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
            isBurgerMenuOpen: false
        }
    }
    
    toggleBurgerMenuVisible(menuState) {
        this.setState({isBurgerMenuOpen: menuState.isOpen});
    }

    closeBurgerMenu() {
        this.setState({isBurgerMenuOpen: false});
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
                    onStateChange={ (menuState) => this.toggleBurgerMenuVisible(menuState) }
                    isOpen={ this.state.isBurgerMenuOpen }
                    menuClassName='bm-menu'
                    crossButtonClassName='bm-cross-button'>
                    <Sidebar lang={ this.props.lang } closeBurgerMenu={ this.closeBurgerMenu.bind(this) } />
                </Menu>
                <Link className="lang-toggle" 
                    to={ this.changeLanguageLink() }
                    onClick={ this.props.changeLanguage }
                    title={ this.props.lang === 'es' ? 'Cambiar de lengua' : 'Change language' } >
                    { this.props.lang === 'en' ? 'Español' : 'English' }
                </Link>
            </div>
        );
    }
}


const Base = BaseComponent;
export default withRouter(Base);
