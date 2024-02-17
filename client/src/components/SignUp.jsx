import { useState } from "react";
import { useEffect } from "react";
import React from 'react'
import { Link } from "react-router-dom";
import CookieConsent from "react-cookie-consent";

function SignUp({RegisterHandler}) {
    const [loading,setLoading] = useState(true)
    const [gerichte, setGerichte] = useState();
    const [workouts, setWorkouts] = useState()
    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    async function fetchData(){
        setLoading(false)
    }

    useEffect(() =>{
        fetchData();
    },[])

    if(loading) return <div>Is Loading...</div>
    return (
    <>
    <CookieConsent
                location="bottom"
                buttonText="Verstanden!"
                cookieName="myAwesomeCookieName2"
                style={{ background: "#2B373B" }}
                buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
                expires={150}
            >
                Diese Website nutzt essenzielle Cookies, um eine einwandfreie Funktion der Website zu ermöglichen.{" "}
                
            </CookieConsent>
    <div className="login-widget">
        <h1 className="text-2xl font-bold flex justify-center items-center">Registrieren</h1>
    <form
    action="/auth/register" method="POST">
        
        
        <input size="3" type="text" className="login-fields" id="email" name="email" required autoComplete="email" placeholder="E-Mail-Adresse"></input>
        
        <input size="3" type="text" className="login-fields" id="username" name="username" required placeholder="Benutzername"></input>
        
        <input size="3" type="password" className="login-fields" id="password" name="password" required autoComplete="current-password" placeholder="Passwort"></input>
        <button type="Submit" className="login-fields" id="login-button">Registrieren</button>
        
    </form> 
    <p className="text-xs p-color">Du hast ein Konto? &nbsp;
    <button onClick={RegisterHandler} id="change-login-mode">Melde dich an</button>
    </p>
    </div>
    </>

    )
} export default SignUp