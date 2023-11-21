
import { useState } from "react";
import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {UserContext} from "../userContext";

function Signup() {
  const {setU} = useContext(UserContext);
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()

  const handleSubmit = (e) => {  // form submit
    e.preventDefault()
    axios.post('http://localhost:5000/signup', { firstName, lastName, email, password }) // sending json body to server for uploading to DB
      .then((result) => {
        console.log(result)  // showing response which came back from the server
        setU(email)
        navigate("/addProfileInformation")  // go to login page after registering
      })

      .catch(err => console.log(err))
  }

  return (
    <>
      <nav>
        <div className="nav-title" href="#">
            Tax Calculator
        </div>
        <div className="nav-items" >
            <div className="nav-item">
                <Link to='/' className="nav-link">
                    Home
                </Link>      
            </div>
            <div className="nav-item">
                <Link to='/login' className="nav-link">
                    Login
                </Link>      
            </div>
            <div className="nav-item">
                <Link to='/signup' className="nav-link active">
                    Sign Up
                </Link>                     
            </div>
        </div>
      </nav>

      <div className="container-box">
        <div className="box">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName">First Name:  </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                //  value={formData.firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name: </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                //  value={formData.lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:   </label>
              <input
                type="email"
                id="email"
                name="email"
                //  value={formData.email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                id="password"
                name="password"
                //  value={formData.password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">
              Sign Up
            </button>
          </form>
          <p>Already Have an Account?</p>
          <Link to='/login' className="btn btn-default w-100 bg-light rounded-0 text-decoration-none">
            Login
          </Link>
        </div>      
      </div>      
    </>



  )
}


export default Signup;    