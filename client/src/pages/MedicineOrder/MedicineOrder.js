import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./MedicineOrder.css";
const MedicineOrder = () => {
  const userId = localStorage.getItem("userId");
  console.log("mediorder user", userId);
  const PH_ID = localStorage.getItem("PH_ID");
  const [orderDetails, setOrderDetails] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [total, setTotal] = useState(0);
  const [creditPoints, setCreditPoints] = useState(0);
  const [orderID, setOrderID] = useState(0);
  const [isOrderConfirmed, setOrderConfirmed] = useState(false);
  const pharmacyName = localStorage.getItem("pharmacyName");
  console.log("pharmacy name is :", pharmacyName);
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/pageorder/${userId}`
        );
        setOrderDetails(response.data.orderDetails);
        setTotal(response.data.total);
        setCreditPoints(response.data.creditPoints);
        setOrderID(response.data.orderID);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
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
  const handleDelete = async (M_ID) => {
    const qtyToDelete = quantities[M_ID];

    try {
      
      await axios.post(
        `http://localhost:3001/pageorder/deletemedicine/${PH_ID}/${M_ID}/${userId}`,
        {
          QtyToDelete: qtyToDelete,
        }
      );
      
      console.log(
        `Deleted ${qtyToDelete} units of medicine with M_ID ${M_ID} from the order`
      );
    } catch (error) {
      
      console.error("Error deleting medicine from order:", error);
    }
  };
  const handleQuantityChange = (medicineId, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [medicineId]: value,
    }));
  };
  console.log(orderDetails)
  return (
    <div className="navpage" id="mediorder">
      <div>
        <Sidebar userId={userId} />
      </div>
      {orderDetails.length > 0 ? (
      <div className="order_details">
        <h1 style={{ color: "#000", marginLeft: "10px" }}>My Orders</h1>
        {orderDetails.map((medicine) => (
          <div key={medicine.MedicineName}>
          <p>
           
          </p>
            <div> {`Medicine: ${medicine.MedicineName}, Pharmacy: ${medicine.PharmacyName}, Quantity: ${medicine.Quantity}, Price: ₹${medicine.Price}`}<div><br/></div></div>
           
          </div>
        ))}

        <p>Total: ₹{total}</p>
        <p>Credit Points: {creditPoints}</p>
        <p>Order ID: {orderID}</p>
        <button onClick={handleConfirmOrder}>Confirm Order</button>
        {isOrderConfirmed && <p>Order successfully confirmed!</p>}
        <br />
        <Link to={`/pharmacies/${pharmacyName}`}>Back to Medicine List</Link>
      </div>
      ) : (
  <p>No orders available</p>
)}
    </div>
  );
};

export default MedicineOrder;
