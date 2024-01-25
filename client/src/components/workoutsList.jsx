import { useState } from "react";
import { useEffect } from "react";
import React from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function workoutList() {
    <link rel="stylesheet" href="../styles.css"></link>
    const [loading, setLoading] = useState(true)
    const [workouts, setWorkouts] = useState()
    const [created_id, setCreatedId] = useState()


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
        //var _id = new mongoose.Types.ObjectId()
        //console.log(_id)
        const res = await fetch("/workouts/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                workout_type: "Test"
                //_id: _id  
            }),
        }
        );
        const data = await res.text();
        const myObj = JSON.parse(data)
        setCreatedId(myObj)

        console.log("create done", myObj._id);


        sleep(5000).then(() => navigateWorkoutDetail(myObj._id))

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
            <h1 className="text-2xl font-bold flex justify-center items-center">Workouts</h1>

            <button className="workout-list-tile"
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