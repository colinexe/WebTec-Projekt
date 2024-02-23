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
        console.log("in nav", myWorkout_id)
        navigate("/workoutList/workoutDetail", { state: { _id: myWorkout_id } });
        //var path = window.location.pathname;
    }

    async function fetchData() {
        const res_workout = await fetch("/workouts/thisDate");
        const workout_data = await res_workout.json();
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
                <p className="center-content header2">Today's Workouts</p>
                {
                    today_workout.length === 0 ? (
                    
                        <p className="center-content text-center text-gray-400">
                            <div className="flex justify-center">
                                <img src={HomeYac} alt="Logo" width="40%" height="40%" className="only-desktop text-center"/>
                                <img src={HomeYac} alt="Logo" width="80%" height="80%" className="only-mobile text-center"/>
                            </div>
                            
                        </p>
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
                <p className="center-content header2">Daily Journal</p>
                
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