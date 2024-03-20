import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import { toast } from 'react-toastify';

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
     return toast.error("Email is not valid");//,exit(0)
    } 
  }

    //show password
    const [checktype, setChecktype] = useState("password");
    const [showhidetext, setShowhidetext] = useState("Show");
  
    const handleshowhidepassword = (e) => {
      const gettype = e.target.value;
      console.log(gettype);
      if (gettype === "password") {
        setChecktype("text");
        setShowhidetext("Hide");
      } else {
        setChecktype("password");
        setShowhidetext("Show");
      }
    }

  //Login Function
  const login = async () => {
    emailValidation();
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
      toast.error("Check the Email and Password");
    }
  }

  //Signup Function
  const signup = async () => {
    emailValidation();
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
      console.log(responseData.errors);
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' required /> : <></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
          <input name='password' value={formData.password} onChange={changeHandler} type={checktype} placeholder='Password' />

          <button className='btn' type='button' value={checktype} onClick={(e) => handleshowhidepassword(e)}>{showhidetext}</button>
        
        </div>
        <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>
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
