import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./MedicineOrder.css";
import MedicineDetails from "../MedicineDetails/MedicineDetails";
const MedicineOrder = () => {
  const userId=localStorage.getItem("userId");
  console.log("mediorder user",userId);
  const PH_ID=localStorage.getItem("PH_ID")
  const [orderDetails, setOrderDetails] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [total, setTotal] = useState(0);
  const [creditPoints, setCreditPoints] = useState(0);
  const [orderID, setOrderID] = useState(0);
  const pharmacyName=localStorage.getItem("pharmacyName");
  console.log("pharmacy name is :",pharmacyName)
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/pageorder/${userId}`);
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
      // Make a POST request to update medicine quantities and complete the order
      await axios.post("http://localhost:3001/update/quantity");
      // Optionally, you can perform any other actions on success
      console.log("Order confirmed successfully");
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error("Error confirming order:", error);
    }
  };
  const handleDelete = async (M_ID) => {
    const qtyToDelete = quantities[M_ID];

    try {
      // Make a POST request to delete medicines from the order with the specified quantity
      await axios.post(`http://localhost:3001/pageorder/deletemedicine/${PH_ID}/${M_ID}/${userId}`, {
        QtyToDelete: qtyToDelete,
      });
      // Optionally, you can update the local state or perform any other actions on success
      console.log(
        `Deleted ${qtyToDelete} units of medicine with M_ID ${M_ID} from the order`
      );
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error("Error deleting medicine from order:", error);
    }
  };
  const handleQuantityChange = (medicineId, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [medicineId]: value,
    }));
  };

  return (
    <div className="navpage" id="mediorder">
      <div>
        <Sidebar userId={userId}/>
      </div>
      
        <div className="order_details">
        <h1 style={{ color: "#000", marginLeft: "10px" }}>My Orders</h1>
          {orderDetails.map((medicine) => (
            <div key={medicine.MedicineName} >
              <p>{`Medicine: ${medicine.MedicineName}, Quantity: ${medicine.Quantity}, Price: ₹${medicine.Price}`}</p>
              {/* <input
                  type="number"
                  min="1"
                  placeholder="Qty"
                  value={quantities[medicine.M_ID] || ""}
                  onChange={(e) =>
                    handleQuantityChange(
                      medicine.M_ID,
                      parseInt(e.target.value, 10)
                    )
                  }
                  style={{ width: "120px", fontSize: "14px" }}
                />
              <button onClick={() => handleDelete(medicine.M_ID)}>
                    Delete
                  </button> */}
            </div>
          ))}
        
        <p>Total: ₹{total}</p>
        <p>Credit Points: {creditPoints}</p>
        <p>Order ID: {orderID}</p>
        <button onClick={handleConfirmOrder}>Confirm Order</button>
        <br />
        <Link to={`/${pharmacyName}`}>Back to Medicine List</Link>
        </div>
      
    </div>
  );
}

export default MedicineOrder;
