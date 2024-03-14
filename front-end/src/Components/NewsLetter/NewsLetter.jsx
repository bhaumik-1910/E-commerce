import React, { useRef } from 'react';
import './NewsLetter.css';
import emailjs from '@emailjs/browser';

const NewsLetter = () => {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_50y55nn",
        "template_cvimmaj",
        form.current,
        "XH9jQGVwvVXQwSEzI"
      )
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <>
      <div className='newsletter'>
        <h1>Get Exclusive Offers On Your Email</h1>
        <p>Subscribe to our newsletter and stay update</p>
        bhaumikkothiya1@gmail.com
      </div>
      <form ref={form} onSubmit={sendEmail}>
        <div className='form'>
          <div className="form-container">
            <div className="form-fields">
              <label>Name :</label>
              <input type="text" name="user_name" placeholder='Your Full Name' required />
              <label>Email Id :</label>
              <input name='email' type="user_email" placeholder='Email Address' required />
              <label>Message :</label>
              <textarea name="message" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default NewsLetter
