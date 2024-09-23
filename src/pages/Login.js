import React, { useState} from "react";
import axios from "axios";
import {Link, useLocation, useNavigate} from "react-router-dom";

export default function Login(props) {

  const location = useLocation();

  let navigate = useNavigate();

    const [loginError, setLoginError] = useState(false);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });

  const { username, password } = user;

  const onInputChange = (e) => {
    setLoginError(false);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    validate();
    e.preventDefault();
  };

  const validate = async () => {
    if((await axios.post(`http://localhost:8080/user/find`, user)).data){
        localStorage.setItem('auth','true');
        localStorage.setItem('username', user.username);
        props.changeState();
        navigate("/home"); 
    }
    else{
      setLoginError(true);
    }
  };

  if(localStorage.getItem('auth') == 'true'){
    if(location.pathname === '/login'){
      console.log(localStorage.getItem('auth'))
      return (
          <div className="container">
            <div className="row">
              <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <h2 className="text-center m-4">You're already logged in, go back</h2>
                  <Link className="btn btn-primary mx-2" to="/home">
                    Go back
                  </Link>
              </div>
            </div>
          </div>
      );
    }
  }
  else {
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

                {loginError && <p style={{color: 'red'}}>Incorrect username or password </p>}

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
}

