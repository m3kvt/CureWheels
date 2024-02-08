import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./BookedCare.css";
const BookedCare = () => {
  const userId = localStorage.getItem("userId");
  console.log("careorder user", userId);
  const [bookeddetails, setBookeddetails] = useState([]);
  const [total, setTotal] = useState(0);
  const [creditPoints, setCreditPoints] = useState(0);
  const [bookedId, setBookedId] = useState(0);
  const [isOrderConfirmed, setOrderConfirmed] = useState(false);
  const CareName = localStorage.getItem("CareName");
  console.log("pharmacy name is :", CareName);
  useEffect(() => {
    const fetchbookeddetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/bookedservices/${userId}`
        ); //trial
        setBookeddetails(response.data.bookeddetails);
        setTotal(response.data.total);
        setCreditPoints(response.data.creditPoints);
        setBookedId(response.data.bookedId);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchbookeddetails();
  }, []);

  const handleConfirmOrder = async () => {
    try {
      await axios.post(`http://localhost:3001/update/quantity/${userId}`);

      console.log("Order confirmed successfully");
      setOrderConfirmed(true);
    } catch (error) {
      console.error("Error confirming order:", error);
    }
  };

  return (
    <div className="navpage" id="mediorder">
      <div>
        <Sidebar userId={userId} />
      </div>
      {bookeddetails.length > 0 ? (
        <div className="order_details">
          <h1 style={{ color: "#000", marginLeft: "10px" }}>Opted Services</h1>
          {bookeddetails.map((service) => (
            <div key={service.ServiceName}>
              <p></p>
              <div>
                {" "}
                {`Service: ${service.ServiceName}, Centre: ${service.CareCentreName}, Timing: ${service.Timing}, Price: ₹${service.Price}`}
                <div>
                  <br />
                </div>
              </div>
            </div>
          ))}

          <p>Total: ₹{total}</p>
          <p>Credit Points: {creditPoints}</p>
          <p>Order ID: {bookedId}</p>
          <button onClick={handleConfirmOrder}>Confirm Order</button>
          {isOrderConfirmed && <p>Order successfully confirmed!</p>}
          <br />
          <Link to={`/carecentres/${CareName}`}>Back to Medicine List</Link>
        </div>
      ) : (
        <p>No orders available</p>
      )}
    </div>
  );
};

export default BookedCare;
