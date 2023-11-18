//import {useState} from 'react'
import "bootstrap/dist/css/bootstrap.css" // updated
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from "./components/Signup.jsx"
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import AddProfileInformation from './components/addProfileInformation.jsx';
import IncomeTaxCalc from "./components/IncomeTaxCalc.jsx";
import AuthZone from "./components/AuthZone.jsx";
import ViewUsers from "./components/viewUsers.jsx";
import UserProfile from "./components/userProfile.jsx";
import UpdateProfile from "./components/updateProfile.jsx";
import CalculateLandTax from "./components/calculateLandTax.jsx";
import LandCriteria from "./components/landcriteria.jsx";
import AdminDashboard from "./components/admindashboard.jsx";


function App() {
  return ( 
    // redirecting to different components/page based on route
    <BrowserRouter> 
      <Routes>
        <Route path='/' element={<Home/>} >  </Route>        
        <Route path='/signup' element={<Signup/>} >  </Route>
        <Route path='/login' element={<Login/>} >  </Route>  
        <Route path='/home' element={<Home/>} >  </Route>
        <Route path='/addProfileInformation' element={<AddProfileInformation/>} >  </Route>
        <Route path='/IncomeTaxCalc' element={<IncomeTaxCalc/>} >  </Route>
        <Route path='/AuthZone' element={<AuthZone/>} >  </Route>
        <Route path='/viewUsers' element={<ViewUsers/>} >  </Route>
        <Route path='/userProfile' element={<UserProfile/>} >  </Route>
        <Route path='/updateProfile' element={<UpdateProfile/>} >  </Route>
        <Route path='/calculatelandtax' element={<CalculateLandTax/>} >  </Route>
        <Route path='/landcriteria' element={<LandCriteria/>} >  </Route>
        <Route path='/admindashboard' element={<AdminDashboard/>} >  </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
