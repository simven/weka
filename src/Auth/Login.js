import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "@reach/router";
import {Button} from "react-bootstrap";
import { json } from "body-parser";
import { authContext } from "../Context/authContext";

export default function Login(props) {
    const [user,setUser] = useContext(authContext);
    const navigate = useNavigate();
    const [loginForm,setLoginForm] = useState({username:"",passwd:""});
    const handleLoginFormChange = (e) =>{
        setLoginForm({...loginForm,[e.target.name]:e.target.value})
    } 
    const handleSummitForm = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:8000/login',loginForm);
            localStorage.setItem("token",response.data.userToken);
            axios.defaults.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
            const meResponse = await axios.get("http://localhost:8000/me");
            setUser({isLoggedIn:true,user:meResponse.data.me});
            navigate("/");
        }catch(error){console.log(error);}
    }

    return (
        <div className="container">
            <div className="container2">
                <h3>Connexion</h3>
                    <form action="/login" method="post" onSubmit={handleSummitForm}>
                    <div className="form-group myForm">
                        <input type="text" name="username" className="form-control" placeholder="Nom d'utilisateur" onChange={handleLoginFormChange} value={loginForm.username}/>
                    </div>
                    <div className="form-group myForm">
                        <input type="password" name="passwd" className="form-control" placeholder="Mot de passe" onChange={handleLoginFormChange} value={loginForm.passwd}/>
                    </div>
                    <div className="myButton">
                        <input type="submit" className="btn btn-primary" value="Connexion"/>
                    </div>
                </form>
            </div>
        </div>
    );
}
