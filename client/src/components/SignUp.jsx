import { useState } from "react";
import { useEffect } from "react";
import React from 'react'
import { Link } from "react-router-dom";
import LoginYac from "../assets/images/LoginYac.png"
import CookieBanner from "../assets/images/CookieBanner.png"
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
                style={{
                    background: "linear-gradient(to bottom, transparent , grey)",
                    textShadow: "2px 2px black",
                }}
                buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
                expires={150}


            >
                <div className=" flex content-end m-0">
                    <span className="pt-24">Diese Website nutzt essenzielle Cookies, um eine einwandfreie Funktion der Website zu ermöglichen.{ }</span>
                    <div className="relative">
                        <img src={CookieBanner} alt="Logo" width="40%" height="40%" className="only-desktop" />
                    </div>
                </div>
            </CookieConsent>

            <div className="flex justify-center">
                <img src={LoginYac} alt="Logo" width="15%" height="15%" className="only-desktop"/>
                <img src={LoginYac} alt="Logo" width="80%" height="80%" className="only-mobile"/>
            </div>
            <div className="flex justify-center">
    <div className="login-widget">
        <h1 className="text-2xl font-bold flex justify-center items-center p-color">Registrieren</h1>
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
    </div>
    </>

    )
} export default SignUp