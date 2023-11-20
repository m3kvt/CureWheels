import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './Profile.css';
import Sidebar from "../../components/Sidebar/Sidebar";
const Profile = () => {
  const userId = localStorage.getItem('userId');
  console.log("profile id front:", userId);
  const [userDetails, setUserDetails] = useState({
    Cus_ID: '',
    name: '',
    dob: '',
    address: '',
    contactNo: '',
    email: '',
  });
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/pageprofile/${userId}`
        );
        console.log("retreiving the res",res)
        setUserDetails(res.data.userProfile);
        console.log("user data will be ",userDetails) // Assuming the server returns an array with a single user object
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchProfileData();
  }, [userId]);  
if (!userDetails) {
    return <div>not found {userDetails.Cus_ID}</div>;
  }
  const formattedDOB = new Date(userDetails.DOB).toLocaleDateString();

  return (
    <div className='profile'>
      <div>
        <Sidebar userId={userId}/>
      </div>
      <div className="profile_details" >
        <h1>Hi , {userDetails.Name} !</h1>
        <br/><br/>
      <p>User ID : {userDetails.Cus_ID}</p>
      
      <p>Date of Birth: {formattedDOB}</p>
      <p>Address: {userDetails.Address}</p>
      <p>Contact Number: {userDetails.ContactNo}</p>
      <p>Email: {userDetails.Email}</p>
      </div>
    </div>
  );
};

export default Profile;

/*
/*import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = ({ userId }) => {
  // State to hold user details
  const [userDetails, setUserDetails] = useState({
    Cus_ID: '',
    name: '',
    dob: '',
    address: '',
    contactNo: '',
    email: '',
  });

  useEffect(() => {
    // Fetch user data from the backend when the component mounts
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`api/user/${userId}`);
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <div>
      <h1>User Profile</h1>
      <p>Cus_ID: {userDetails.Cus_ID}</p>
      <p>Name: {userDetails.name}</p>
      <p>Date of Birth: {userDetails.dob}</p>
      <p>Address: {userDetails.address}</p>
      <p>Contact Number: {userDetails.contactNo}</p>
      <p>Email: {userDetails.email}</p>
    </div>
  );
};

export default Profile;






import React from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Profile.css";
function Profile() {
  return (
    <div className="navpage">
      <div>
        <Sidebar />
      </div>
      <div>Profile</div>
    </div>
  );
}

export default Profile;

import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
function Profile() {
  return (
    <div classname='navpage'>
      <div>
        <Sidebar/>
      </div>
      <div>
      Profile
      </div>
    </div>
  );
}

export default Profile*/
