import React, { useState, useEffect} from 'react';
import './Login.css';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [action, setAction] = useState('Login');
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  //const [email, setemail] = useState("");
  //const [password, setpassword] = useState("");
  const [loginstatus,setloginstatus]=useState("");
  const [inputs, setInputs] = useState({
    Cus_ID:'',
    name: '',
    dob: '',
    address:'',
    contactNo: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async () => {
    try {
      // Make a POST request to register the user
      const response = await axios.post('http://localhost:3001/register', inputs);
      const userId = response.data;
      // Handle registration success, you can set a success message or navigate to another page
      console.log('Registration successful:',userId);
      //navigate(`/pageprofile/${userId}`);
      alert("succesfully registered");
    } catch (error) {
      // Handle registration error, show an error message, or set an error state
      console.error('Registration error:', error);
    }
  };
  
  const handleLogin = async () => {
    try {
      // Make a POST request to log in the user
      const response = await axios.post('http://localhost:3001/login', inputs);
      const userId = response.data.userId;
      //localStorage.setItem('userId', userId); 
      console.log('Login response:', response.data); 
    // Handle login success, you can navigate to another page or set a logged-in state
    if (userId) {
      console.log("navigating")
      localStorage.setItem('userData', JSON.stringify(response.data));
      localStorage.setItem('userId',userId)
      navigate(`/pageprofile/${userId}`);      
    }else{
      alert("Invalid Email or Password")
    }
    } catch (error) {
      // Handle login error, show an error message, or set an error state
      console.error('Login error:', error);
    }
  };


  return (
    <div>
      <div className='header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        {action === 'Login' ? null : (
        <>
          <div className='input'>
            <input
              type='text'
              name='name'
              placeholder='name'
              onChange={handleChange}
            />
          </div>
          <div className='input'>
            <input
              type='text'
              name='dob'
              placeholder='date of birth'
              onChange={handleChange}
            />
          </div>
          <div className='input'>
            <input
              type='text'
              name='address'
              placeholder='address'
              onChange={handleChange}
            />
          </div>
          <div className='input'>
            <input
              type='tel'
              name='contactNo'
              placeholder='phone no'
              pattern='[0-9]{10}'
              onChange={handleChange}
            />
          </div>
        </>
        )}
        <div className='input'>
          <input
            type='email'
            name='email'
            placeholder='email'
            autoComplete='email'
            onChange={handleChange}
          />
        </div>
        <div className='input'>
          <input
            type='password'
            name='password'
            placeholder='password'
            onChange={handleChange}
          />
        </div>
      </div>
      {action === 'Sign Up' ? (
        <div className='forgot'>
          Already a user?{' '}
          <span onClick={() => setAction('Login')}>Log in</span>
        </div>
      ) : (
        <div className='forgot'>
          No account?{' '}
          <span onClick={() => setAction('Sign Up')}>Create one</span>
        </div>
      )}
      <div className='submit-container'>
        {action === 'Login' ? (
          <button className='submit' onClick={handleLogin}>
            Login
          </button>
        ) : (
          <button className='submit' onClick={handleSignup}>
            Sign Up
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;




/*
const Login = () => {
  const [action, setAction] = useState('Login');
  const [inputs, setInputs] = useState({
    name: '',
    dob: '',
    address:'',
    comtactNo: '',
    email: '',
    storedPassword: '',
  });
  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async () => {
    try {
      // Make a POST request to register the user
      const response = await axios.post('http://localhost:3001/register', inputs);
      const userId = response.data.userId;
      
      // Handle registration success, you can set a success message or navigate to another page
      console.log('Registration successful');
      navigate(`/pageprofile/${userId}`);
    } catch (error) {
      // Handle registration error, show an error message, or set an error state
      console.error('Registration error:', error);
    }
  };

  const handleLogin = async () => {
    try {
      // Make a POST request to log in the user
      const response = await axios.post('http://localhost:3001/login', inputs);
      const userId = response.data.userId; 
    // Handle login success, you can navigate to another page or set a logged-in state
    if (userId) {
      navigate(`/pageprofile/${userId}`);
    }
    } catch (error) {
      // Handle login error, show an error message, or set an error state
      console.error('Login error:', error);
    }
  };


import React from 'react';
import './Login.css'
import { useState } from 'react';
import {Link,useNavigate} from 'react-router-dom'
import axios from "axios"
const Login = () => {
    const [action,setAction]=useState("Login");
    const [inputs,setInputs]=useState({
        username:"",
        email:"",
        password:""
      })
      const [err,setError] = useState(null);
      const navigate = useNavigate();
    
      const handleChange = e=>{
        setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
      }
      const handleSubmit= async (e) =>{
        e.preventDefault()
        
      }
  return (        
        <div >
            <div className='header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                {action==="Login"?<div></div>:<div className='input'>
                    <input type="text" placeholder="name"/>
                </div>}
                
                <div className='input'>
                    <input type="email" placeholder="email"/>
                </div>
                <div className='input'>
                    <input type="password" placeholder="password"/>
                </div>
                </div>
                {action==="Sign Up"?<div className="forgot">Already a user?
                    <span onClick={()=>{setAction("Login")}}> log in</span></div>:<div className="forgot">No account?
                    <span onClick={()=>{setAction("Sign Up")}}> create one</span>
                </div>}                
                <div className='submit-container'>                   
                    <button className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</button>
                    <button className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}><Link to="/pageprofile" className='link' >Login</Link></button>
                </div>          
        </div>
    
  )
}

export default Login*/
