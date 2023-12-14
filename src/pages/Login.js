import React, { useState, Navigate, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { validYear, validHp } from "../regex.js";

export default function Login(props) {

    let navigate = useNavigate();

    const [loginError, setLoginError] = useState(false);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });

  

  const { username, email, password } = user;

  const onInputChange = (e) => {
    setLoginError(false);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    validate();
    e.preventDefault();
  };

  const validate = async () => {
    if((await axios.post(`http://localhost:8080/userfind`, user)).data){
        localStorage.setItem('auth',true);
        props.changeState();
        navigate("/home"); 
    }
    else{
      setLoginError(true);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Login</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Username
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your username"
                name="username"
                value={username}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Password" className="form-label">
              Password
              </label>
              <input
                type={"password"}
                className="form-control"
                placeholder="Enter password"
                name="password"
                value={password}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            {loginError && <p style={{ color: 'red' }}>Incorrect username or password </p>}

            <button
              type="submit"
              className="btn btn-primary"
            >
              Login
            </button>
            
            <Link className="btn btn-outline-primary mx-2" to="/Register">
              Register
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
