import React, { Component } from 'react';
import './news.css';
import axios from 'axios';
import dateFormat from 'dateformat';
import renderHTML from 'react-render-html';
import { BASE_URL } from '../../constants';
import LoadingScreen from '../loading-screen/LoadingScreen';
import { If, Then, Else } from 'react-if';

export default class News extends Component {
    
    retrieveNewsItems() {
        this.loadingScreen.current.onLoadingStarted();
        axios.get(BASE_URL + '/news_items')
        .then((resp) => {
            this.loadingScreen.current.onLoadingSucceeded();
            let newsItems = resp.data;
            this.addDates(newsItems);
            this.setState({ newsItems: newsItems });
        }, (err) => {
            this.loadingScreen.current.onLoadingFailed();
        });
    }

    addDates(newsItems) {
        newsItems.forEach((item) => {
            let date = new Date(item.item_date);
            // convert date to UTC (prevents date from being off by 1)
            // (getTimezoneOffset is in minutes, but we're adding msec,
            // hence the multiplier)
            date = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
            // store date in a human-readable format
            item.spanishDateString = dateFormat(date, 'd/m/yy');
            item.dateString = dateFormat(date, 'mmmm d, yyyy');
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            newsItems: []
        };
        this.loadingScreen = React.createRef();
    }

    componentDidMount() {
        this.retrieveNewsItems();
    }

    render() {
        return (
            <div>
                <LoadingScreen ref={ this.loadingScreen } />
                {this.state.newsItems.map((item) => 
                    <p key={ item.id }>
                        <span className="date-string">
                            { this.props.lang === 'es' ? item.spanishDateString : item.dateString} •&nbsp;
                        </span>
                        <If condition={ this.props.lang === 'es' && item.spanish_text.length > 0 }>
                            <Then>
                                { renderHTML(item.spanish_text) }
                            </Then>
                            <Else>
                                { renderHTML(item.text) }
                            </Else>
                        </If>
                    </p>
                )}
            </div>
        );
    }
}
