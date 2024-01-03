import { useState } from "react";
import { useEffect } from "react";


function exerciseForm() {
    const [workout_type, setWorkoutType] = useState();
    const [exercise_name, setExerciseName] = useState();
    const [workout_date, setWorkoutDate] = useState();
    const [set_number, setSetNumber] = useState();
    const [set_weight, setSetWeight] = useState();
    const [set_repetition, setSetRepetition] = useState();
    const [loading,setLoading] = useState(true)
    const [workouts, setWorkouts] = useState();

    async function fetchData(){
        const res = await fetch("/workouts/all");
        const data = await res.json();
        setWorkouts(data)
        setLoading(false)
    }


    const addWorkouts = async (e) =>{

        setWorkouts([...workouts, {workout_type: workout_type, exercise_name: exercise_name, workout_date: workout_date, set_weight: set_weight, set_repetition: set_repetition}])
        console.log(workouts)
        console.log(JSON.stringify({
            workout_type: workout_type,
            exercise_name: exercise_name,
            workout_date: "test",
            set_weight: set_weight,
            set_repetition: set_repetition
        }))
        const res = await fetch("/workouts/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                workout_type: workout_type,
                workout_date: workout_date,
                exercise:[{
                    exercise_name: exercise_name,
                set:[{
                    set_weight: set_weight,
                    set_repetition: set_repetition}]
                }]
            }),
            }
        );
    
      }
    
      
    const clearFields = () => {
        document.getElementById("workout_type").value = "";
        document.getElementById("exerciseName").value = "";
        document.getElementById("exerciseDate").value = "";
        document.getElementById("setWeight").value = "";
        document.getElementById("setRepetition").value = "";
    }

    useEffect(() =>{
        fetchData();
    },[])

    if(loading) return <div>Is Loading...</div>
    return (
    <>
    <input id="workout_type"
        onChange={(e) => setWorkoutType(e.target.value)}
        type="text" placeholder="WorkoutType">
    </input>    
    
    <input id="exerciseDate"
        onChange={(e) => setWorkoutDate(e.target.value)}
        type="text" placeholder="YYYY-MM-DD">
    </input>
    <input id="exerciseName"
        onChange={(e) => setExerciseName(e.target.value)}
        type="text" placeholder="ExerciseName">
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
        onClick={() => {addWorkouts(), clearFields()}}
        className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
       Add
        </button>
    </>

    )
}
export default exerciseForm