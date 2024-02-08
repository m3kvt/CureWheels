import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Services.css";
import { useParams } from "react-router-dom";
import axios from "axios";
const Services = () => {
  const { CareName } = useParams();
  console.log("carename: ", CareName);
  const C_ID = localStorage.getItem("C_ID");
  localStorage.setItem("CareName", CareName);
  const [services, setservices] = useState([]);
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  const userId = storedUserData.userId;
  console.log("servicedetails id:", userId);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/carecentres/${CareName}`
        );
        setservices(response.data.serviceDetails);
        console.log("servicesss ", response.data.serviceDetails);
      } catch (error) {
        console.error("Error fetching Services:", error);
      }
    };
    fetchServices();
  }, [CareName, userId]);

  const handleBook = async (S_ID) => {
    try {
      console.log("S_ID:", S_ID);
      localStorage.setItem("S_ID", S_ID);

      await axios.post(
        `http://localhost:3001/bookedservices/bookservice/${C_ID}/${S_ID}/${userId}`,
        {
          Qty: 1,
        }
      );

      console.log(`Booked service with S_ID ${S_ID} to the order`);
    } catch (error) {
      console.error("Error adding service to order:", error);
    }
  };

  const handleCancel = async (S_ID) => {
    try {
      await axios.post(
        `http://localhost:3001/pageorder/deleteservice/${C_ID}/${S_ID}/${userId}`,
        {
          QtyToDelete: 1,
        }
      );

      console.log(` Cancelled service with S_ID ${S_ID} from the order`);
    } catch (error) {
      console.error("Error deleting service from order:", error);
    }
  };

  return (
    <div className="navpage" id="servicepage">
      <div className="servicesidebar">
        <Sidebar userId={userId} />
      </div>
      <div className="servicepage">
        <div>
          <h2>Services of {CareName}</h2>
        </div>

        <div className="services">
          {services.map((service) => (
            <div key={service.S_ID} className="service">
              <div>
                <h4>{service.Name}</h4>
                <p>Timing :{service.Timing}</p>
                <p>Service Type :{service.S_Type}</p>
                <p>Description: {service.Descption}</p>
                <p>Price: ₹{service.Price}</p>
              </div>
              <div className="quantity-input">
                <div className="buttons">
                  <button onClick={() => handleBook(service.S_ID)}>Book</button>
                  <button onClick={() => handleCancel(service.S_ID)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
