import { useState } from "react";
import { useEffect } from "react";
import {useLocation} from 'react-router-dom';
import "../styles.css";
import React from 'react';

function workoutDetail(elem) {
    <link rel="stylesheet" href="../styles.css"></link>
    const [loading,setLoading] = useState(true)
    const [workouts, setWorkouts] = useState()
    const [my_set_repetition, setMySetRepetition] = useState([])
    const [my_set_weight, setMySetWeight] = useState([])
    const [exercise_index, setExerciseIndex] = useState()
    const [myWorkout, setMyWorkout] = useState()
    const [exercise_name, setExerciseName] = useState()

    const [updated_exercise, setUpdatedExercise] = useState()

    const location = useLocation();
    const myId= location.state._id

    const [modal, setModal] = useState(false);



    const toggleModal = (exercise) => {
        let myExercise = document.getElementById(exercise);
    if (myExercise.classList.contains('hidden')){
        myExercise.classList.remove('hidden');
    } else {
        myExercise.classList.add('hidden') ;
    }};

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

    const updateSetWeight = (update, index) =>{
        my_set_weight[index] = parseInt(update)
    }

    const updateSetRepetition = (update, index) =>{
        my_set_repetition[index] = parseInt(update)
    }

    const setDefaultVariables = (e) =>{
        setExerciseName(e.exercise_name)
        for (let i = 0, len = e.set.length; i < len; i++){
            let set_repetition = e.set[i].set_repetition
            my_set_repetition.push(set_repetition)
        }
        for (let i = 0, len = e.set.length; i < len; i++){
            let set_weight = e.set[i].set_weight
            my_set_weight.push(set_weight)
        }
    }

    const changeName = async (e, ind) =>{
        setExerciseName([...exercise_name, {exercise_index: ind, exercise_name: exercise_name, _id: e._id, my_set_repetition: my_set_repetition,
            my_set_weight: my_set_weight}])
        
        const res = await fetch("/workouts/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                exercise_index: ind,
                exercise_name: exercise_name,
                my_set_repetition: my_set_repetition,
                my_set_weight: my_set_weight,
                _id: e._id
            }),
        });
    console.log(JSON.stringify({
        exercise_index: ind,
        exercise_name: exercise_name,
        my_set_repetition: my_set_repetition,
        my_set_weight: my_set_weight,
        _id: e._id
    }))
    //console.log(my_set_repetition)
    console.log("post complete")
        
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
                        onClick={() => {console.log(el_of_exercise.set), toggleModal(el_of_exercise.exercise_name), setDefaultVariables(el_of_exercise)}}>
                        Edit {el_of_exercise.exercise_name}
                    </button>
                    
                    <div>
                    
                     {/* MODAL */}
                        <div  id={el_of_exercise.exercise_name} className="hidden">
                            <div onClick={() => {toggleModal(el_of_exercise.exercise_name), window.location.reload()}} className="overlay"></div>
                            <div className="modal-content">
                                <div className="text-lg font-semibold">
                                
                                
                                <h2>Edit Exercise</h2>
                                </div>
                            <div>Name: 
                                <input type="text" defaultValue={el_of_exercise.exercise_name}
                                onChange={(e) => setExerciseName(e.target.value)}></input>
                                </div> 
                            
                            <div>
                            {el_of_exercise.set.map((el_of_set, index_of_set) => 
                            <div key={index_of_set} id={el_of_set._id}>
                                <span className=" w-12">Set {index_of_set+1}:&nbsp;</span>
                                
                                <input size="3" type="number" defaultValue={el_of_set.set_repetition}
                                onChange={(e) => updateSetRepetition(e.target.value, index_of_set)}></input>
                                &nbsp;X&nbsp;
                                <input size="3" type="number" defaultValue={el_of_set.set_weight}
                                onChange={(e) => updateSetWeight(e.target.value, index_of_set)}></input> 
                                &nbsp;kg
                                
                                

                            </div>
                            )}
                            
                            </div>
                            <button className="delete-set"
                            onClick={() => console.log(exercise_name, my_set_repetition, my_set_weight)}>
                                Delete Set 
                            </button>
                            <button>
                                Add Set 
                            </button>
                            <button id="saveButton" className="save-changes"
                            onClick={() => {changeName(el_of_exercise, ind)}}>
                                Save Changes
                            </button>
                        <button className="close-modal" onClick={() => {toggleModal(el_of_exercise.exercise_name), window.location.reload()}}> X </button>
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