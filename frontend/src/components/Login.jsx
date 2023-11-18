import {useState} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate() 

    const handleSubmit = (e) => {  // form submit
        e.preventDefault()
        axios.post('http://localhost:5000/login', {email, password}) // sending json body to server for validation
        .then( (result) => { 
            console.log(result)  // showing response which came back from the server
            if(result.data === "Success"){
                navigate("/userProfile") // go to home page after login
            }
              
        })
        .catch(err => console.log(err))
    }

    return(
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
        <div className="container-box">
          <div className="box">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email">Email:   </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                //  value={formData.email}
                  onChange={(e)=> setEmail(e.target.value)}
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
                  onChange={(e)=> setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit">
                Login
              </button>
            </form>
            <p>Create an account:</p>
            <Link to='/signup' className="btn btn-default w-100 bg-light rounded-0 text-decoration-none">
                Sign Up
            </Link>
          </div>
        </div>      
      </>

    )
}

export default Login;