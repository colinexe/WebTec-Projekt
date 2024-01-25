import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navigation() {

    const navigate = useNavigate();
    const navigateGerichtList = () => {
        navigate("/");
    }
    const navigateGerichtForm = () => {
        navigate("./gerichtForm");

    }
    const navigateWorkoutList = () => {
        navigate("./workoutList");
    }
    const navigateFAQ = () => {
        navigate("./FAQ");
    }
    


    return (
    <div>
        <div>Eure Fitnessapp</div>
        <div className="nav-bar">
            <button id="GerichtList" onClick={navigateGerichtList} className="nav-icon">Home</button>
            <button id="GerichtForm" onClick={navigateGerichtForm} className="nav-icon">Gerichte</button>
            <button id="WorkoutList" onClick={navigateWorkoutList} className="nav-icon">Workouts</button>
            <button id="FAQ" onClick={navigateFAQ} className="nav-icon">FAQ</button>
        </div>
    </div>

    )
}
export default Navigation