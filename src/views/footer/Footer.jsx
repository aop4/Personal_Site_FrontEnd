import { Component } from 'react';
import './footer.css';
import { Trans } from 'react-i18next';

export default class Footer extends Component {
    render() {
        return (
            <footer className="center footer">
                <a href="https://github.com/aop4">GitHub</a> • 
                <a href="https://www.linkedin.com/in/andrew-puglionesi/"> LinkedIn</a> • 
                <a href="https://www.google.com/search?q=Andrew+Puglionesi"
                    target="_blank"
                    rel="noopener noreferrer"> Google me
                </a>

                <p>
                    <Trans i18nKey="footer.text"/>
                </p>
            </footer>
        );
    }
}
