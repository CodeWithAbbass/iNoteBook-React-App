import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Signup = (props) => {

  const [credentials, setCredentials] = useState({ name: '',email: '',password: '', cpassword: '', });
  const Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password} = credentials;
    const host = 'http://localhost:5000';
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify({ name, email, password })
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      // save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      Navigate("/");
 
      props.showAlert("Account Created Successfully", "success");
    }
    else {
      props.showAlert("Please Use Valid Credentials", "danger");
    }
  }
  const onChange = (e) => { setCredentials({ ...credentials, [e.target.name]: e.target.value }); }

  const style = {
    display:'block',
    margin:'auto',
    width:'20rem',
} 

  return (
    <div>
      <form style={style} onSubmit={handleSubmit}>
        {/* <div className="d-flex"> */}
        <div className="my-5">
          <label htmlFor="name" className="form-label">First Name</label>
          <input type="text" className="form-control outline-success " onChange={onChange} name="name" minLength={3} id="name" aria-describedby="emailHelp" />
        </div>
        {/* <div className="mb-3 ">
          <label htmlFor="lName" className="form-label">Last Name</label>
          <input type="text" className="form-control outline-success" onChange={onChange} name="lName" id="lName" aria-describedby="emailHelp" required />
        </div> */}
        {/* </div> */}
        <div className="mb-3 ">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control outline-success" onChange={onChange} name="email" id="email" aria-describedby="emailHelp" required />
          <div id="email" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control outline-success" onChange={onChange} name="password" minLength={3} id="password" required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control outline-success" onChange={onChange} name="cpassword" minLength={3} id="cpassword" required/>
        </div>
        <button type="submit" className="btn btn-success">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
