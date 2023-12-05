import { useState } from "react";
import { useEffect } from "react";
import React from 'react'
import { Link } from "react-router-dom";

function workoutList() {
    const [loading,setLoading] = useState(true)
    const [workouts, setWorkouts] = useState()

    async function fetchData(){
        const res = await fetch("/workouts/all");
        const data = await res.json();
        setWorkouts(data)
        console.log(data[1].exercise[0].set)
        setLoading(false)
    }

    useEffect(() =>{
        fetchData();
    },[])

    if(loading) return <div>Is Loading...</div>
    return (
    <>
        {
        workouts.map((el_of_workout, index) =>{
            return (
            <div  key={index} className="flex flex-row">


            {el_of_workout.workout_type}
            &nbsp;
            {String(el_of_workout.workout_date).substring(0,10)}

            &nbsp;&nbsp;&nbsp;&nbsp;
                
            {el_of_workout.exercise.map((el_of_exercise, ind) =>{
                return(
                    <div key={ind} className="flex flex-row">

                    <div className="indent-10">exercise: {el_of_exercise.exercise_name}&nbsp;&nbsp;</div>
                    {el_of_exercise.set.map((el_of_set, index_of_set) =>{
                        return(
                            <div key={index_of_set} className="flex flex-row">
                            <div> set {el_of_set.set_number}: {el_of_set.set_weight} x {el_of_set.set_repetition} &nbsp;&nbsp;</div>
                            <div> 

                            &nbsp;&nbsp;
                            </div>
                        </div>)
                    })}
                        

                </div>)
            })}

            </div>)
           
        })
        }
    </>

    )
}
export default workoutList