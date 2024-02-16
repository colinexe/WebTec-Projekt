import { useState } from "react";
import { useEffect } from "react";
import React from 'react'
import Navigation from "./Navigation";
import FaqContent from "./faqContent.jsx";
import { Link } from "react-router-dom";

function Impressum() {
    const [loading, setLoading] = useState(true)
    const [workouts, setWorkouts] = useState()

    async function fetchData() {
        const res = await fetch("/workouts/all");
        const data = await res.json();
        setWorkouts(data)
        setLoading(false)
    }
    useEffect(() => {
        fetchData();
    }, [])

    if (loading) return (
        <div>
            <div>Is Loading...</div>
            <div>
            <Navigation />
            <div className="FAQ-visibility"><FaqContent /></div>
            </div>
        </div>
    )
    return (
        <>
        <div className='h-11'></div>
        <div>
        <Navigation />
        <div className="FAQ-visibility"><FaqContent />
        </div>
        </div>
            <p className="header1 flex justify-center items-center">Impressum</p>
            <p className="center-content p p-color">
            Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
      
            
        </>
    );
}
export default Impressum