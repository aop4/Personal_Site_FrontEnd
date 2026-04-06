import { Component } from 'react';
import News from '../news/News'
import './home.css';
import { Trans } from 'react-i18next';

export default class Home extends Component {
    render() {
        return (
            <div className="text-container">
                <div className="img-container">
                    <img className="face" 
                        src="images/portrait.jpg"
                        alt="Portrait" />
                    <div className="inline-block">
                        <div className="name">
                            <h1 className="name">Andrew Puglionesi</h1>
                            {/* <img className="arrow"
                                src="images/arrow.png"
                                alt="" /> */}
                        </div>
                    </div>
                </div>
                <div className="info-container">
                    <h2 className="small-header">
                        <Trans i18nKey="about.me.title"></Trans>
                    </h2>
                    <p className="big-p">
                        <Trans i18nKey="about.me.part.1"></Trans>
                    </p>
                    <p className="big-p">
                        <Trans i18nKey="about.me.part.2" components={{ a: <a/> }}/>
                    </p>
                    <p className="big-p">
                        <Trans i18nKey="about.me.part.3"></Trans>
                    </p>
                    <br />
                    <h2 className="small-header">
                        <Trans i18nKey="news.title"></Trans>
                    </h2>
                    <News lang={ this.props.lang }></News>
                </div>
            </div>
        );
    }
}