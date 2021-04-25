import axios from "axios";
import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './MySignUp.css';
import {Link, useNavigate} from "@reach/router";
import {Button,Alert} from "react-bootstrap";
import { json } from "body-parser";

export default function SignUp(props) {
    const [signUpForm,setSignUpForm] = useState({username:"",passwd:""});
    const [showError,setShowError] = useState(false);
    const navigate = useNavigate();

    const handleSignUpFormChange = (e) =>{
        setSignUpForm({...signUpForm,[e.target.name]:e.target.value})
    } 
    const handleSummitForm = async (e) =>{
        e.preventDefault();
        try{
            await axios.post('http://localhost:8000/signup',signUpForm);
            navigate("/login");
        }catch(error){
            setShowError(true);
            setTimeout(()=>{
                setShowError(false);
            },2000);
            console.log(error);
            }
    }

    return (
        <div className="container">
            {showError &&<Alert variant="danger">
                username deja pris
            </Alert>}
            <div className="container2">
                <h3>S'inscrire</h3>
                <form action="/signup" method="post" onSubmit={handleSummitForm}>
                    <div className="form-group myForm">
                        <input type="text" name="username" className="form-control" placeholder="Nom d'utilisateur" onChange={handleSignUpFormChange} value={signUpForm.username}/>
                    </div>
                    <div className="form-group myForm">
                        <input type="password" name="passwd" className="form-control" placeholder="Mot de passe" onChange={handleSignUpFormChange} value={signUpForm.passwd}/>
                    </div>
                    <div className="myButton">
                        <input type="submit" className="btn btn-primary" value="S'inscrire"/>
                    </div>
                </form>
            </div>
        </div>
    );
}