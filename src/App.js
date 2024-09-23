import React, { Component, useState }  from 'react';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AddCar from './cars/AddCar';
import EditCar from './cars/EditCar';
import ViewCar from './cars/ViewCar';
import Welcome from "./pages/Welcome";
import UpgradeCar from "./cars/UpgradeCar";

function App() {
  const getAuth = JSON.parse(localStorage.getItem('auth'));
  const [auth, setAuth] = useState(getAuth)
  function changeState(){
    setAuth(true)
  }
  function changeStateLogout(){
    setAuth(false)
  }

  return (
    <div className="App">
      <Router>
      {auth && <Navbar changeStateLogout={changeStateLogout}/>}
      <Routes>
        <Route exact path="/" element={<Welcome changeState={changeState} auth={auth}/>}/>
        <Route exact path="/login" element={<Login changeState={changeState} auth={auth}/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/addcar" element={<AddCar/>}/>
        <Route exact path="/editcar/:id" element={<EditCar/>}/>
        <Route exact path="/viewcar/:id" element={<ViewCar/>}/>
        <Route exact path="/upgradecar/:id" element={<UpgradeCar/>}/>
      </Routes>
      </Router>
    </div>
  );
}

export default App;

