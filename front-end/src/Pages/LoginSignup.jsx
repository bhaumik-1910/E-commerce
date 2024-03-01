import React, { useState } from 'react';
import './CSS/LoginSignup.css';

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
  // const emailValidation = (e) => {
  //   const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9*-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g
  //   if (regEx.test(formData)) {
  //   } else if (!regEx.test(formData) && formData != "") {
  //     alert("Email is not valid");
  //   } else {
  //     alert(e);
  //   }
  // }

  //Login Function
  const login = async () => {
    console.log("Login Function Executed", formData);

    let responseData;
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data);

    if (responseData.success) {
      localStorage.setItem('aut-token', responseData.token);
      window.location.replace("/");
    }
    else {
      // alert(responseData.errors);
      alert("Check the Email and Password");
    }
  }

  //Signup Function
  const signup = async () => {
    console.log("Sign Up Function Executed", formData);

    let responseData;
    await fetch('http://localhost:4000/singup', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data);

    if (responseData.success) {
      localStorage.setItem('aut-token', responseData.token);
      window.location.replace("/");
    }
    else {
      alert(responseData.errors);
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
        <button onClick={() => { state === "Login" ? login() : signup()  }}>Continue</button>
        {state === "Sign Up" ? <p className='loginsignup-login'>Already have an account? <span onClick={() => { setState("Login") }}>Login here</span></p>
          : <p className='loginsignup-login'>Create an account? <span onClick={() => { setState("Sign Up") }}>Click Here</span></p>}
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, i agree to the terms of use & private policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup