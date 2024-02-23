import { useState } from "react";
import { useEffect } from "react";
import React from 'react'
import { Link } from "react-router-dom";
import SignUp from "./SignUp"
import LoginYac from "../assets/images/LoginYac.png"
import CookieBanner from "../assets/images/CookieBanner.png"
import CookieConsent from "react-cookie-consent";

function Login() {
    const [loading, setLoading] = useState(true);
    //const [gerichte, setGerichte] = useState();
    const [Login, setLogin] = useState(true);


    async function fetchData() {
        //const res = await fetch("/gerichte/all");
        //const data = await res.json();
        //setGerichte(data)
        setLoading(false)
    }


    useEffect(() => {
        fetchData();
    }, [])

    if (loading) return <div>Is Loading...</div>
    if (!Login) return <SignUp RegisterHandler={() => { setLogin(!Login) }} />
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
                <h1 className="text-2xl font-bold flex justify-center items-center p-color">Anmelden</h1>
                <form
                    action="/auth/login" method="POST">

                    <p>
                        <input size="3" type="text" id="username" name="username" required placeholder="Benutzername"
                            className="login-fields"></input>
                    </p>
                    <p>
                        <input size="3" type="password" id="password" name="password" required autoComplete="current-password" placeholder="Passwort"
                            className="login-fields"></input>
                    </p>
                    <p>
                        <button type="Submit" className="login-fields button-normal" id="login-button">Anmelden</button>
                    </p>
                </form>
                <p className="text-xs">
                    <button id="change-login-mode" onClick={() => { setLogin(!Login) }}>Konto erstellen</button>
                </p>
            </div>
            </div>
        </>

    )
}
export default Login