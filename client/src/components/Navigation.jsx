import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navigation() {

    const navigate = useNavigate();
    const navigateGerichtList = () => {
        navigate("/");
        var path = window.location.pathname;
        var page = path.split("/").pop();
        gerichtListActive(page);
    }
    const navigateGerichtForm = () => {
        navigate("./gerichtForm");
        var path = window.location.pathname;
        var page = path.split("/").pop();
        gerichtFormActive(page);
    }
    const navigateWorkoutList = () => {
        navigate("./workoutList");
        var path = window.location.pathname;
        var page = path.split("/").pop();
        exerciseFormActive(page);
    }
    

    //Unschöne Lösung der Button Klasse -> refresh auf /gerichtForm rendert "Home" als aktiven Button (weiter unten im return implementiert)
    const gerichtListActive = (page) => {
        if (page = "/"){
            document.getElementById("GerichtList").className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";       
            document.getElementById("GerichtForm").className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded";
            document.getElementById("WorkoutList").className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded";
        }
    }
    const gerichtFormActive = (page) => {
        if (page = "gerichtForm"){
            document.getElementById("GerichtForm").className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";       
            document.getElementById("GerichtList").className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded";
            document.getElementById("WorkoutList").className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded";
        }
    }
    const exerciseFormActive = (page) => {

        if (page = "workoutList"){
            document.getElementById("WorkoutList").className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";       
            document.getElementById("GerichtList").className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded";
            document.getElementById("GerichtForm").className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded";
        }
    }

    /*window.onload = function() {
        var path = window.location.pathname;
        var page = path.split("/").pop();
        console.log(page);
        //document.getElementById("GerichtList").className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";       
        //document.getElementById("GerichtForm").className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded";
    }*/
    return (
    <div>
        <div className="bg-red-200">Eure Fitnessapp
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button id="GerichtList" onClick={navigateGerichtList} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button id="GerichtForm" onClick={navigateGerichtForm} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Essens Form</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button id="WorkoutList" onClick={navigateWorkoutList} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Workouts</button>
        </div>
    </div>

    )
}
export default Navigation