import { useState } from "react";
import { useEffect } from "react";
import {useLocation} from 'react-router-dom';
import "../styles.css";
import React from 'react';

function workoutDetail(elem) {
    <link rel="stylesheet" href="../styles.css"></link>
    const [loading,setLoading] = useState(true)
    const [workouts, setWorkouts] = useState()
    const [myWorkout, setMyWorkout] = useState()

    const location = useLocation();
    const myId= location.state._id

    const [modal, setModal] = useState(false);



    const toggleModal = (exercise) => {
        let myExercise = document.getElementById(exercise);
    if (myExercise.classList.contains('hidden')){
        myExercise.classList.remove('hidden');
    } else {
        myExercise.classList.add('hidden') ;
    }}

    {/*
    const buildModalBody = (id) => {
        document.getElementById(id).innerHTML =  `

        <div onClick={toggleModal} className="overlay"></div>
        <div className="modal-content">
          <h2>Edit Exercise</h2>
          <input type="text" placeholder={el_of_exercise.exercise_name}></input>
            

            {el_of_exercise.set.map((el_of_set, index_of_set) => 
            <div key={index_of_set}>
            <p>{el_of_set.set_weight}</p>
            </div>
            )} 


          <button className="close-modal" onClick={toggleModal(el_of_exercise.exercise_name)}> X </button>
        </div> `
        ;
    }*/}

    async function fetchData(){
        const res = await fetch("/workouts/all");
        const data = await res.json();
        setWorkouts(data)
        setLoading(false)
        const myworkout = findId(data, myId)
        setMyWorkout(await myworkout)
    }


    async function findId(data, idToLookFor) {
        var workoutArray = data;
        for (var i = 0; i < workoutArray.length; i++) {
            if (workoutArray[i]._id == idToLookFor) {
                var myWorkout = workoutArray[i];
                return(myWorkout);
            }
        }
    }

    

    useEffect(() =>{
        fetchData();
    },[])

    if(loading) return <div>Is Loading...</div>
    return (
    <>
    <h1 className="text-2xl font-bold flex justify-center items-center">WorkoutDetail</h1>
    <div className="bg-gray-200 bg-zinc-300 rounded-lg p-2 m-5 mx-auto w-4/12 block text-left">
            <p className="text-xl font-bold">
            {myWorkout.workout_type}
            &nbsp;
            {String(myWorkout.workout_date).substring(0,10)}
            </p>
            {myWorkout.exercise.map((el_of_exercise, ind) =>{
                return(
                    <div key={ind}>

                    <span className="text-lg">exercise: {el_of_exercise.exercise_name}&nbsp;&nbsp;</span>
                    <button className="btn-modal rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => toggleModal(el_of_exercise.exercise_name)}>
                        Edit {el_of_exercise.exercise_name}
                    </button>
                    
                    <div>
                    
                     {/* MODAL */}
                        <div  id={el_of_exercise.exercise_name} className="hidden">
                            <div onClick={() => toggleModal(el_of_exercise.exercise_name)} className="overlay"></div>
                            <div className="modal-content">
                                <h2>Edit Exercise</h2>
                            
                            <div>Name: <input type="text" placeholder={el_of_exercise.exercise_name}></input></div> 
                            

                            {el_of_exercise.set.map((el_of_set, index_of_set) => 
                            <div key={index_of_set}>
                            <div>
                                <span className="inline-block w-12">Set {el_of_set.set_number}:&nbsp;</span>
                                 
                                <input size="3" type="text" placeholder={el_of_set.set_repetition}></input>
                                &nbsp;X&nbsp;
                                <input size="3" type="text" placeholder={el_of_set.set_weight}></input> 
                                &nbsp;kg
                            </div>
                            </div>
                            )} 


                        <button className="close-modal" onClick={() => toggleModal(el_of_exercise.exercise_name)}> X </button>
                        </div>
                      </div>



                    </div>
                     
                    <div>
                    {el_of_exercise.set.map((el_of_set, index_of_set) =>{
                        return(
                            <div key={index_of_set} className="indent-4">
                            <p>set {el_of_set.set_number}: {el_of_set.set_repetition} x {el_of_set.set_weight} kg</p>

                        </div>)
                    })}</div>
                        

                </div>)
            })}</div>
    </>

    )
}
export default workoutDetail