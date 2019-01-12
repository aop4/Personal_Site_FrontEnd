import React, { Component } from 'react';
import News from '../news/News'
import './home.css';
import { Link } from 'react-router-dom';
import { If, Then, Else } from 'react-if';

export default class Home extends Component {
    render() {
        return (
            <div className="home-container">
                <div className="img-container">
                    <img className="face" 
                        src="images/portrait.jpg"
                        alt=""></img>
                    <div className="inline-block">
                        <div className="name">
                            <h1 className="name">Andrew Puglionesi</h1>
                        </div>
                    </div>
                </div>
                <div className="info-container">
                    <h2 className="small-header">
                        { this.props.lang === 'es' ? 'Sobre Mí' : 'About Me' }
                    </h2>
                    <p className="big-p">
                        <If condition={ this.props.lang === 'es' }>
                            <Then>
                            ¡Hola! Soy un ingeniero de software quien vive en Pittsburgh, Pennsylvania. Me considero un generalista: he trabajado en el front-end y el back-end de sistemas diferentes, y tengo experiencia con una variedad de lenguas y entornos de trabajo. Me apasiona aprender cosas nuevas, y estoy un poco obsesionado con escribir código legible.
                            </Then>
                            <Else>
                                Hi there! I’m a software engineer based in Pittsburgh, Pennsylvania. I consider myself a generalist, with experience at both ends in a variety of languages and frameworks. I am passionate about learning new things and kind of obsessed with writing readable code.
                            </Else>
                        </If>
                    </p>
                    <p className="big-p">
                        <If condition={ this.props.lang === 'es' }>
                            <Then>
                                Puede contactarme si quiere crear un sitio web, una aplicación móvil, o algún otro proyecto técnico pero no sabe por dónde empezar. Me encantaría dar consejos y potencialmente trabajar con ud. en un proyecto pequeño, especialmente si no tiene muchos recursos y hace trabajo interesante.
                            </Then>
                            <Else>
                                Feel free to reach out if you want to build a website, mobile app, or anything software-related but don’t know where to start. I'd love to offer input and potentially help with smaller projects, especially if you’re low on resources and doing cool work.
                            </Else>
                        </If>
                    </p>
                    <p className="big-p">
                        <If condition={ this.props.lang === 'es' }>
                            <Then>
                                También toco <Link to="/music/es">música</Link> para divertirme.
                            </Then>
                            <Else>
                                I also make <Link to="/music">music</Link> for kicks.
                            </Else>
                        </If>
                    </p>
                    <br />
                    <h2 className="small-header">
                        { this.props.lang === 'es' ? 'Noticias' : 'News' }
                    </h2>
                    <News lang={ this.props.lang }></News>
                </div>
            </div>
        );
    }
}