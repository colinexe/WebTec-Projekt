import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function exerciseForm() {
    const [exercise_name, setExerciseName] = useState();
    const [exercise_date, setExerciseDate] = useState();
    const [set_number, setSetNumber] = useState();
    const [set_weight, setSetWeight] = useState();
    const [set_repetition, setSetRepetition] = useState();
    const [loading,setLoading] = useState(true)
    const [exercises, setExercises] = useState();

    async function fetchData(){
        const res = await fetch("/exercises/all");
        const data = await res.json();
        setExercises(data)
        setLoading(false)
    }


    const addExercise = async (e) =>{

        setExercises([...exercises, {exercise_name: exercise_name, exercise_date: exercise_date, set_number: set_number, set_weight: set_weight, set_repetition: set_repetition}])
        const res = await fetch("/exercises/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                exercise_name: exercise_name,
                exercise_date: exercise_date,
                set_number: set_number,
                set_weight: set_weight,
                set_repetition: set_repetition
            }),
            }
        );
    
      }
    
      
    const clearFields = () => {
        document.getElementById("exerciseName").value = "";
        document.getElementById("exerciseDate").value = "";
        document.getElementById("setNumber").value = "";
        document.getElementById("setWeight").value = "";
        document.getElementById("setRepetition").value = "";
    }

    useEffect(() =>{
        fetchData();
    },[])

    if(loading) return <div>Is Loading...</div>
    return (
    <>
         <input id="exerciseName"
        onChange={(e) => setExerciseName(e.target.value)}
        type="text" placeholder="ExerciseName">
    </input>
    
    <input id="exerciseDate"
        onChange={(e) => setExerciseDate(e.target.value)}
        type="text" placeholder="YYYY-MM-DD">
    </input>
    <input id="setNumber"
        onChange={(e) => setSetNumber(e.target.value)}
        type="text" placeholder="SetNumber">
    </input>
    <input id="setWeight"
        onChange={(e) => setSetWeight(e.target.value)}
        type="text" placeholder="SetWeight">
    </input>
    <input id="setRepetition"
        onChange={(e) => setSetRepetition(e.target.value)}
        type="text" placeholder="SetRepetition">
    </input>
    <button
        onClick={() => {addExercise(), clearFields()}}
        className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
       Add
        </button>
    </>

    )
}
export default exerciseForm