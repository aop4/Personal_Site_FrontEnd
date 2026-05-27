import { Component } from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import { Trans } from 'react-i18next';

class SidebarLink {
    constructor(displayTextKey, englishHref, spanishHref) {
        this.displayTextKey = displayTextKey;
        this.englishHref = englishHref;
        this.spanishHref = spanishHref;
    }
}

class Sidebar extends Component {
    
    constructor(props) {
        super(props)
        let navLinks = [
            new SidebarLink('sidebar.home', '/', '/es'),
            new SidebarLink('sidebar.resume', '/resume', '/resume/es'),
            new SidebarLink('sidebar.bio', '/biography', '/biography/es'),
            new SidebarLink('sidebar.blog', '/blog/all', '/blog/all/es'),
            new SidebarLink('sidebar.photos', '/photography', '/photography/es'),
            // new SidebarLink('sidebar.music', '/music', '/music/es'),
            new SidebarLink('sidebar.contact', '/contact', '/contact/es')
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
                            <Trans i18nKey={ sidebarLink.displayTextKey }/>
                        </Link>
                    </li>
                )}
            </ul>
        );
    }
}

const SidebarWithRouter = withRouter(Sidebar);
export default SidebarWithRouter;
