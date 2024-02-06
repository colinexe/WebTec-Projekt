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

    if (loading) return <div>Is Loading...</div>
    return (
        <>
        <div className='h-11'></div>
        <div>
        <Navigation />
        <div className="FAQ-visibility"><FaqContent />
        </div>
        </div>
            <h1 className="text-2xl font-bold flex justify-center items-center">Workouts</h1>

            <button className="workout-list-tile text-center"
                onClick={() => { addWorkout() }}>
                + New Workout
            </button>
            {
                workouts.map((el_of_workout, index) => {
                    return (


                        <button key={index} className="workout-list-tile"
                            onClick={() => navigateWorkoutDetail(el_of_workout._id)}
                        >

                            <p className="text-xl font-bold">
                                {el_of_workout.workout_type}
                                &nbsp;
                                {String(el_of_workout.workout_date).substring(0, 10)}
                            </p>
                            <p>Exercises: {el_of_workout.exercise.length}</p>
                            <p>Dauer: {el_of_workout.duration} min</p>
                            <div>
                            </div>
                        </button>



                    )

                })
            }
            <div className="h-16"></div>
        </>

    )
}
export default workoutList