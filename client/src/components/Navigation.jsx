import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navigation() {
    const [gericht, setGericht]  = useState();
    const [calories, setCalories] = useState();
    const [loading,setLoading] = useState(true)
    const [gerichte, setGerichte] = useState();

    const navigate = useNavigate();
    
    const navigateGerichtForm = () => {
        navigate("./gerichtForm");
        var path = window.location.pathname;
        var page = path.split("/").pop();
        gerichtFormActive(page);
    }

    const navigateGerichtList = () => {
        navigate("/");
        var path = window.location.pathname;
        var page = path.split("/").pop();
        gerichtListActive(page);
    }
    

    //Unschöne Lösung der Button Klasse -> refresh auf /gerichtForm rendert "Home" als aktiven Button (weiter unten im return implementiert)
    const gerichtFormActive = (page) => {
        if (page = "gerichtForm"){
            document.getElementById("GerichtForm").className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";       
            document.getElementById("GerichtList").className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded";
        }
    }
    const gerichtListActive = (page) => {
        if (page = "/"){
            document.getElementById("GerichtList").className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";       
            document.getElementById("GerichtForm").className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded";
        }
    }

    /*window.onload = function() {
        var path = window.location.pathname;
        var page = path.split("/").pop();
        console.log(page);
        //document.getElementById("GerichtList").className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";       
        //document.getElementById("GerichtForm").className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded";
    }*/
      async function fetchData(){
        const res = await fetch("/gerichte/all");
        const data = await res.json();
        setGerichte(data)
        setLoading(false)

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


    }

    useEffect(() =>{
        fetchData();
    },[])

    if(loading) return <div>Is Loading...</div>
    return (
    <div>
        <div className="bg-red-200">Eure Fitnessapp
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button id="GerichtList" onClick={navigateGerichtList} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button id="GerichtForm" onClick={navigateGerichtForm} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Zur Form</button>
        </div>
    </div>

    )
}
export default Navigation