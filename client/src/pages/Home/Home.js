import React from "react";
import Login from "../../components/Login/Login";
import "./Home.css";
import { useParams } from "react-router-dom";
function Home() {
  // const userId=useParams();
  // console.log("home userid:",userId)
  return (
    <div className="home_container" id="home">
      <div className="site-details">
        <div className="site_header">
          <h1>
            <span>CureWheels</span>
          </h1>

          <p>Fast-Track to Better Health</p>
        </div>
        {/* <img src='/assets/medicine.png' alt='medicine' width={310}/> */}
      </div>
      <div className="site-login">
        <Login />
      </div>
    </div>
  );
}

export default Home;
