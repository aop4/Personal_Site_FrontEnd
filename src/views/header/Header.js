import React, { Component } from 'react';
import { scaleDown as Menu } from 'react-burger-menu';
import './header.css';
import Sidebar from '../sidebar/Sidebar';

export default class Base extends Component {

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
    
    render() {
        return (    
            <div id="header" className="header">
                <Menu id="burger-menu"
                    onStateChange={ (menuState) => this.hideOrShowMenu(menuState) }
                    menuClassName={ this.state.menuOpen ? 'bm-menu':'hidden' }
                    crossButtonClassName={ this.state.menuOpen ? 'bm-cross-button':'hidden' }>
                    <Sidebar />
                </Menu>
                <button className="lang-toggle" onClick={ this.props.changeLanguage }>
                    { this.props.otherLang }
                </button>
            </div>
        );
    }
}
