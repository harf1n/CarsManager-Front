import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditCar() {
  let navigate = useNavigate();

    const {id}=useParams();

  const [car, setCar] = useState({
    mark: "",
    model: "",
    year: "",
    hp: ""
  });

  const { mark, model, year, hp } = car;

  const onInputChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  useEffect(()=>{
    loadCar()
  },[]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/car/edit/${id}`, car);
    navigate("/home");
  };

  const loadCar =async()=>{
    const result=await axios.get(`http://localhost:8080/car/${id}`)
    setCar(result.data)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Car</h2>

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
              <label htmlFor="Horsepower" className="form-label">
              Stock Horsepower
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
            <button type="submit" className="btn btn-outline-primary">
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
