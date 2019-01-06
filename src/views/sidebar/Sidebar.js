import React, { Component } from 'react';
import './sidebar.css';
import { If, Then, Else } from 'react-if';
import { Link } from 'react-router-dom';

export default class Sidebar extends Component {
    render() {
        return (
            <ul>
                <li>
                    <Link to='/'>
                        <If condition={this.props.lang === 'Español'}>
                            <Then>
                                Home
                            </Then>
                            <Else>
                                Home
                            </Else>
                        </If>
                    </Link>
                </li>
                <li>
                    <Link to='/resume'>
                        <If condition={this.props.lang === 'Español'}>
                            <Then>
                                Resumen
                            </Then>
                            <Else>
                                Resume
                            </Else>
                        </If>
                    </Link>
                </li>
                <li>
                    <Link to='/music'>
                        <If condition={this.props.lang === 'Español'}>
                            <Then>
                                Música
                            </Then>
                            <Else>
                                Music
                            </Else>
                        </If>
                    </Link>
                </li>
                <li>
                    <Link to='/contact'>
                        <If condition={this.props.lang === 'Español'}>
                            <Then>
                                Contáctame
                            </Then>
                            <Else>
                                Contact
                            </Else>
                        </If>
                    </Link>
                </li>
            </ul>
        );
    }
}