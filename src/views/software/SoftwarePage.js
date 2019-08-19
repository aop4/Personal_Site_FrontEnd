import React, { Component } from 'react';
import './software-page.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons'

export default class SoftwarePage extends Component {
    render() {
        return (
            <div className="software-container">
                <h1 className="software-phil-title">My Software Engineering Philosophy</h1>
                <ul className="software-phil-list">
                    <li>Aim for readability, modularity, correctness, and performance, in that order.</li>
                    <li>Languages and frameworks often don't matter much. You can quickly learn new ones and do the same things with them.</li>
                    <li>29 unit tests that never fail are worth it when the 30th test uncovers a bug. Write tests if time allows.</li>
                    <li>Functions should have a single identifiable purpose. More complex functions can call several others that each have a single purpose.</li>
                    <li>If a requirement doesn't make sense, then work to change it.</li>
                    <li>What you're building is just as important as how you build it.</li>
                </ul>
                <div>
                    <a href="https://github.com/aop4"
                        title="Follow the Octocat (GitHub)">
                        <FontAwesomeIcon icon={ faGithubSquare }
                            className="github-icon" />
                    </a>
                </div>
            </div>
        );
    }
}
