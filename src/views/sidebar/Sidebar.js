import React, { Component } from 'react';
import './sidebar.css';
import { If, Then, Else } from 'react-if';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';

class SidebarLink {
    constructor(englishText, spanishText, href) {
        this.englishText = englishText;
        this.spanishText = spanishText;
        this.href = href;
    }
}

class Sidebar extends Component {
    
    constructor(props) {
        super(props)
        let navLinks = [
            new SidebarLink('Home', 'Home', '/'),
            new SidebarLink('Resume', 'Resumen', '/resume'),
            new SidebarLink('Music', 'Música', '/music'),
            new SidebarLink('Contact', 'Contáctame', '/contact')
        ];
        this.state = {
            navLinks: navLinks
        };
    }
    
    render() {
        return (
            <ul>
                {this.state.navLinks.map((linkData, index) => 
                    <li key={ linkData.href }>
                        <Link to={ linkData.href }
                            className={ this.props.location.pathname === linkData.href ? 'active-nav-link':'' }>
                            <If condition={this.props.lang === 'Español'}>
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
