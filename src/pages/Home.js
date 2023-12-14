import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Home() {
  const [cars, setCars] = useState([]);

  const {id}=useParams()

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    const result = await axios.get("http://localhost:8080/cars");
    setCars(result.data);
  };

  const deleteCar=async(id)=>{
    await axios.delete(`http://localhost:8080/car/${id}`)
    loadCars()
  }

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Mark</th>
              <th scope="col">Model</th>
              <th scope="col">Year</th>
              <th scope="col">Horsepower</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
            cars.map((car, index) => (
              <tr>
                <th scope="row" key={index}>{index+1}</th>
                <td>{car.mark}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>{car.hp}</td>
                <td>
                  <Link className="btn btn-primary mx-2" to={`/viewcar/${car.id}`}>View</Link>
                  <Link className="btn btn-outline-primary mx-2" to={`/editcar/${car.id}`}>Edit</Link>
                  <button className="btn btn-danger mx-2" onClick={()=>deleteCar(car.id)}>Delete</button>
                </td>
              </tr> 
            ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
