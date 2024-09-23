import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  let navigate = useNavigate();

  const [userError, setUserError] = useState(false);
  const [userExistError, setUserExistError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passErr, setPassErr] = useState(false);
  const [emailValError, setEmailValError] = useState(false);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    money: 1000
  });

  const { username, email, password, money } = user;

  const validEmailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const onInputChange = (e) => {
    setUserError(false);
    setUserExistError(false);
    setEmailError(false);
    setPassErr(false);
    setEmailValError(false);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    validate();
    e.preventDefault();
  };

  const validate = async () => {

    if(!username.trim()){
      setUserError(true);
    }
    else if(!email.trim()){
      setEmailError(true);
    }
    else if (!password.trim()) {
      setPassErr(true);
    }
    else if (!validEmailRegex.test(email)) {
      setEmailValError(true);
    } 
    else{

      const userSearch = ((await axios.get(`http://localhost:8080/user/isExist`, user)).data)
      if(userSearch){
        setUserExistError(true);
      }
      else{
        axios.post("http://localhost:8080/user/add", user);
        navigate("/login");
      }
      
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Registration</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Enter your username
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Username"
                name="username"
                value={username}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                Enter your email
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Password" className="form-label">
              Create password
              </label>
              <input
                type={"password"}
                className="form-control"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            {userError && <p style={{ color: 'red' }}>You forgot to write username</p>}
            {userExistError && <p style={{ color: 'red' }}>Username taken</p>}
            {emailError && <p style={{ color: 'red' }}>You forgot to write email</p>}
            {passErr && <p style={{ color: 'red' }}>You forgot to write password</p>}
            {emailValError && <p style={{ color: 'red' }}>Incorrect email</p>}

            <button
              type="submit"
              className="btn btn-outline-primary"
            >
              Submit
            </button>
            
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
