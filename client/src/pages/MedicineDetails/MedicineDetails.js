import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./MedicineDetails.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const MedicineDetails = () => {
  const { pharmacyName } = useParams();
  const PH_ID = localStorage.getItem("PH_ID");
  console.log("pharmacyName:", pharmacyName);
  localStorage.setItem("pharmacyName", pharmacyName);
  const [medicines, setMedicines] = useState([]);
  const [quantities, setQuantities] = useState({});
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  const userId = storedUserData.userId;
  console.log("medidetails id:", userId);
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/pharmacies/${pharmacyName}`
        );
        setMedicines(response.data.medicineDetails);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };
    fetchMedicines();
  }, [pharmacyName, userId]);

  const handleAdd = async (M_ID) => {
    const qty = quantities[M_ID];
    try {
      console.log("M_ID:", M_ID);
      localStorage.setItem("M_ID", M_ID);
      await axios.post(
        `http://localhost:3001/pageorder/addmedicine/${PH_ID}/${M_ID}/${userId}`,
        {
          Qty: qty,
        }
      );

      console.log(
        `Added ${qty} units of medicine with M_ID ${M_ID} to the order`
      );
    } catch (error) {
      // Handle errors
      console.error("Error adding medicine to order:", error);
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

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  //Filter medicines based on the search query
  const filteredMedicines = medicines.filter((medicine) =>
    medicine.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="navpage" id="medicinepage">
      <div className="medisidebar">
        <Sidebar userId={userId} />
      </div>
      <div className="medicinepage">
        <h2>Greetings from {pharmacyName} </h2>
        <br />
        <h5>Pick your medicines</h5>

        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="  search here"
          className="search"
          style={{ width: "350px", fontSize: "15px" }}
        />
        <div className="medicines">
          {filteredMedicines.map((medicine) => (
            <div key={medicine.M_ID} className="medicine">
              <div>
                <h4>{medicine.Name}</h4>
                <p>
                  MfgDate:{new Date(medicine.Mfg_date).toLocaleDateString()}
                </p>
                <p>
                  ExpDate:{new Date(medicine.Exp_date).toLocaleDateString()}
                </p>
                <p>Price: ₹{medicine.Price}</p>
              </div>
              <div className="quantity-input">
                <input
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
                <div className="buttons">
                  <button onClick={() => handleAdd(medicine.M_ID)}>Add</button>
                  <button onClick={() => handleDelete(medicine.M_ID)}>
                    Delete
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

export default MedicineDetails;
