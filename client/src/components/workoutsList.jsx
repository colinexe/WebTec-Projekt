import { useState } from "react";
import { useEffect } from "react";
import React from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function workoutList() {
    <link rel="stylesheet" href="../styles.css"></link>
    const [loading,setLoading] = useState(true)
    const [workouts, setWorkouts] = useState()

    const navigate = useNavigate();
    const navigateWorkoutDetail =  (myWorkout) => {
        navigate("./workoutDetail", {state: {_id: myWorkout._id}});
        //var path = window.location.pathname;
    }

    async function fetchData(){
        const res = await fetch("/workouts/all");
        const data = await res.json();
        setWorkouts(data)
        setLoading(false)
    }

    useEffect(() =>{
        fetchData();
    },[])

    if(loading) return <div>Is Loading...</div>
    return (
    <>
    <h1 className="text-2xl font-bold flex justify-center items-center">Workouts</h1>
        
        <button className="bg-gray-200 bg-zinc-300 rounded-lg p-2 m-5 mx-auto w-4/12 block text-center">
            + New Workout
        </button>
        {
        workouts.sort((a, b) => new Date(b.workout_date) - new Date(a.workout_date)).map((el_of_workout, index) =>{
            return (
                
            <button  key={index} className="bg-gray-200 bg-zinc-300 rounded-lg p-2 m-5 mx-auto w-4/12 block text-left"
            onClick={() => navigateWorkoutDetail(el_of_workout)}
            >
            
            <p className="text-xl font-bold">
            {el_of_workout.workout_type}
            &nbsp;
            {String(el_of_workout.workout_date).substring(0,10)}
            </p>
            <p>Exercises: {el_of_workout.exercise.length}</p>
            <p>Dauer: {el_of_workout.duration} min</p>


            <div>
            {/*
            {el_of_workout.exercise.map((el_of_exercise, ind) =>{
                return(
                    <div key={ind}>

                    <span className="text-lg">exercise: {el_of_exercise.exercise_name}&nbsp;&nbsp;</span>
                     
                    <div>
                    {el_of_exercise.set.map((el_of_set, index_of_set) =>{
                        return(
                            <div key={index_of_set} className="indent-4">
                            <p>set {el_of_set.set_number}: {el_of_set.set_repetition} x {el_of_set.set_weight} kg</p>

                        </div>)
                    })}</div>
                        

                </div>)
            })}*/}
            </div>
            
            </button>
            )
           
        })
        }
    </>

    )
}
export default workoutList