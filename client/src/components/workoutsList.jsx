import { useState } from "react";
import { useEffect } from "react";
import React from 'react'
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import FaqContent from "./faqContent";
import { Link } from "react-router-dom";


function workoutList() {
    <link rel="stylesheet" href="../styles.css"></link>
    const [loading, setLoading] = useState(true)
    const [workouts, setWorkouts] = useState()


    const navigate = useNavigate();
    const navigateWorkoutDetail = (myWorkout_id) => {
        console.log("in nav", myWorkout_id)
        navigate("./workoutDetail", { state: { _id: myWorkout_id } });
        //var path = window.location.pathname;
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const addWorkout = async (e) => {
        const res = await fetch("/workouts/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },  
        }
        );
        const data = await res.text();
        const myObj = JSON.parse(data)

        sleep(500).then(() => navigateWorkoutDetail(myObj._id))

    }

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
        <div className='top-margin'></div>
        <div>
        <Navigation />
        <div className="FAQ-visibility"><FaqContent />
        </div>
        </div>
            <p className="header1 flex justify-center items-center">Workouts</p>

            <button className="workout-list-tile text-center p p-color"
                onClick={() => { addWorkout() }}>
                + Neues Workout
            </button>
            {
                workouts.map((el_of_workout, index) => {
                    return (


                        <button key={index} className="workout-list-tile"
                            onClick={() => navigateWorkoutDetail(el_of_workout._id)}
                        >

                            <p className="header2">
                                {el_of_workout.workout_type}
                                &nbsp;
                                {String(el_of_workout.workout_date).substring(0, 10)}
                            </p>
                            <p className="p p-color">Übungen: {el_of_workout.exercise.length}</p>
                            <p className="p p-color">Dauer: {el_of_workout.duration} min</p>
                            <div>
                            </div>
                        </button>



                    )

                })
            }
            <div className="bottom-margin"></div>
        </>

    )
}
export default workoutList