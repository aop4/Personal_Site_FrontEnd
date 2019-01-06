import React, { Component } from 'react';
import './contact.css';
import axios from 'axios';

export default class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
    }

    sendEmail(name, fromEmail, text) {
        return axios.post('https://andrewpuglionesi-api.herokuapp.com/send_email',
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
            this.setState({ message: "✔ Your message has been sent. It's currently going through Mordor on horseback." });
        }, (err) => {
            alert("Your message couldn't be sent. Try shooting an email to andrewpuglionesi@gmail.com");
        });
    }

    render() {
        return (
            <div className="contact-container">
                <form id="contact-form"
                    onSubmit={ (event) => this.handleSubmit(event) }>
                    <h1>Contact me</h1>
                    <input required type="text" 
                        name="name"
                        placeholder="  Your name" />
                    <input required type="email" 
                        name="emailAddress"
                        placeholder="  Your email address" />
                    <textarea placeholder=" Write your message here"
                        name="comment"
                        rows="7" />
                    <p className="message">{ this.state.message }</p>
                    <button className="send-btn">Send</button>
                </form>
            </div>
        );
    }
}
