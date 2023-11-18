//import {useState} from "react";
//import {Link} from 'react-router-dom';
//import axios from 'axios';
//import {useNavigate} from "react-router-dom";


function Notifications() {

    //const [showNotification, setShowNotification] = useState(false);
    //const [notificationMessage, setNotificationMessage] = useState('');
  
    //const handleShowNotification = (message) => {
    //  setNotificationMessage(message);
    //  setShowNotification(true);
  
    //  // Automatically close the notification after a certain time (e.g., 3 seconds)
    //  setTimeout(() => {
    //    setShowNotification(false);
    //  }, 3000);
    //};
  
    //const handleCloseNotification = () => {
    //  setShowNotification(false);
    //};

    return(
      <>
        {/*<nav>
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
                  <Link to='/login' className="nav-link active">
                      Login
                  </Link>      
              </div>
              <div className="nav-item">
                  <Link to='/signup' className="nav-link">
                      Sign Up
                  </Link>                     
              </div>
          </div>
        </nav>
        
    <div className="app-container">
      <h1></h1>
      <button onClick={() => handleShowNotification('Hello, this is a notification!')}>
        Show Notification
      </button>

      {showNotification && (
        <Notification message={notificationMessage} onClose={handleCloseNotification} />
      )}
    </div>*/}

      </>

    )
}

export default Notifications;