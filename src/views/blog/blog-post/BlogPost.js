import React, { Component } from "react";
import { BASE_URL } from "../../../constants";
import axios from "axios";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import Markdown from 'markdown-to-jsx'
import dateFormat from 'dateformat';
import LoadingScreen from "../../loading-screen/LoadingScreen";

import './blog-post.css'

class BlogPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            blogPost: {}
        }
        this.loadingScreen = React.createRef();
    }

    componentDidMount() {
        this.retrieveBlogPost();
    }

    retrieveBlogPost() {
        this.loadingScreen.current.onLoadingStarted();

        let postPath = this.props.match.params.path;
        axios.get(`${BASE_URL}/blog_posts/${postPath}`).then((resp) => {
            this.loadingScreen.current.onLoadingSucceeded();
            this.setState({
                blogPost: resp.data
            });
            if (this.state.blogPost.title) {
                document.title = this.state.blogPost.title;
            }
        }, err => {
            this.loadingScreen.current.onLoadingFailed();
        });
    }

    render() {
        return (
            <div>
                <LoadingScreen ref={ this.loadingScreen } />
                <a className="blog-link" href="/blog/all"><i class="fa-regular fa-circle-left"></i> Back to blog</a>
                <div class="text-container">
                    <h1>{this.state.blogPost.title}</h1>
                    <Markdown>{this.state.blogPost.body_markdown}</Markdown>
                    <p className="post-publish-date">Published: {dateFormat(this.state.blogPost.created_at, 'mmmm d, yyyy')}</p>
                    <p className="post-publish-date">Updated: {dateFormat(this.state.blogPost.updated_at, 'mmmm d, yyyy')}</p>
                    <a className="blog-link center" href="/blog/all"><i class="fa-regular fa-circle-left"></i> Back to blog</a>
                </div>
            </div>
        )
    }

}

export default withRouter(BlogPost);