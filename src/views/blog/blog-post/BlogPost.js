import React, { Component } from "react";
import { BASE_URL } from "../../../constants";
import axios from "axios";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import Markdown from 'markdown-to-jsx'
import dateFormat from 'dateformat';
import LoadingScreen from "../../loading-screen/LoadingScreen";

import './blog-post.css'
import { Else, If, Then } from "react-if";
import PageNotFound from "../../page-not-found/PageNotFound";

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
        }, (err) => {
            // If the post wasn't found, make the loading indicator disappear and display the "Not Found" page.
            this.loadingScreen.current.onLoadingSucceeded();
            this.setState({
                failedToLoad: true
            });
        });
    }

    render() {
        return (
            <div>
                <LoadingScreen ref={ this.loadingScreen } />

                <If condition={this.state.failedToLoad}>
                    <Then>
                        <PageNotFound/>
                    </Then>
                    <Else>
                        <a className="blog-link" href="/blog/all"><i class="fa-regular fa-circle-left"></i> Back to blog</a>
                        <div class="text-container">
                            <h1>{this.state.blogPost.title}</h1>
                            <Markdown>{this.state.blogPost.body_markdown}</Markdown>
                            <p className="post-publish-date">Published: {dateFormat(this.state.blogPost.created_at, 'mmmm d, yyyy')}</p>
                            <p className="post-publish-date">Updated: {dateFormat(this.state.blogPost.updated_at, 'mmmm d, yyyy')}</p>
                        </div>
                    </Else>
                </If>
                <div className="center">
                    <a className="blog-link" href="/blog/all"><i class="fa-regular fa-circle-left"></i> Back to blog</a>
                </div>
            </div>
        )
    }

}

export default withRouter(BlogPost);