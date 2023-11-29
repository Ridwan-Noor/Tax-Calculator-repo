import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';

function ChangePassword() {
  const [email, setEmail] = useState("");
  const [securityKey, setSecurityKey] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Check security key
    axios.post("http://localhost:5000/securityKey", { email, key: securityKey })
      .then((response) => {
        // Security key is correct
        if (response.data.message === "Security key saved successfully") {
          // Change password
          axios.post(`http://localhost:5000/changePassword/${email}`, { password: newPassword })
            .then(() => {
              navigate("/login");
            })
            .catch((error) => {
              console.error("Error changing password:", error);
              setError("An error occurred while changing the password.");
            });
        } else {
          // Incorrect security key
          setError("Incorrect Security Key");
        }
      })
      .catch((error) => {
        console.error("Error checking security key:", error);
        setError("An error occurred while checking the security key.");
      });
  };

  return (
    <>
                <nav>
                <div className="nav-title" href="#">
                    Tax Calculator
                </div>
                <div className="nav-item">
                  <Link to='/' className="nav-link">
                      Home
                  </Link>      
              </div>

                </nav>

    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <form style={{padding:'60px 50px', backgroundColor: "#f0f0f0", borderRadius: "8px", textAlign: "center" }} onSubmit={handleFormSubmit}>
        <h2 style={{ marginBottom: "30px", color: "#2196F3" }}>Change Password</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <label style={{ marginRight: "10px" }}>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ marginLeft: "10px", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} required />
        </label>
        <label style={{ marginRight: "10px" }}>
          Security Key:
          <input type="text" value={securityKey} onChange={(e) => setSecurityKey(e.target.value)} style={{ marginLeft: "10px", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} required />
        </label>
        <label style={{ marginRight: "10px" }}>
          New Password:
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={{ marginLeft: "10px", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} required />
        </label>
        <button type="submit" style={{ backgroundColor: "#2196F3", color: "#fff", padding: "10px 20px", borderRadius: "4px", border: "none", cursor: "pointer" }}>Change Password</button>
      </form>
    </div>
    </>
  );
  
  
}


export default ChangePassword;
