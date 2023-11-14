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
         <div className="bg-red-200">Eure Fitnessapp</div>
    </>

    )
}
export default gerichtForm