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
            new SidebarLink('Bio', 'Biografía', '/biography', '/biography/es'),
            new SidebarLink('Blog', 'Blog', '/blog/all', '/blog/all/es'),
            new SidebarLink('Photos', 'Fotos', '/photography', '/photography/es'),
            new SidebarLink('Music', 'Música', '/music', '/music/es'),
            new SidebarLink('Contact', 'Contáctame', '/contact', '/contact/es')
        ];
        this.state = {
            navLinks: navLinks
        };
    }

    getLinkFor(sidebarLink) {
        // if current lang is spanish
        if (this.props.lang === 'es') {
            return sidebarLink.spanishHref;
        }
        return sidebarLink.englishHref;
    }

    /* Returns true if the navigation link to the sidebar item `sidebarLink` is a 
    link to the current page and so should be highlighted. */
    isActiveNavLink(sidebarLink) {
        let currURL = this.props.location.pathname; // current URL path
        if (sidebarLink.englishText === 'Blog') {
            return currURL.startsWith('/blog/');
        } else {
            return currURL === sidebarLink.englishHref || currURL === sidebarLink.spanishHref;
        }
    }
    
    render() {
        return (
            <ul id="sidebar-links">
                {this.state.navLinks.map(sidebarLink => 
                    <li className="sidebar-link" key={ sidebarLink.englishHref }>
                        <Link to={ this.getLinkFor(sidebarLink) }
                            onClick={ this.props.closeBurgerMenu }
                            className={ this.isActiveNavLink(sidebarLink) ? 'active-nav-link':'' }>
                            <If condition={this.props.lang === 'es'}>
                                <Then>
                                    { sidebarLink.spanishText }
                                </Then>
                                <Else>
                                    { sidebarLink.englishText }
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
