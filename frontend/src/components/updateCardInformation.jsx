import { useState, useEffect } from "react";
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";


function UpdateCardInformation() {
    const navigate = useNavigate()
    const { u, setU } = useContext(UserContext);
    console.log(u)
    useEffect(() => {
      console.log(u)
      if (u == null) {
        navigate("/login");
      }
    }, [u, navigate]);

    const [cardName, setCardName] = useState()
    const [cardNum, setCardNum] = useState()
    const [expDate, setExpDate] = useState()
    const [cvc, setCvc] = useState()
    const [zip, setZip] = useState()

    const handleSubmit = (e) => {  // form submit
        e.preventDefault()
        axios.post('http://localhost:5000/updateCardInformation', { u,cardName, cardNum, expDate, cvc, zip }) // sending json body to server for uploading to DB
        .then((result) => {
        console.log(result)  // showing response which came back from the server
        console.log("Successful")
        navigate("/userProfile")
        })
        .catch(err => console.log(err))
    }

    const [cardInfo, setCardInfo] = useState()
    useEffect(() => {
      axios.get(`http://localhost:5000/haveCardInfo?u=${u}`)
        .then((cInfo) => {
          setCardInfo(cInfo)
          console.log(cardInfo)
        })
        .catch((err) => console.log(err));    
    }, [cardInfo,u])

    return (
        <>
            <nav>
                <div className="nav-title" href="#">
                    Tax Calculator
                </div>
                <div className="nav-items" >
                    <div className="nav-item">
                        <Link to='/userProfile' className="nav-link">
                            My Profile
                        </Link>
                    </div>
                    <div className="nav-item">
                        <Link to='/login' className="nav-link" style={{ backgroundColor: '#FF0000' }} onClick={() => setU(null)}>
                            Log Out
                        </Link>
                    </div>
                </div>
            </nav>

            <div className='form-cont'>
                <form className="inc-form" onSubmit={handleSubmit}>

                    <div className="form-group row">
                        <label htmlFor="rent" className="col-sm-2 col-form-label">Name on Card:</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control inc-inp" id="cardName" name='cardName'  placeholder={(cardInfo)?(cardInfo.data.cardName):(<p>.</p>) } onChange={(e) => setCardName(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="medical" className="col-sm-2 col-form-label">Card Number:</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control inc-inp" id="cardNum" name='cardNum' placeholder={(cardInfo)?(cardInfo.data.cardNum):(<p>.</p>) } onChange={(e) => setCardNum(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="transport" className="col-sm-2 col-form-label">Expiration date:</label>
                        <div className="col-sm-10">
                            <input type="date" className="form-control inc-inp" id="expDate" name='expDate' placeholder={(cardInfo)?(cardInfo.data.expDate):(<p>.</p>) } onChange={(e) => setExpDate(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="conveyance" className="col-sm-2 col-form-label">CVC:</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control inc-inp" id="cvc" name='cvc' placeholder={(cardInfo)?(cardInfo.data.cvc):(<p>.</p>) } onChange={(e) => setCvc(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="incentive" className="col-sm-2 col-form-label">Zip:</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control inc-inp" id="zip" name="zip" placeholder={(cardInfo)?(cardInfo.data.zip):(<p>.</p>) } onChange={(e) => setZip(e.target.value)} />
                        </div>
                    </div>

                    <div className="result-row">
                        <button type="submit" className="btn btn-primary">Update</button>
                    </div>

                </form>
            </div>
        </>

    )
}

export default UpdateCardInformation; 