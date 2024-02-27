import { useState } from "react";
import { useEffect } from "react";
import React from 'react'
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import FaqContent from "./faqContent";
import HomeYac from "../assets/images/HomeYac.png";
import { Link } from "react-router-dom";

function HomeScreen() {
    const [loading, setLoading] = useState(true)
    const [today_workout, setTodayWorkout] = useState()

    const [today_meal, setTodayMeal] = useState()

    const [today_journal, setTodayJournal] = useState()
    const [default_journal, setDefaultJournal] = useState()
    const [content, setContent] = useState()

    
    const updateJournalContent = (update) => {
        if(today_journal.length === 0){
            setContent(update)
        }else{
            const updatedJournalContent = today_journal
            updatedJournalContent[0].content= update
            setTodayJournal(updatedJournalContent)
        }
    }

    const saveJournal = async (e) => {
        if(today_journal.length === 0){
            const res = await fetch("/journals/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: content,
            })  
            }
            );
        }
        else{
            const res = await fetch("/journals/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    today_journal
                }),
            });
            console.log("post complete")
        }
    }

    const navigate = useNavigate();
    const navigateWorkoutDetail = (myWorkout_id) => {
        //console.log("in nav", myWorkout_id)
        navigate("/workoutList/workoutDetail", { state: { _id: myWorkout_id } });
        //var path = window.location.pathname;
    }

    const navigateGerichteDetail = (gerichte_id) => {
        //console.log("in nav", gerichte_id)
        navigate("/gerichte/all", { state: { _id: gerichte_id } });
        //var path = window.location.pathname;
    }

    async function fetchData() {
        const res_workout = await fetch("/workouts/thisDate");
        const workout_data = await res_workout.json();

        setTodayWorkout(workout_data)
        const res_gerichte = await fetch("/gerichte/thisDate");
        const gerichte_data = await res_gerichte.json();
        setTodayMeal(gerichte_data)

        const res_journal = await fetch("/journals/thisDate")
        const journal_data = await res_journal.json()
        setTodayJournal(journal_data)
        setTodayWorkout(workout_data)
        console.log(journal_data)

        setLoading(false)
        
        if(journal_data.length > 0){
            console.log("if")
            setDefaultJournal(journal_data[0].content)
        }else{
            console.log("else")
            setDefaultJournal("Schreibe hier deine Gedanken nieder.")
        }
    }


    function sumMarkos(GerichtsListe){
        let kc = 0;
        let fat = 0;
        let prot = 0;
        let carbs = 0;
        GerichtsListe.list.map(el_of_zutat=>{
            kc+=el_of_zutat.calories;
            fat+=el_of_zutat.fat;
            prot+=el_of_zutat.protein;
            carbs+=el_of_zutat.carbs;
        })
        return (
            <div>
                <p className="p p-color">KC: {kc} | F: {fat}</p>
                <p className="p p-color">Prot: {prot} | Carbs: {carbs}</p>
            </div>
        );
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
            <p className="header1 flex justify-center items-center">Heute</p>
            <div>
                <p className="center-content header2">Workout</p>
                {
                    today_workout.length === 0 ? (
                    
                        <div className="center-content text-center text-gray-400">
                            <div className="flex justify-center">
                                <img src={HomeYac} alt="Logo" width="55%" height="55%" className="only-desktop text-center"/>
                                <img src={HomeYac} alt="Logo" width="80%" height="80%" className="only-mobile text-center"/>
                            </div>
                            
                        </div>
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

                <p className="center-content header2">Today's Meals</p>
                {
                    today_meal.length === 0 ? (
                        <p className="workout-list-tile text-center text-gray-400">Keine Daten gefunden</p>
                    ) : (
                        today_meal.map((el_of_meal, index) => (
                            <div key={index} className="workout-list-tile" >
                                <p className="header2">
                                    {el_of_meal.title}
                                    &nbsp;
                                    {String(el_of_meal.date).substring(0, 10)}
                                </p>
                                {
                                    sumMarkos(el_of_meal)
                                }
                            </div>
                        ))
                    )
                }
            </div>
            <div>
                <p className="center-content header2">Daily Journal</p>
                <form>
                    <textarea className="workout-list-tile p p-color" defaultValue={"Daily Journal"}></textarea>
                </form>

                <p className="center-content header2">Tagebuch</p>
                
                    <textarea className="workout-list-tile p p-color" defaultValue={default_journal}
                    onChange ={(e) => updateJournalContent(e.target.value)}>
                    </textarea>
                    <p>
                        <button className="center-content button-normal"
                        onClick ={() => saveJournal()}>
                            Eintrag Speichern</button>
                    </p>
                

            </div>
            <div className="bottom-margin"></div>
        </>

    )
}
export default HomeScreen

/*
    async function fetchData() {
        const res = await fetch("/gerichte/thisDateGerichte");
        const data = await res.json();
        setTodayMeal(data)
        setLoading(false)
    }

{
                    today_meal.length === 0 ? (
                        <p className="workout-list-tile text-center text-gray-400">Keine Daten gefunden</p>
                    ) : (
                        today_meal.map((el_of_meal, index) => (
                            <div key={index} className="workout-list-tile" onClick={() => navigategerichtForm(el_of_meal._id)}>
                                <p className="header2">
                                    {el_of_meal.gerichte_type}
                                    &nbsp;
                                    {String(el_of_workout.workout_date).substring(0, 10)}
                                </p>
                                <p className="p p-color">Exercises: {el_of_workout.exercise.length}</p>
                                <p className="p p-color">Dauer: {el_of_workout.duration} min</p>
                            </div>
                        ))
                    )
                }*/