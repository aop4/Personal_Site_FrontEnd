import axios from 'axios';
import React, { Component } from 'react';
import { BASE_URL } from '../../../constants';
import dateFormat from 'dateformat';

import './blog-main-page.css';
import LoadingScreen from '../../loading-screen/LoadingScreen';
import { If } from 'react-if';

export default class BlogMainPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            blogPosts: []
        };
        this.loadingScreen = React.createRef();
    }

    componentDidMount() {
        this.retrieveBlogPosts();
    }

    retrieveBlogPosts() {
        this.loadingScreen.current.onLoadingStarted();
        axios.get(`${BASE_URL}/blog_posts`).then((resp) => {
            this.loadingScreen.current.onLoadingSucceeded();
            this.setState({
                blogPosts: resp.data
            });
        }, (err) => {
            this.loadingScreen.current.onLoadingFailed();
        });
    }

    render() {
        return (
            <div className="blog-container">
                <LoadingScreen ref={ this.loadingScreen } />
                {this.state.blogPosts.map((category) => 
                    <div key={ category.id }>
                        <h1 className="category-title">{category.name}</h1>
                        <div className="blog-category-container">
                            {category.blog_posts.filter(post => !post.is_draft).map((post) =>
                                <div key={post.id} className="blog-card">
                                    <h2 className="post-title">
                                        <a href={`/blog/${post.path}`}>{post.title}</a>
                                    </h2>
                                    <div>
                                        <If condition={post.pinned}>
                                            <i className="fa-solid fa-thumbtack pinned-post-icon"></i>
                                        </If>
                                        <p className="post-date">{dateFormat(post.created_at, 'mmmm d, yyyy')}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}