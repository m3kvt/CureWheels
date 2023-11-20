import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Pharmacy.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Pharmacy = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const userId=localStorage.getItem("userId");
  const handlePharmacyClick = (pharmacy) => {
    // Assuming PH_ID is the property name for pharmacy ID
    localStorage.setItem("PH_ID", pharmacy.PH_ID);
    localStorage.setItem("pharmacyName", pharmacy.Name);
    // Add other properties as needed
  };
  console.log("pharm front id:",userId)
  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const response = await axios.get("http://localhost:3001/pharmacies");
        console.log("pharmacy names :",response.data.pharmacyDetails)
        setPharmacies(response.data.pharmacyDetails);
        
        
      } catch (error) {
        console.error("Error fetching pharmacies:", error);
      }
    };

    fetchPharmacies();
  }, []);

  return (
    <div className="navpage" id="pharmpage">
      <div className="pharmsidebar" >
        <Sidebar userId={userId}/>
      </div>
      <div className="pharmpage">
        <div>
          <h2>Decide on Your Cure Corner</h2>
        </div>

        <div className="pharmacies">
  {pharmacies.map((pharmacy) => (
    <div key={pharmacy.PH_ID} className="pharmacy" onClick={() => handlePharmacyClick(pharmacy)}>
      <Link to={`/${pharmacy.Name}`} className="pharmacy_link">
        {pharmacy.Name}
      </Link>
      
      <p>Address: {pharmacy.Address}</p>
      <p>Contact No: {pharmacy.Contact_No}</p>
      <p>Opening Hours: {pharmacy.Working_Hrs}</p>
      {/* Add more details as needed */}
    </div>
  ))}
</div>
      </div>
    </div>
  );
};

export default Pharmacy;
