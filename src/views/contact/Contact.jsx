import { Component } from 'react';
import './contact.css';
import axios from 'axios';
import { BASE_URL } from '../../constants';
import { Translation } from 'react-i18next';

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
            this.setState({ message: "✔ Your message has been sent. It travels o'er the hills of Middle Earth." });
        }, (err) => {
            alert("Your message couldn't be sent. Try shooting an email to andrewpuglionesi@protonmail.com");
        });
    }

    render() {
        return (
            <Translation>
            { (t) =>
                <div className="contact-container">
                    <h1>{ t('contact.title') }</h1>
                    <form id="contact-form"
                        onSubmit={ (event) => this.handleSubmit(event) }>
                        <input required type="text" 
                            name="name"
                            placeholder={ t('contact.hints.name') }/>
                        <input required type="email" 
                            name="emailAddress"
                            placeholder={ t('contact.hints.email') } />
                        <textarea placeholder={ t('contact.hints.message') }
                            name="comment"
                            rows="7" />
                        <p className="message">{ this.state.message }</p>
                        <button className="send-btn">
                            { t('contact.send') }
                        </button>
                    </form>
                </div>
            }
            </Translation>
        );
    }
}
