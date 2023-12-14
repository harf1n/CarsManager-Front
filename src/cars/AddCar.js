import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { validYear, validHp } from "../regex.js";

export default function AddCar() {
  let navigate = useNavigate();

  const [markError, setMarkError] = useState(false);
  const [modelError, setModelError] = useState(false);
  const [yearErr, setYearErr] = useState(false);
  const [hpError, setHpError] = useState(false);
  const [yearEmpErr, setYearEmpErr] = useState(false);
  const [hpEmpError, setHpEmpError] = useState(false);

  const [car, setCar] = useState({
    mark: "",
    model: "",
    year: "",
    hp: "",
  });

  const { mark, model, year, hp } = car;

  const onInputChange = (e) => {
    setMarkError(false);
    setModelError(false);
    setYearEmpErr(false);
    setHpEmpError(false);
    setYearErr(false);
    setHpError(false);
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    validate();
    e.preventDefault();
  };

  const validate = async () => {
    if(!mark.trim()){
      setMarkError(true);
    }
    else if(!model.trim()){
      setModelError(true);
    }else if (!year.trim()) {
      setYearEmpErr(true);
    }
    else if (!validYear.test(year)) {
        setYearErr(true);
    } else if (!hp.trim()) {
      setHpEmpError(true);
    }
     else if (!validHp.test(hp)) {
      setHpError(true);
    } else {
      await axios.post("http://localhost:8080/car", car);
      navigate("/home");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register Car</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Mark" className="form-label">
                Mark
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter new mark"
                name="mark"
                value={mark}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Model" className="form-label">
                Model
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter new model"
                name="model"
                value={model}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Year" className="form-label">
                Year
              </label>
              <input
                type={"number"}
                className="form-control"
                placeholder="Enter new year"
                name="year"
                value={year}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Year" className="form-label">
                Horsepower
              </label>
              <input
                type={"number"}
                className="form-control"
                placeholder="Enter new horsepower"
                name="hp"
                value={hp}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            {markError && <p style={{ color: 'red' }}>You forgot to write mark of the car</p>}
            {modelError && <p style={{ color: 'red' }}>You forgot to write model of the car</p>}
            {yearEmpErr && <p style={{ color: 'red' }}>You forgot to write year of the car</p>}
            {hpEmpError && <p style={{ color: 'red' }}>You forgot to write horsepower of the car</p>}
            {yearErr && <p style={{ color: 'red' }}>Year can only be between 1950-2023</p>}
            {hpError && <p style={{ color: 'red' }}>Wrong horsepower amount</p>}

            <button
              type="submit"
              className="btn btn-outline-primary"
            >
              Submit
            </button>
            
            <Link className="btn btn-outline-danger mx-2" to="/home">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
