import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: '', password: '', });
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const host = 'http://localhost:5000';
    const url = 'api/auth/login';
    const response = await fetch(`${host}/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    // console.log(json);
    if (json.success) {
      // save the auth token and redirect
      localStorage.setItem('token', json.authToken);  
      Navigate("/");
      props.showAlert("Logged in Successfully", "success")
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
  );
}

export default Login;
