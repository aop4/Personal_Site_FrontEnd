import React, { Component } from 'react';
import './news.css';
import axios from 'axios';
import dateFormat from 'dateformat';
import parse from 'html-react-parser';
import { BASE_URL } from '../../constants';
import LoadingScreen from '../loading-screen/LoadingScreen';
import { If, Then, Else } from 'react-if';
import PageNumberList from '../pagination/PageNumberList';

export default class News extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newsItems: [],
            currentPage: 1,
            numPages: 1
        };
        this.loadingScreen = React.createRef();
        this.pageNumberList = React.createRef();
    }

    componentDidMount() {
        this.retrieveNewsItems(1);
    }
    
    retrieveNewsItems(pageNum) {
        this.loadingScreen.current.onLoadingStarted();
        axios.get(BASE_URL + '/news_items/?pageNum=' + pageNum)
        .then((resp) => {
            this.loadingScreen.current.onLoadingSucceeded();
            let newsItems = resp.data.data;
            this.addDates(newsItems);
            this.setState({ 
                newsItems: newsItems,
                currentPage: resp.data.currPage,
                numPages: resp.data.numPages
            });
            this.pageNumberList.current.refreshPageNumbers();
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

    render() {
        return (
            <div>
                <LoadingScreen ref={ this.loadingScreen } />
                {this.state.newsItems.map((item) => 
                    <p key={ item.id }>
                        <span className="date-string">
                            { this.props.lang === 'es' ? item.spanishDateString : item.dateString} •&nbsp;
                        </span>
                        <If condition={ this.props.lang === 'es' && item.spanish_text }>
                            <Then>
                                { parse(item.spanish_text || '') }
                            </Then>
                            <Else>
                                { parse(item.text || '') }
                            </Else>
                        </If>
                    </p>
                )}
                <PageNumberList numPages={ this.state.numPages }
                    currentPage={ this.state.currentPage }
                    ref={ this.pageNumberList }
                    switchToPage={ (pageNum) => this.retrieveNewsItems(pageNum) } />
            </div>
        );
    }
}
