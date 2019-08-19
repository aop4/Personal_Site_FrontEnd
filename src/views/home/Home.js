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
                        alt="" />
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
                        { this.props.lang === 'es' ? 'Sobre Mí' : 'About Me' }
                    </h2>
                    <p className="big-p">
                        <If condition={ this.props.lang === 'es' }>
                            <Then>
                                ¡Hola! Este sitio se propone reflejar todos que hago—y nunca me contento con hacer solo una cosa. Soy un un ingeniero de software, pero también soy un escritor, músico, y ecologista.
                            </Then>
                            <Else>
                                Hi there! This website is meant to reflect everything I do—and I was never content to do just one thing. I am a software engineer, but I am also a writer, musician, and environmental advocate based in Pittsburgh.
                            </Else>
                        </If>
                    </p>
                    <p className="big-p">
                        <If condition={ this.props.lang === 'es' }>
                            <Then>
                                En cuanto a mi carrera de ingeniería, me considero un generalista: he trabajado en el front-end y el back-end de sistemas diferentes, y tengo experiencia con una variedad de lenguas y entornos de trabajo. Me apasiona aprender cosas nuevas, y estoy un poco obsesionado con escribir código legible.
                            </Then>
                            <Else>
                                Regarding my engineering career, I consider myself a generalist, with experience at both ends in a variety of languages and frameworks. I am passionate about learning new things and kind of obsessed with writing readable code.
                            </Else>
                        </If>
                    </p>
                    <p className="big-p">
                        <If condition={ this.props.lang === 'es' }>
                            <Then>
                                Este sitio es un documento vivo. Existe para mostrar todo mi trabajo en un lugar, organizar ese trabajo, y desarrollar junto conmigo.
                            </Then>
                            <Else>
                                This site is very much a living document. It's here to tie all my work together, organize it, and develop alongside me. Go explore.
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