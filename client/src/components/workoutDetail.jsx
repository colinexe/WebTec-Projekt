import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import "../styles.css";
import React from 'react';

function workoutDetail(elem) {
    <link rel="stylesheet" href="../styles.css"></link>
    const [loading, setLoading] = useState(true)
    const [workouts, setWorkouts] = useState()
    const [myWorkout, setMyWorkout] = useState()
    const [exercise_name, setExerciseName] = useState()

    const [new_set_repetition, setNewSetRepetition] = useState()
    const [new_set_weight, setNewSetWeight] = useState()
    const [myWorkoutIndex, setMyWorkoutIndex] = useState()
    const [new_exercise_name, setNewExerciseName] = useState()
    const [created_exercise, setCreatedExercise] = useState()


    const location = useLocation();
    const myId = location.state._id

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    const toggleModal = (exercise) => {
        let myExercise = document.getElementById(exercise);
        if (myExercise.classList.contains('hidden')) {
            myExercise.classList.remove('hidden');
        } else {
            myExercise.classList.add('hidden');
        }
    };

    async function fetchData() {
        const res = await fetch("/workouts/all");
        const data = await res.json();
        setWorkouts(data)
        setLoading(false)
        console.log("Hallo")
        console.log(location.state)
        console.log(data)
        const myworkout = findId(data, myId)
        setMyWorkout(await myworkout)
    }


    async function findId(data, idToLookFor) {
        var workoutArray = data;
        for (var i = 0; i < workoutArray.length; i++) {
            if (workoutArray[i]._id == idToLookFor) {
                var myWorkout = workoutArray[i];
                return (myWorkout);
            }
        }
    }


    const updateExerciseName = (update, index_exercise) => {
        const updatedExerciseName = [...myWorkout.exercise];
        updatedExerciseName[index_exercise].exercise_name = update
        setWorkouts(updatedExerciseName)
    }

    const updateSetWeight = (update, index_exercise, index_set) => {
        const updatedSetWeight = [...myWorkout.exercise];
        updatedSetWeight[index_exercise].set[index_set].set_weight = parseInt(update)
        setWorkouts(updatedSetWeight)
    }

    const updateSetRepetition = (update, index_exercise, index_set) => {
        const updatedSetRepetition = [...myWorkout.exercise];
        updatedSetRepetition[index_exercise].set[index_set].set_repetition = parseInt(update)
        setWorkouts(updatedSetRepetition)
    }

    const deleteExercise = async (myworkout, ind) => {
        //Funktioniert 10/10 -> schauen weil refresh benötigt ist?
        const deleteExercise = [...myWorkout.exercise]
        console.log(deleteExercise)
        console.log(myworkout)
        console.log(JSON.stringify({
            exercise_index: ind,
            workout_id: myworkout._id,
            exercise_id: myworkout.exercise[ind]._id
        }))
        const res = await fetch("/workouts/deleteExercise", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                exercise_index: ind,
                workout_id: myworkout._id,
                exercise_id: myworkout.exercise[ind]._id
            }),
        });
    }

    const clearFields = (ind) => {
        document.getElementById("newSetRepetitionField"+ind).value ="";
        document.getElementById("newSetWeightField"+ind).value ="";
        setNewSetRepetition(undefined)
        setNewSetWeight(undefined)
    }

    const saveExerciseChanges = async (myworkout) => {
        //Funktioniert (BE POST)
        console.log(workouts)
        console.log(JSON.stringify({
            myworkout
        }))
        const res = await fetch("/workouts/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                myworkout
            }),
        });
        console.log("post complete")
    }

    const addSetFE = (index_exercise) => {
        const updatedWorkoutSets = [...myWorkout.exercise];
        updatedWorkoutSets[index_exercise].set.push({"set_repetition": parseInt(new_set_repetition), "set_weight": parseInt(new_set_weight)})
        console.log(updatedWorkoutSets)
        setWorkouts([...workouts, updatedWorkoutSets])
        
        console.log(workouts)
        
    }

    const deleteSetFE = (index_exercise, index_set) => {
        //Funktioniert
        const updatedWorkoutSets = [...myWorkout.exercise];
        updatedWorkoutSets[index_exercise].set.splice(index_set, 1)
        setWorkouts(updatedWorkoutSets);
        console.log("Set Index "+ index_set +" erfolgreich gelöscht:");
    }

    const addExerciseFE = async (new_exercise) => {
        //console.log(myWorkout)
        const updatedWorkoutExercises = myWorkout
        updatedWorkoutExercises.exercise.push({"exercise_name": new_exercise})
        console.log (updatedWorkoutExercises)
        //console.log(myWorkout)
        //setMyWorkout(updatedWorkoutExercises)
        console.log(myWorkout)
        var myworkout = myWorkout
        const res = await fetch("/workouts/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                myworkout
            }),
        });
        console.log("post complete")

        sleep(1000).then(() => window.location.reload())

        
    }

    useEffect(() => {
        fetchData();
    }, [])

    if (loading) return <div>Is Loading...</div>
    return (
        <>
            <h1 className="text-2xl font-bold flex justify-center items-center">WorkoutDetail</h1>
            <div className="workout-list-tile">
                <p className="text-xl font-bold">
                    {myWorkout.workout_type}
                    {/*{workouts[1].workout_type}*/}
                    &nbsp;
                    {String(myWorkout.workout_date).substring(0, 10)}
                </p>
                
                {myWorkout.exercise.map((el_of_exercise, ind) => {
                    return (
                        <div key={ind}>

                            <span className="text-lg">exercise: {el_of_exercise.exercise_name}&nbsp;&nbsp;</span>
                            <button className="btn-modal rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={() => {toggleModal(el_of_exercise.exercise_name) }}>
                                Edit {el_of_exercise.exercise_name}
                            </button>

                            <div>

                                {/* MODAL */}
                                <div id={el_of_exercise.exercise_name} className="hidden">
                                    <div onClick={() => { toggleModal(el_of_exercise.exercise_name), window.location.reload() }} className="overlay"></div>
                                    <div className="modal-content">
                                        <div className="text-lg font-semibold">


                                            <h2>Edit Exercise</h2>
                                        </div>
                                        <div>Name:
                                            <input type="text" defaultValue={el_of_exercise.exercise_name}
                                                onChange={(e) => updateExerciseName(e.target.value, ind)}></input>
                                        </div>

                                        <div id="set-input-lines">

                                            {el_of_exercise.set.map((el_of_set, index_of_set) =>
                                                <div key={index_of_set} id={el_of_set._id}>
                                                    <span className=" w-12">Set {index_of_set + 1}:&nbsp;</span>

                                                    <input size="3" type="number" className="leading-snug" value={el_of_set.set_repetition}
                                                        onChange={(e) => updateSetRepetition(e.target.value, ind, index_of_set)}></input>
                                                    &nbsp;X&nbsp;
                                                    <input size="3" type="number" className="leading-snug" value={el_of_set.set_weight}
                                                        onChange={(e) => updateSetWeight(e.target.value, ind, index_of_set)}></input>
                                                    &nbsp;kg &nbsp;

                                                    <button className="btn-modal rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                        onClick={() => { deleteSetFE(ind, index_of_set) }}>
                                                        Delete Set
                                                    </button>


                                                </div>
                                            )}

                                            <div>
                                                {/* Modal letztes Set das noch "leer" ist*/}
                                                

                                                <input size="3" type="number" className="leading-snug ml-11" id={"newSetRepetitionField"+ind}
                                                    onChange={(e) => setNewSetRepetition(e.target.value)}>
                                                </input>
                                                &nbsp;X&nbsp;
                                                <input size="3" type="number" className="leading-snug" id={"newSetWeightField"+ind}
                                                    onChange={(e) => setNewSetWeight(e.target.value)}></input>
                                                &nbsp;kg&nbsp;
                                                <button onClick={() => {addSetFE(ind), clearFields(ind)}}>
                                                    + Add Set
                                                </button>

                                            </div>
                                            <div>
                                                <span className="w-12">&nbsp;</span>

                                                <button id="deleteExerciseButton" className="delete-exercise btn-modal rounded px-2 py-1 text-xs font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                    onClick={() => {deleteExercise(myWorkout, ind), sleep(300).then(() => window.location.reload())}}>
                                                    Delete Exercise
                                                </button>
                                                <button id="saveButton" className="save-changes btn-modal rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                    onClick={() => { saveExerciseChanges(myWorkout), toggleModal(el_of_exercise.exercise_name) }}>
                                                    Save Changes
                                                </button>
                                            </div>
                                        </div>

                                        <button className="close-modal" onClick={() => { toggleModal(el_of_exercise.exercise_name), window.location.reload() }}> X </button>
                                    </div>
                                </div>



                            </div>

                            <div>

                                {el_of_exercise.set.map((el_of_set, index_of_set) => {
                                    // Sets in Workout Übersicht (nicht Modal)
                                    return (
                                        <div key={index_of_set} className="indent-4">
                                            <p>Set {index_of_set + 1}: {el_of_set.set_repetition} x {el_of_set.set_weight} kg</p>

                                        </div>)
                                })}</div>




                        </div>)
                })}
                <div>
                    <input onChange={(e) => setExerciseName(e.target.value)} placeholder="Exercise Name"></input>
                    {/*<button onClick={() => {saveExerciseChanges(myWorkout, exercise_name, myWorkout.exercise.length)}}>+ New Exercise (recheck)</button>*/}
                    <button onClick={() => {addExerciseFE(exercise_name)}}>+ New Exercise (recheck)</button>
                </div>
                
            </div>



        </>

    )
}
export default workoutDetail