import React,{useState} from 'react'
import Sidebar from "../../components/Sidebar/Sidebar"
import './Services.css'
import { Link } from "react-router-dom";
const Services = () => {
  const [services, setservices] = useState([]);
  const userId=localStorage.getItem("userId");
  return (
    <div className="navpage" id="servicepage">
      <div>
      <Sidebar userId={userId}/>
      </div>
      <div>
      <div><h2>Services</h2></div>
      
      <div className="services">
          {services.map((service) => (
            <div key={service} className="service">
              <Link to={`/service/${service}`} className="service_link">
                {service}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Services