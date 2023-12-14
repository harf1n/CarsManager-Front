import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewCar() {

  const { id } = useParams();

  const [car, setCar] = useState({
    mark: "",
    model: "",
    year: "",
    hp: ""
  });

  useEffect(() => {
    loadCar();
  }, []);

  const loadCar = async () => {
    const result = await axios.get(`http://localhost:8080/car/${id}`);
    setCar(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">View Car</h2>

          <div className="card">
            <div className="card-header">
              Details of car id: {car.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Mark: </b>
                  {car.mark}
                </li>
                <li className="list-group-item">
                  <b>Model: </b>
                  {car.model}
                </li>
                <li className="list-group-item">
                  <b>Year: </b>
                  {car.year}
                </li>
                <li className="list-group-item">
                  <b>Horsepower: </b>
                  {car.hp}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/home"}>
            Back to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
}
