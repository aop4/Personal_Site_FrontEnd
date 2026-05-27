import { Component } from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import { Trans } from 'react-i18next';
import i18n from '../../i18n';

class SidebarLink {
    constructor(displayTextKey, basePath, matchingPaths) {
        this.displayTextKey = displayTextKey;
        this.basePath = basePath;
        this.matchingPaths = matchingPaths;
    }
}

class Sidebar extends Component {
    
    constructor(props) {
        super(props)
        let navLinks = [
            new SidebarLink('sidebar.home', '', /^\/[a-z]{0,2}$/),
            new SidebarLink('sidebar.resume', '/resume', /^\/resume/),
            new SidebarLink('sidebar.bio', '/biography', /^\/biography/),
            new SidebarLink('sidebar.blog', '/blog/all', /^\/blog/),
            new SidebarLink('sidebar.photos', '/photography', /^\/photography/),
            // new SidebarLink('sidebar.music', '/music', /^\/music/),
            new SidebarLink('sidebar.contact', '/contact', /^\/contact/)
        ];
        this.state = {
            navLinks: navLinks
        };
    }

    getLinkFor(sidebarLink) {
        if (i18n.language === 'en') {
            return sidebarLink.basePath;
        } else {
            return `${sidebarLink.basePath}/${i18n.language}`;
        }
    }

    /* Returns true if the navigation link to the sidebar item `sidebarLink` is a 
    link to the current page and so should be highlighted. */
    isActiveNavLink(sidebarLink) {
        let currURL = this.props.location.pathname; // current URL path
        return sidebarLink.matchingPaths.test(currURL);
    }
    
    render() {
        return (
            <ul id="sidebar-links">
                {this.state.navLinks.map(sidebarLink => 
                    <li className="sidebar-link" key={ sidebarLink.basePath }>
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
