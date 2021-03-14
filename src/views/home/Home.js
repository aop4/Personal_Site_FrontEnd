import React, { Component } from 'react';
import News from '../news/News'
import './home.css';
import { If, Then, Else } from 'react-if';

export default class Home extends Component {
    render() {
        return (
            <div className="text-container">
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
                                ¡Hola! Soy un ingeniero de software que vive en Pittsburgh, Pennsylvania. También disfruto escribir prosa y música, y este sitio refleja un poco de todo.
                            </Then>
                            <Else>
                                Hi there! I am a software engineer based in Pittsburgh, Pennsylvania. My hobbies include writing prose and music, and this website reflects a bit of everything.
                            </Else>
                        </If>
                    </p>
                    <p className="big-p">
                        <If condition={ this.props.lang === 'es' }>
                            <Then>
                                En cuanto a mi carrera de ingeniería, me considero un generalista: he trabajado en el front-end y el back-end de sistemas diferentes, y tengo experiencia con una variedad de lenguas y entornos de trabajo. Me apasiona aprender cosas nuevas, y estoy un poco obsesionado con escribir código legible. Mira a la página de <a href="/software">Software</a>.
                            </Then>
                            <Else>
                                Regarding my engineering work, I consider myself a generalist, with experience at both ends in a variety of languages and frameworks. I am passionate about learning new things and kind of obsessed with writing maintainable code. Check out the <a href="/software">Software</a> page for some of my thoughts on the craft.
                            </Else>
                        </If>
                    </p>
                    <p className="big-p">
                        <If condition={ this.props.lang === 'es' }>
                            <Then>
                                Este sitio es un documento vivo. Existe para mostrar todo mi trabajo en un lugar, organizar ese trabajo, y desarrollar junto conmigo.
                            </Then>
                            <Else>
                                This site itself is very much a living document. It's here to tie all my work together, organize it, and develop alongside me. Go ahead and explore!
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