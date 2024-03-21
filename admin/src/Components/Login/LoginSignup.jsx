import React, { useState } from 'react';
import './LoginSignup.css';
import { toast } from 'react-toastify';
import useOnKeyPress from '../../hooks/useOnKeyPress';
// import eye from '../../assets/eye.png';
// import { IoEyeSharp } from "react-icons/io5";


const LoginSignup = () => {


  const [value, setValue] = useState('');
  const [list, setList] = useState([]);

  const submitHandler = () => {
    setList([...list, value]);
    setValue('');
  };
  useOnKeyPress(submitHandler, 'Enter');


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
      return toast.error("Email is not valid"), exit(0);
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
      toast.success("Login SuccessFully");
      window.location.replace("/admin");
    }
    else {
      // alert(responseData.errors);
      toast.error("Enter Valid Email and Password ?");
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
      toast.error("Unique Username and E-mail!");
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' required /> : <></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' required />
          <input name='password' value={formData.password} onChange={changeHandler} type={checktype} placeholder='Password' required maxLength='8' />

          <div className='btn'>
            <button type='button' value={checktype} onClick={(e) => handleshowhidepassword(e)}>{showhidetext}</button>
          </div>

        </div>
        <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>
        {state === "Sign Up" ? <p className='loginsignup-login'>Already have an account? <span onClick={() => { setState("Login") }}>Login here</span></p>
          : <p className='loginsignup-login'>Create an account? <span onClick={() => { setState("Sign Up") }}>Click Here</span></p>}
      </div>


      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={submitHandler}>SUBMIT</button>
      <ol>
        {/* {list.map((item)=>{ */}
        <li>{list}</li>
        {/* })} */}
      </ol>

    </div>
  )
}

export default LoginSignup

// ------------------------------------------------------------------------------------------------------

// import React, { useState } from "react";

// const FormWithValidation = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//   });

//   const [formErrors, setFormErrors] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;

//     // Update form data
//     setFormData({
//       ...formData,
//       [name]: value,
//     });

//     // Perform validation
//     if (name === "firstName" && value === "") {
//       setFormErrors({
//         ...formErrors,
//         firstName: "First name is required.",
//       });
//     } else if (name === "lastName" && value === "") {
//       setFormErrors({
//         ...formErrors,
//         lastName: "Last name is required.",
//       });
//     } else if (name === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
//       setFormErrors({
//         ...formErrors,
//         email: "Invalid email address.",
//       });
//     } else {
//       // Clear validation errors if input is valid
//       setFormErrors({
//         ...formErrors,
//         [name]: "",
//       });
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Perform validation before submitting the form
//     const validationErrors = Object.keys(formData).reduce((errors, name) => {
//       if (formData[name] === "") {
//         errors[name] = `${
//           name.charAt(0).toUpperCase() + name.slice(1)
//         } is required.`;
//       } else if (name === "email" && !/^\S+@\S+\.\S+$/.test(formData[name])) {
//         errors[name] = "Invalid email address.";
//       }
//       return errors;
//     }, {});

//     // Update form errors
//     setFormErrors(validationErrors);

//     // Check if there are any validation errors
//     if (Object.values(validationErrors).every((error) => error === "")) {
//       // Perform custom business logic or submit the form
//       console.log("Form submitted successfully!");
//       console.log("Form Data:", formData);
//     } else {
//       console.log("Form validation failed. Please check the errors.");
//     }
//   };

//   return (
//     <form>
//       <label>
//         First Name:
//         <input
//           type="text"
//           name="firstName"
//           value={formData.firstName}
//           onChange={handleInputChange}
//         />
//         <span className="error">{formErrors.firstName}</span>
//       </label>

//       <label>
//         Last Name:
//         <input
//           type="text"
//           name="lastName"
//           value={formData.lastName}
//           onChange={handleInputChange}
//         />
//         <span className="error">{formErrors.lastName}</span>
//       </label>

//       <label>
//         Email:
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleInputChange}
//         />
//         <span className="error">{formErrors.email}</span>
//       </label>

//       <button type="submit" onClick={handleSubmit}>Submit</button>
//     </form>
//   );
// };

// export default FormWithValidation;