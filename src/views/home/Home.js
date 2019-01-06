import React, { Component } from 'react';
import News from '../news/News'
import './home.css';
import { Link } from 'react-router-dom'

export default class Home extends Component {
    render() {
        return (
            <div className="home-container">
                <div className="img-container">
                    <img className="face" 
                        src="images/portrait.jpg"
                        alt=""></img>
                    <div className="inline-block">
                        <div className="name"><h1 class="name">Andrew Puglionesi</h1></div>
                    </div>
                </div>
                <div class="info-container">
                    <h2 className="small-header">About me</h2>
                    <p className="big-p">Hi there! I’m a software engineer based in Pittsburgh, Pennsylvania. I consider myself a generalist, with experience at both ends in a variety of languages and frameworks. I am passionate about learning new things and kind of obsessed with writing readable code.</p>
                    <p className="big-p">Feel free to reach out if you want to build a website, mobile app, or anything software-related but don’t know where to start. I'd love to offer input and potentially help with smaller projects, especially if you’re low on resources and doing cool work.</p>
                    <p className="big-p">I also make <Link to="/music">music</Link> for kicks.</p>
                    <br />
                    <h2 className="small-header">News</h2>
                    <News></News>
                </div>
            </div>
        );
    }
}