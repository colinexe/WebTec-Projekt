import { useState } from "react";
import { useEffect } from "react";
import React from 'react'
import { Link } from "react-router-dom";
import SignUp from "./SignUp"
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
                style={{ background: "#2B373B" }}
                buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
                expires={150}
            >
                Diese Website nutzt essenzielle Cookies, um eine einwandfreie Funktion der Website zu ermöglichen.{" "}
                
            </CookieConsent>
            <div className="login-widget">
                <h1 className="text-2xl font-bold flex justify-center items-center">Anmelden</h1>
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
                        <button type="Submit" className="login-fields" id="login-button">Anmelden</button>
                    </p>
                </form>
                <p className="text-xs">
                    <button id="change-login-mode" onClick={() => { setLogin(!Login) }}>Konto erstellen</button>
                </p>
            </div>
        </>

    )
}
export default Login