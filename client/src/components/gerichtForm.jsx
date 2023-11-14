import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function gerichtForm() {
    const [gericht, setGericht]  = useState();
    const [calories, setCalories] = useState();
    const [loading,setLoading] = useState(true)
    const [gerichte, setGerichte] = useState();

    async function fetchData(){
        const res = await fetch("/gerichte/all");
        const data = await res.json();
        setGerichte(data)
        setLoading(false)
    }

    const addGericht = async (e) =>{

        setGerichte([...gerichte, {Gericht: gericht, calories: calories}])
        const res = await fetch("/gerichte/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Gericht: gericht,
                calories: calories
            }),
            }
        );
    
      }

    useEffect(() =>{
        fetchData();
    },[])

    if(loading) return <div>Is Loading...</div>
    return (
    <>
         <input
        onChange={(e) => setGericht(e.target.value)}
        type="text" placeholder="gericht">
    </input>
    <input
        onChange={(e) => setCalories(e.target.value)}
        type="text" placeholder="calories">
    </input>
    <button
        onClick={() => addGericht()}
        className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
       Add
        </button>
    </>

    )
}
export default gerichtForm