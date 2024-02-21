import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import "../styles.css";
import React from 'react';
import Navigation from "./Navigation";
import FaqContent from "./faqContent";
import { useNavigate } from "react-router-dom";

function workoutDetail(elem) {
    <link rel="stylesheet" href="../styles.css"></link>
    const [loading, setLoading] = useState(true)
    const [workouts, setWorkouts] = useState()
    const [myWorkout, setMyWorkout] = useState()
    const [exercise_name, setExerciseName] = useState()

    const [new_set_repetition, setNewSetRepetition] = useState()
    const [new_set_weight, setNewSetWeight] = useState()

    const navigate = useNavigate();
    const navigateWorkoutList = () => {
        console.log("test")
        navigate(-1);
    }


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

    const updateWorkoutName = (update) => {
        const updatedWorkoutName = [myWorkout]
        updatedWorkoutName[0].workout_type = update
        setWorkouts(updatedWorkoutName)
    }

    const updateWorkoutDate = (update) => {
        const updatedWorkoutDate = [myWorkout]
        updatedWorkoutDate[0].workout_date = update
        setWorkouts(updatedWorkoutDate)
    }

    const updateWorkoutDuration = (update) => {
        const updatedWorkoutDuration = [myWorkout]
        updatedWorkoutDuration[0].duration = update
        setWorkouts(updatedWorkoutDuration)
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

    const deleteWorkout = async (myworkout) => {
        //Funktioniert 10/10 -> schauen weil refresh benötigt ist?
        console.log(JSON.stringify({
            workout_id: myworkout._id,
        }))
        const res = await fetch("/workouts/deleteWorkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                workout_id: myworkout._id,
            }),
        });
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
        document.getElementById("newSetRepetitionField" + ind).value = "";
        document.getElementById("newSetWeightField" + ind).value = "";
        setNewSetRepetition(undefined)
        setNewSetWeight(undefined)
    }

    const saveExerciseChanges = async (myworkout) => {
        //Funktioniert (BE POST)
        console.log("workouts", workouts)
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
        updatedWorkoutSets[index_exercise].set.push({ "set_repetition": parseInt(new_set_repetition), "set_weight": parseInt(new_set_weight) })
        console.log(updatedWorkoutSets)
        setWorkouts([...workouts, updatedWorkoutSets])

        console.log(workouts)

    }

    const deleteSetFE = (index_exercise, index_set) => {
        //Funktioniert
        const updatedWorkoutSets = [...myWorkout.exercise];
        updatedWorkoutSets[index_exercise].set.splice(index_set, 1)
        setWorkouts(updatedWorkoutSets);
        console.log("Set Index " + index_set + " erfolgreich gelöscht:");
    }

    const addExerciseFE = async (new_exercise) => {
        //console.log(myWorkout)
        const updatedWorkoutExercises = myWorkout
        updatedWorkoutExercises.exercise.push({ "exercise_name": new_exercise })
        console.log(updatedWorkoutExercises)
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

        const data = await res.text();
        const myObj = JSON.parse(data)
        const index = myObj.exercise.length - 1



        console.log("post complete")
        localStorage.setItem('exerciseToShow', JSON.stringify(myObj.exercise[index]));

        window.location.reload()


        sleep(100).then(() => toggleModal(myObj.exercise[index].exercise_name))
    }

    const exerciseToShow = localStorage.getItem('exerciseToShow');

    if (exerciseToShow) {
        console.log("in if")
        localStorage.removeItem("exerciseToShow")
        const parsedExercise = JSON.parse(exerciseToShow);
        // Assuming 'exercise_id' is the actual ID of the modal you want to toggle
        //console.log(parsedExercise)
        sleep(100).then(() => toggleModal(parsedExercise._id))
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
            
                <Navigation />
                <div className="FAQ-visibility"><FaqContent />
                </div>

                <div className="">
                    <div className="workout-detail-macro">
                        <div>
                            <h1 className="header1 flex justify-center items-center">
                                <input className="w-10/12 text-center header-input" value={myWorkout.workout_type}
                                    onChange={(e) => updateWorkoutName(e.target.value)}></input>
                            </h1>
                        </div>
                        <div className="grid grid-cols-2 mt-2">
                            <span className="flex items-center justify-center">
                                <input className="w-9/12" type="date" value={String(myWorkout.workout_date).substring(0, 10)}
                                    onChange={(e) => updateWorkoutDate(e.target.value)}></input>
                            </span>
                            <span className="flex items-center justify-center">
                                <input className="w-6/12" type="number" placeholder="60" value={myWorkout.duration}
                                    onChange={(e) => updateWorkoutDuration(e.target.value)}></input>
                                <span className="p p-color">&nbsp; mins</span>
                            </span>

                        </div>

                    </div>

                    {myWorkout.exercise.map((el_of_exercise, ind) => {
                        return (
                            <div key={ind} className="workout-list-tile">
                                <div className="flex flex-row">
                                    <span className="header2 basis-1/2 p">{el_of_exercise.exercise_name}&nbsp;&nbsp;</span>
                                    <span className="basis-1/2 flex justify-end">
                                        <button className=""
                                            onClick={() => { toggleModal(el_of_exercise._id), console.log(el_of_exercise) }}>
                                            <div className="flex">
                                            <span class="material-icons button-color">edit</span>
                                            <span className="p button-color">Edit</span></div>
                                        </button>
                                    </span>
                                </div>
                                <div>

                                    {/* MODAL */}
                                    <div id={el_of_exercise._id} className="hidden">
                                        <div onClick={() => { toggleModal(el_of_exercise._id), window.location.reload() }} className="overlay"></div>
                                        <div className="modal-content">
                                            <div className="text-lg font-semibold">


                                                <h2 className="header3">Edit Exercise</h2>
                                            </div>
                                            <div>
                                                <input type="text" defaultValue={el_of_exercise.exercise_name}
                                                    onChange={(e) => updateExerciseName(e.target.value, ind)}></input>
                                            </div>

                                            <div id="set-input-lines" className="">
                                            <div className="flex flex-col ">
                                                {el_of_exercise.set.map((el_of_set, index_of_set) =>
                                                
                                                    <div key={index_of_set} id={el_of_set._id} className="modal-line">
                                                        
                                                        <span className="modal-line-tag w-14 p p-color">Set {index_of_set + 1}:&nbsp;</span>

                                                        <input size="3" type="number" className="leading-snug modal-line-tag" value={el_of_set.set_repetition}
                                                            onChange={(e) => updateSetRepetition(e.target.value, ind, index_of_set)}></input>
                                                        <span className="modal-line-tag p p-color">&nbsp;X&nbsp;</span>
                                                        <input size="3" type="number" className="leading-snug modal-line-tag" value={el_of_set.set_weight}
                                                            onChange={(e) => updateSetWeight(e.target.value, ind, index_of_set)}></input>
                                                        <span className="modal-line-tag p p-color">&nbsp;kg &nbsp;</span>

                                                        <button className="modal-line-tag"
                                                            onClick={() => { deleteSetFE(ind, index_of_set) }}>
                                                            <span className="material-icons">delete</span>
                                                        </button>


                                                    </div>
                                                )}
                                                

                                                <div className="modal-line">
                                                    {/* Modal letztes Set das noch "leer" ist*/}

                                                    
                                                    <input size="3" type="number" className="leading-snug modal-line-tag ml-14" id={"newSetRepetitionField" + ind}
                                                        onChange={(e) => setNewSetRepetition(e.target.value)}>
                                                    </input>
                                                    <span className="modal-line-tag p p-color">&nbsp;X&nbsp;</span>
                                                    <input size="3" type="number" className="leading-snug modal-line-tag" id={"newSetWeightField" + ind}
                                                        onChange={(e) => setNewSetWeight(e.target.value)}></input>
                                                    <span className="modal-line-tag p p-color">&nbsp;kg &nbsp;</span>
                                                    <button onClick={() => { addSetFE(ind), clearFields(ind) }}>
                                                        <span className="material-icons modal-line-tag">add</span>
                                                    </button>

                                                </div>
                                                </div>
                                                <div className="flex justify-end mt-2 gap-1">

                                                    <button className="delete-button"
                                                        onClick={() => { deleteExercise(myWorkout, ind), sleep(100).then(() => window.location.reload()) }}>
                                                        Delete
                                                    </button>
                                                    <button className="button-normal"
                                                        onClick={() => { saveExerciseChanges(myWorkout), toggleModal(el_of_exercise._id) }}>
                                                        Save
                                                    </button>
                                                </div>
                                            </div>

                                            <button className="close-modal" onClick={() => { toggleModal(el_of_exercise._id), window.location.reload() }}> X </button>
                                        </div>
                                    </div>



                                </div>

                                <div>

                                    {el_of_exercise.set.map((el_of_set, index_of_set) => {
                                        // Sets in Workout Übersicht (nicht Modal)
                                        return (
                                            <div key={index_of_set} className="indent-4 p p-color">
                                                <p>Set {index_of_set + 1}: {el_of_set.set_repetition} x {el_of_set.set_weight} kg</p>

                                            </div>)
                                    })}</div>




                            </div>)
                    })}



                    <button className="workout-list-tile text-center p p-color" onClick={() => { addExerciseFE("Neue Übung") }}>+ Exercise</button>


                </div>
                
                        <button className="center-content button-normal"
                            onClick={() => { saveExerciseChanges(myWorkout) }}>Save Workout</button>
                        <button className="delete-button  center-content"
                            onClick={() => { deleteWorkout(myWorkout), navigate(-1) }}>Delete Workout</button>
                  
                  <div className="bottom-margin"></div> 
                    


            
        </>

    )
}
export default workoutDetail