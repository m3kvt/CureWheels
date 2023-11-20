import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Sidebar.css';
import Profile from '../../pages/Profile/Profile';

const Sidebar = () =>{
  // const userId = useParams().userId;
  const userId=localStorage.getItem("userId");
  console.log('sidebar userid:',userId); // Use destructuring to get userId directly
  const navigate = useNavigate();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // console.log('Fetching user data...');
  //       // const res = await axios.get(`http://localhost:3001/pageprofile/${userId}`);
  //       // console.log('Retrieved user data:', res.data.userProfile);
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }
  //   };
  //   fetchData();
  // }, [userId]);

  const handleProfile = () => {
    try {
      console.log('Navigating to profile...:',userId);
      navigate(`/pageprofile/${userId}`);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <div className="side_container" id="sidebar">
      <div className="sidebar">
        <div className="section">
          <Link to="/pharmacies" className="link" activeclassName="active">
            Search Medicines
          </Link>
        </div>
        <div className="section">
          <Link to="/pageservices" className="link" activeclassName="active">
            Services
          </Link>
        </div>
        <div className="section">
          <Link to={`/pageorder/${userId}`} className="link" activeclassName="active">
            Ordered Medicines
          </Link>
        </div>
        <div className="section">
          <Link to="/bookedservices" className="link" activeclassName="active">
            Booked Services
          </Link>
        </div>
        <div className="section">
          <Link to={`/pageprofile/${userId}`} className="link" activeclassName="active" >
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;



/*import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
          title: "BUY MEDICINES",
          path: "/pagemedicine",
      
        },
        {
          title: "SERVICES",
          path: "/pageservices",
        },
        {
          title: "ORDER HISTORY",
          path: "/pageorder",
        },
        {
          title: "PROFILE",
          path: "/pageprofile",
        },
    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
                   
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassname="active">
                           
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.title}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;
*/