import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./CareCentre.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const CareCentre = () => {
  const [centres, setcentres] = useState([]);
  const userId = localStorage.getItem("userId");
  const handleCentreClick = (centre) => {
    localStorage.setItem("C_ID", centre.C_ID);
    localStorage.setItem("CareName", centre.Name);
  };
  console.log("centre front id:", userId);
  useEffect(() => {
    const fetchCentres = async () => {
      try {
        const response = await axios.get("http://localhost:3001/carecentres");
        console.log("centre names :", response.data.CareDetails);
        setcentres(response.data.CareDetails);
      } catch (error) {
        console.error("Error fetching centres :", error);
      }
    };

    fetchCentres();
  }, []);

  return (
    <div className="navpage" id="centrepage">
      <div className="centresidebar">
        <Sidebar userId={userId} />
      </div>
      <div className="centrepage">
        <div>
          <h2>Check out the service centres</h2>
        </div>

        <div className="centres">
          {centres.map((centre) => (
            <div
              key={centre.C_ID}
              className="centre"
              onClick={() => handleCentreClick(centre)}
            >
              <Link to={`/carecentres/${centre.Name}`} className="centre_link">
                {centre.Name}
              </Link>

              <p>Address: {centre.Address}</p>
              <p>Contact No: {centre.Contact_No}</p>
              <p>Opening Hours: {centre.Working_Hrs}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareCentre;
