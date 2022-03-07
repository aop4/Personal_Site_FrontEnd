import React, { Component } from 'react';
import './contact.css';
import axios from 'axios';
import { BASE_URL } from '../../constants';

export default class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
    }

    /* Sends a contact email after user hits 'Send.' Returns a promise for
    request. */
    sendEmail(name, fromEmail, text) {
        return axios.post(BASE_URL + '/send_email',
                {name: name, from_email: fromEmail, email_body: text});
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        let name = formData.get('name').trim();
        let emailAddress = formData.get('emailAddress').trim();
        let text = formData.get('comment');
        this.sendEmail(name, emailAddress, text)
        .then((res) => {
            this.setState({ message: "✔ Your message has been sent. It travels o'er the hills of Mordor." });
        }, (err) => {
            alert("Your message couldn't be sent. Try shooting an email to andrewpuglionesi@gmail.com");
        });
    }

    render() {
        return (
            <div className="contact-container">
                <h1>{ this.props.lang === 'es' ? 'Contáctame' : 'Contact me'}</h1>
                <form id="contact-form"
                    onSubmit={ (event) => this.handleSubmit(event) }>
                    <input required type="text" 
                        name="name"
                        placeholder={ this.props.lang === 'es' ? "  Su nombre" : "  Your name" }/>
                    <input required type="email" 
                        name="emailAddress"
                        placeholder={ this.props.lang === 'es' ? "  Su dirección de correo electrónico" : "  Your email address" } />
                    <textarea placeholder={ this.props.lang === 'es' ? " Escriba su mensaje aquí" : " Write your message here" }
                        name="comment"
                        rows="7" />
                    <p className="message">{ this.state.message }</p>
                    <button className="send-btn">
                        { this.props.lang === 'es' ? "  Enviar" : "  Send" }
                    </button>
                </form>
            </div>
        );
    }
}
