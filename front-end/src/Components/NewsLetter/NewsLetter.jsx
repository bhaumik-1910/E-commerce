import React, { useRef } from 'react';
import './NewsLetter.css';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

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
          toast.success('SUCCESS!');
        },
        (error) => {
          toast.error('FAILED...', error.text);
        },
      );
  };
  
  return (
    <>
      <div className='newsletter'>
        <h1>Get Exclusive Offers On Your Email</h1>
        <p>Subscribe to our newsletter and stay update</p>
      </div>
      <form ref={form} onSubmit={sendEmail}>
        <div className='form'>
          <div className="form-container">
            <div className="form-fields">
              <label>Name :</label>
              <input type="text" name="user_name" placeholder='Your Full Name' />
              <label>Email Id :</label>
              <input type='email' name="user_email" placeholder='Email Address' />
              <input type='hidden' name="to_name" value={"Bhaumik"} />  
              <label>Message :</label>
              <textarea name="message" />
              <button>Send Response</button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default NewsLetter
