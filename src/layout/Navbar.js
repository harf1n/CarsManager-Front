import React from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";

export default function Navbar(props) {
  function logout(){
    localStorage.setItem('auth', 'false');
    props.changeStateLogout();
  }

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand" to="/">Cars Manager App</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div>
                    <a className="balance">Balance: ${}</a>
                  <Link className='btn btn-outline-light' to="/addcar">Add Car</Link>
                  <Link style={{marginLeft: 20}} className='btn btn-outline-light' onClick={logout} to="/">Log out</Link>
                </div>
                
            </div>
        </nav>
    </div>
  )
}
