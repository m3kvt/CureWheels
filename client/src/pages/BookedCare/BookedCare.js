import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./BookedCare.css";
const BookedCare = () => {
  const userId = localStorage.getItem("userId");

  return (
    <div id="booked_services">
      <div>
        <Sidebar userId={userId} />
      </div>
      <div>
        <h2>Opted Services</h2>
      </div>
    </div>
  );
};

export default BookedCare;
