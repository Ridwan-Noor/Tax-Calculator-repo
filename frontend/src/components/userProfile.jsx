import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'; // Import Link for navigation
import income_tax_image from "../images/incomeTax.jpg";
import land_tax_image from "../images/landTax.jpg";
import road_tax_image from "../images/roadTax.jpg";

function UserProfile() {
  const [users, setUsers] = useState(null); // Set initial state to null
  const [email, setEmail] = useState("aritra@gmail"); // Set the default email address

  useEffect(() => {
    setEmail("aritra@gmail") // remove after setEmail is used

    // Fetch user data based on the provided email address
    axios
      .get(`http://localhost:5000/userProfile?email=${email}`)
      .then((user) => {
        console.log("User data from API:", user.data);
        setUsers(user.data);
      })
      .catch((err) => console.log(err));
  }, [email]);

  return (


    <>
      
      <nav>
          <div className="nav-title" href="#">
              Tax Calculator
          </div>
          <div className="nav-items" >
              <div className="nav-item">
                  <Link style={{backgroundColor:'#32CD32'}}to='/userProfile' className="nav-link">
                      My Profile
                  </Link>      
              </div>
              <div className="nav-item">
                  <Link to='/' className="nav-link">
                      Home
                  </Link>      
              </div>
              <div className="nav-item">
                  <Link to='/notifications' className="nav-link">
                      Notifications
                  </Link>      
              </div>
              <div className="nav-item">
                  <Link to='/' className="nav-link">
                      Log Out
                  </Link>                     
              </div>
          </div>
      </nav>


    <div className="container-fluid user-home-cont1">
      <div className="row justify-content-center align-items-center">
        {users ? (
          <div className="card col-md-6">
            <div className="card-body">
              <h5 className="card-title text-center mb-4">User Profile</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>First Name:</strong> {users.firstName}
                </li>
                <li className="list-group-item">
                  <strong>Last Name:</strong> {users.lastName}
                </li>
                <li className="list-group-item">
                  <strong>Email:</strong> {users.email}
                </li>
                <li className="list-group-item">
                  <strong>Sex:</strong> {users.sex}
                </li>
                <li className="list-group-item">
                  <strong>National ID Number:</strong> {users.nid_number}
                </li>
                <li className="list-group-item">
                  <strong>Profession:</strong> {users.profession}
                </li>
                <li className="list-group-item">
                  <strong>Date of Birth:</strong> {users.dob}
                </li>
              </ul>
              </div>
            <div className="card-footer text-center">
              <Link to="/updateProfile" className="btn btn-primary">
                Update Profile
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>
    </div>

    <div className='user-home-container'>
                <div className='user-tax-types'>
                    <div className='user-tax-type'>
                        
                        <img src={income_tax_image} alt="income-tax"  />
                        <Link to='/IncomeTaxCalc' className='user-overlay'>
                                Calculate <br/> Income Tax     
                        </Link>
                    </div>
                    <div className='user-tax-type'>
                        <img src={land_tax_image} alt="income-tax"  />
                        <Link to='/calculatelandtax' className='user-overlay'>
                            Calculate <br/> Land Tax
                        </Link>
                    </div>
                    <div className='user-tax-type'>
                        <img src={road_tax_image} alt="income-tax"  />
                        <Link to='/' className='user-overlay'>
                            Calculate <br/> Road Tax
                        </Link>
                    </div>
                </div>
            </div>

    </>
  );
}

export default UserProfile;



