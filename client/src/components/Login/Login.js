import React, { useEffect, useState } from "react";
import "./Login.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [action, setAction] = useState("Login");

  const [inputs, setInputs] = useState({
    Cus_ID: "",
    name: "",
    dob: "",
    address: "",
    contactNo: "",
    email: "",
    password: "",
  });
  const [formvalues, setformvalues] = useState(inputs);
  const [formerrors, setformerrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();
  const handleChange = (e) => {
    console.log(e.target);
    setformvalues({ ...formvalues, [e.target.name]: e.target.value });
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log("inputs:", inputs);
  };

  const handleSignup = async () => {
    alert("Successfully registered");
    try {
      const response = await axios.post(
        "http://localhost:3001/register",
        formvalues
      );
      const userId = response.data;

      if (response.data.status === "error") {
        alert(`Registration error: ${response.data.error}`);
      } else {
        console.log("Registration successful:", userId);

        alert("Successfully registered");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/login",
        formvalues
      );
      const userId = response.data.userId;

      console.log("Login response:", response.data);

      if (userId) {
        console.log("navigating");
        localStorage.setItem("userData", JSON.stringify(response.data));
        localStorage.setItem("userId", userId);
        navigate(`/pageprofile/${userId}`);
      } else {
        alert("Invalid Email or Password");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setformerrors(validate(formvalues));
    console.log("Form Values:", formvalues);
    setIsSubmit(true);
  };
  useEffect(() => {
    if (Object.keys(formerrors).length === 0 && isSubmit) {
      console.log(formvalues);
    }
  }, [formerrors]);

  const handleDateChange = (date) => {
    console.log("given date:", date);
    if (date) {
      const formattedDate = new Date(date).toISOString().split("T")[0];
      console.log("Formatted Date:", formattedDate);
      setformvalues({ ...formvalues, dob: formattedDate }, () => {
        console.log("Updated formvalues:", formvalues);
      });
    }
  };
  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Name is required";
    } else if (!/^[a-zA-Z ]{3,50}$/.test(values.name)) {
      errors.name = "invalid name";
    }

    if (!values.dob) {
      errors.dob = "Date of birth is required";
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(values.dob)) {
      errors.dob = "Invalid date of birth format (YYYY-MM-DD)";
    }

    if (!values.contactNo) {
      errors.contactNo = "Phone number is required";
    } else if (!/^\d{10}$/.test(values.contactNo)) {
      errors.contactNo = "Invalid phone number (10 digits)";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  return (
    <div>
      {/* <pre>{JSON.stringify(formvalues, undefined, 2)}</pre> */}
      <form onSubmit={handleSubmit}>
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          {action === "Login" ? null : (
            <>
              <div className="input">
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  onChange={handleChange}
                  value={formvalues.name}
                  style={{ width: "230px", height: "25px" }}
                />
              </div>
              <p className="error">{formerrors.name}</p>
              <div className="input">
                <input
                  type="text"
                  name="dob"
                  placeholder="dob"
                  onChange={handleChange}
                  value={formvalues.dob}
                  style={{ width: "230px", height: "25px" }}
                />
              </div>

              <p className="error">{formerrors.dob}</p>
              <div className="input">
                <input
                  type="text"
                  name="address"
                  placeholder="address"
                  onChange={handleChange}
                  value={formvalues.address}
                  style={{ width: "230px", height: "25px" }}
                />
              </div>
              <p></p>
              <div className="input">
                <input
                  type="tel"
                  name="contactNo"
                  placeholder="phone no"
                  pattern="[0-9]{10}"
                  onChange={handleChange}
                  value={formvalues.contactNo}
                  style={{ width: "230px", height: "25px" }}
                />
              </div>
              <p className="error">{formerrors.contactNo}</p>
            </>
          )}
          <div className="input">
            <input
              type="email"
              name="email"
              placeholder="email"
              autoComplete="email"
              onChange={handleChange}
              value={formvalues.email}
              style={{ width: "230px", height: "25px" }}
            />
          </div>
          <p className="error">{formerrors.email}</p>
          <div className="input">
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={handleChange}
              value={formvalues.password}
              style={{ width: "230px", height: "25px" }}
            />
          </div>
          <p className="error">{formerrors.password}</p>
        </div>
        {action === "Sign Up" ? (
          <div className="forgot">
            Already a user?{" "}
            <span onClick={() => setAction("Login")}>Log in</span>
          </div>
        ) : (
          <div className="forgot">
            No account?{" "}
            <span onClick={() => setAction("Sign Up")}>Create one</span>
          </div>
        )}
        <div className="submit-container">
          {action === "Login" ? (
            <button className="submit" onClick={handleLogin}>
              Login
            </button>
          ) : (
            <button className="submit" onClick={handleSignup}>
              Sign Up
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
