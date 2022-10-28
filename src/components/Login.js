import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: '', password: '', });
  let Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const host = 'http://localhost:5000';
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      // save the auth token and redirect
      console.log(json.authtoken);
      localStorage.setItem('token', json.authtoken);
      props.showAlert("Logged in Successfully", "success")
      Navigate("/");
    }
    else {
      props.showAlert("Please Use Valid Credentials", "danger")
    }
  }
  const onChange = (e) => { setCredentials({ ...credentials, [e.target.name]: e.target.value }); }
  const style = {
    display: 'block',
    margin: 'auto',
    width: '20rem',
  }
  return (
    <div>
      <form style={style} onSubmit={handleSubmit}>
        <div className="my-5">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control outline-success" name="email" value={credentials.email} onChange={onChange} id="email" aria-describedby="emailHelp" autoComplete='on' required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control outline-success" name="password" value={credentials.password} onChange={onChange} id="password" autoComplete='on' required />
        </div>
        <button type="submit" className="btn btn-success">Login</button>
      </form>
    </div>
  )
}

export default Login;
