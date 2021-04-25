import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { Router, useNavigate } from "@reach/router";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Nav, Navbar, Spinner } from 'react-bootstrap';
import './App.css';
import Home from "./Home/Home";
import Quizzes from "./Quiz/Quizzes";
import FormQuizz from "./Quiz/FormQuizz";
import Questions from "./Questions/Questions";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import {authContext} from "./Context/authContext";
import { token } from "morgan";

export default function App() {
    axios.defaults.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
    const [user,setUser] = useState({
        isLoggedIn:false,
        user:{id_person:"",username:""}
    });
    const [isLoading,setIsLoading] = useState(false);
    const AuthContext = authContext;
    const getMe = async ()=>{
        try {
            setIsLoading(true);
            const response = await axios.get("http://localhost:8000/me");
            setUser({isLoggedIn:true,user:response.data.me});
            setIsLoading(false);
        } catch (error) {
        setIsLoading(false);}
        
    }
    const handleDisconnect = ()=>{
        localStorage.removeItem("token");
        setUser({isLoggedIn : false,user:{id_person:"",username:""}});
    }
    useEffect(()=>{
        getMe();
    },[])
    
    return (
        <AuthContext.Provider value = {[user,setUser]}>

        { 
            !isLoading ?     
        (<div className="App">
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">Accueil</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/quizzes">Quiz</Nav.Link>
                </Nav>
                {
                    user.isLoggedIn ? (
                        <>
                            <Form inline>
                                <Nav className = "user-nav-item">Bonjour {user.user.username}</Nav>
                            </Form>
                            <Form inline>
                                <Nav.Link href="/create">Créer un formulaire</Nav.Link>
                            </Form>                            
                            <Form inline>
                                <Nav.Link href="/edit">Modifier un formulaire</Nav.Link>
                            </Form>
                            <Form inline>
                                <Nav.Link onClick={handleDisconnect}>Deconnexion</Nav.Link>
                            </Form>
                        </>
                    ) : (
                        <>
                            <Form inline>
                                <Nav.Link href="/login">Connexion</Nav.Link>
                            </Form>
                            <Form inline>
                                <Nav.Link href="/signup">S'inscrire</Nav.Link>
                            </Form>
                        </>)
                }
            </Navbar>
            <Router>
                <Home path = "/"/>
                <Quizzes path = "/quizzes"/>
                <Questions path = "/quiz/:quizId"/>
                <Login path = "/login"/>
                <SignUp path = "/signup"/>
                <FormQuizz path = "/create"/>
            </Router>
        </div>) : (<Spinner animation="border" />)
        }
        </AuthContext.Provider>
    );
}
