import React, { Component } from 'react';
import './sidebar.css';
import { If, Then, Else } from 'react-if';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';

class SidebarLink {
    constructor(englishText, spanishText, englishHref, spanishHref) {
        this.englishText = englishText;
        this.spanishText = spanishText;
        this.englishHref = englishHref;
        this.spanishHref = spanishHref;
    }
}

class Sidebar extends Component {
    
    constructor(props) {
        super(props)
        let navLinks = [
            new SidebarLink('Home', 'Inicio', '/', '/es'),
            new SidebarLink('Resume', 'Resumen', '/resume', '/resume/es'),
            new SidebarLink('Biography', 'Biografía', '/biography', '/biography/es'),
            new SidebarLink('Software', 'Software', '/software', '/software/es'),
            new SidebarLink('Music', 'Música', '/music', '/music/es'),
            // new SidebarLink('Photos', 'Fotos', '/photography', '/photography/es'),
            new SidebarLink('Contact', 'Contáctame', '/contact', '/contact/es')
        ];
        this.state = {
            navLinks: navLinks
        };
    }

    getLinkFor(linkData) {
        // if current lang is spanish
        if (this.props.lang === 'es') {
            return linkData.spanishHref;
        }
        return linkData.englishHref;
    }

    /* Returns true if the navigation link to the sidebar item `linkData` is a 
    link to the current page and so should be highlighted. */
    isActiveNavLink(linkData) {
        let currURL = this.props.location.pathname; // current URL path
        return (this.props.lang === 'en' && currURL === linkData.englishHref) ||
            (this.props.lang === 'es' && currURL === linkData.spanishHref);
    }
    
    render() {
        return (
            <ul id="sidebar-links">
                {this.state.navLinks.map((linkData, index) => 
                    <li className="sidebar-link" key={ linkData.englishHref }>
                        <Link to={ this.getLinkFor(linkData) }
                            onClick={ this.props.closeBurgerMenu }
                            className={ this.isActiveNavLink(linkData) ? 'active-nav-link':'' }>
                            <If condition={this.props.lang === 'es'}>
                                <Then>
                                    { linkData.spanishText }
                                </Then>
                                <Else>
                                    { linkData.englishText }
                                </Else>
                            </If>
                        </Link>
                    </li>
                )}
            </ul>
        );
    }
}

const SidebarWithRouter = withRouter(Sidebar);
export default SidebarWithRouter;
