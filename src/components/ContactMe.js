import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import './ContactMe.css'

function ContactMe() {
    const [subject, setSubject] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const messageData = { subject, email, message };

        fetch('http://localhost:5000/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(messageData)
        })
            .then(response => response.json())
            .then(data => console.log('Message sent:', data))
            .catch(error => console.error('Error:', error));

        // Clear the form
        setSubject('');
        setEmail('');
        setMessage('');
    };

    return (
        <>
            <Header />

            <div className='contact-main'>
                <form onSubmit={handleSubmit}>
                    <h2>Contact Me</h2>
                    <div className='inputs'>
                        <input
                            type="text"
                            placeholder="Subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <textarea
                        placeholder="Your Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />

                    <div className='button-container'>
                        <button style={{ width: '20%' }} type="submit">Send Message</button>
                    </div>
                </form>
            </div>

            <Footer />
        </>
    );
}

export default ContactMe;