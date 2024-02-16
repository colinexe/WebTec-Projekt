import { useState } from "react";
import { useEffect } from "react";
import React from 'react'
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import FaqContent from "./faqContent";
import { Link } from "react-router-dom";

function HomeScreen() {
    const [loading, setLoading] = useState(true)
    const [today_workout, setTodayWorkout] = useState()

    const navigate = useNavigate();
    const navigateWorkoutDetail = (myWorkout_id) => {
        console.log("in nav", myWorkout_id)
        navigate("/workoutList/workoutDetail", { state: { _id: myWorkout_id } });
        //var path = window.location.pathname;
    }

    async function fetchData() {
        const res = await fetch("/workouts/thisDate");
        const data = await res.json();
        setTodayWorkout(data)
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
            <p className="header1 flex justify-center items-center">Heute</p>
            <div>
                <p className="center-content header2">Today's Workouts</p>
                {
                    today_workout.length === 0 ? (
                        <p className="workout-list-tile text-center text-gray-400">Keine Daten gefunden</p>
                    ) : (
                        today_workout.map((el_of_workout, index) => (
                            <button key={index} className="workout-list-tile" onClick={() => navigateWorkoutDetail(el_of_workout._id)}>
                                <p className="header2">
                                    {el_of_workout.workout_type}
                                    &nbsp;
                                    {String(el_of_workout.workout_date).substring(0, 10)}
                                </p>
                                <p className="p p-color">Exercises: {el_of_workout.exercise.length}</p>
                                <p className="p p-color">Dauer: {el_of_workout.duration} min</p>
                            </button>
                        ))
                    )
                }
            </div>
            <div>
                <p className="center-content header2">Daily Journal</p>
                <form>
                    <textarea className="workout-list-tile p p-color" defaultValue={"Daily Journal"}></textarea>
                </form>
            </div>
        </>

    )
}
export default HomeScreen