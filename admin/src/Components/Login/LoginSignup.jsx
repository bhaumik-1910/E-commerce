import React, { useState } from 'react';
import './LoginSignup.css';

const LoginSignup = () => {

  const [state, setState] = useState("Login");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  //E-mail validation
  const emailValidation = (e) => {
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9*-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g
     if (!formData.email.match(regEx) && formData != "") {
     return alert("Email is not valid"),exit(0);
    } 
  }

  //Login Function
  const login = async () => {
    emailValidation();
    console.log("Login Function Executed", formData);

    let responseData;
    await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data);

    if (responseData.success) {
      localStorage.setItem('aut-token', responseData.token);
      window.location.replace("/admin");
    }
    else {
      // alert(responseData.errors);
      alert("Enter Valid Email and Password ?");
    }
  }

  //Signup Function
  const signup = async () => {
    emailValidation();
    console.log("Sign Up Function Executed", formData);

    let responseData;
    await fetch('http://localhost:3001/singup', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data);

    if (responseData.success) {
      localStorage.setItem('aut-token', responseData.token);
      window.location.replace("/admin");
    }
    else {
      alert("Enter Valid Information!");
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' required /> : <></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' required />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' required />
        </div>
        <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>
        {state === "Sign Up" ? <p className='loginsignup-login'>Already have an account? <span onClick={() => { setState("Login") }}>Login here</span></p>
          : <p className='loginsignup-login'>Create an account? <span onClick={() => { setState("Sign Up") }}>Click Here</span></p>}
      </div>
    </div>
  )
}

export default LoginSignup
