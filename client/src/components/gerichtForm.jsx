import { useState } from "react";
import { useEffect } from "react";
import Navigation from "./Navigation";
import FAQ from "./FAQ";
import FaqContent from "./faqContent";
import { Link } from "react-router-dom";

function gerichtForm() {
    const [gericht, setGericht]  = useState();
    const [calories, setCalories] = useState();
    const [fat, setFat] = useState();
    const [totalFat, setTotalFat] = useState(0);
    const [protein, setProtein] = useState();
    const [totalProtein, setTotalProtein] = useState(0);
    const [loading,setLoading] = useState(true)
    const [gerichte, setGerichte] = useState();
    const [datum, setDatum] = useState();
    const [gerichtListe, setGerichtListe] = useState([]);
    const [totalCalories, setTotalCalories] = useState(0);
    const [buttonEnabled, setButtonEnabled] = useState(true);
    const [title, setTitle] = useState();
    


    async function fetchData(){
        const res = await fetch("/gerichte/all");
        const data = await res.json();
        setGerichte(data)
        setLoading(false)
    }

    const addToDatabase = async () =>{
        console.log("in addToDatabase")
        const res = await fetch("/gerichte/liste/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title:title,list:gerichtListe
                }
            ),
            }
        );
        console.log(res.status)
    } 

    const addGericht = (e) =>{

       /* setGerichte([...gerichte, {Gericht: gericht, calories: calories}])
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
        */   
        setTotalCalories(previous => previous + Number(calories));
        setTotalFat(previous => previous + Number(fat));
        setTotalProtein(previous => previous + Number(protein));
      setGerichtListe([...gerichtListe, {name: gericht, calories: calories, fat: fat, protein: protein}])
      }

    const validateButton = ()=>{
        if (calories !== undefined && gerichte !== undefined && calories !== '' && gerichte !== '') {
            setButtonEnabled (false)
        }
        else{
            setButtonEnabled (true)
        }
    }

      const deleteGericht = (index) => {
        const updatedGerichtListe = [...gerichtListe];
        updatedGerichtListe.splice(index, 1);
        setGerichtListe(updatedGerichtListe);
        console.log("Gericht gelöscht:", index);
        setTotalCalories(previous => previous - Number(calories));
    };
    
      
    const clearFields = () => {
        document.getElementById("gerichtField").value = "";
        document.getElementById("kalorienField").value = "";
        document.getElementById("fatField").value = "";
        document.getElementById("proteinField").value = "";
        setButtonEnabled(true)
        setGericht("")
        setCalories(undefined)
    }

const getCurrentDate = () => {
    const date = new Date()
    const stringdate = date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()
    setDatum(stringdate)
}
    useEffect(() =>{
        getCurrentDate();
        fetchData();
    },[])

    if(loading) return <div>Is Loading...</div>
    return (
        <>
        <div className='h-11'></div>
        <div>
        <Navigation />
        <div className="FAQ-visibility"><FaqContent /></div>
        </div>
<div className="center-content">
    <div className="bg-green-200 flex justify-center items-center h-full">
        <div className="grid grid-cols-8 md:w-1/2 gap-2 w-full md:p-0 p-3">
        <br className="col-span-full"></br>
        <div className="flex justify-center col-span-full">{datum}</div>
         <input id="titleField"
         className = "col-span-5"
        onChange={(e) => setTitle(e.target.value)}
        type="text" placeholder="title">
    </input>

    <div className="col-span-3">
        kcal-all: {totalCalories} fat-all: {totalFat} protein-all: {totalProtein}
    </div>
    {
    gerichtListe && gerichtListe.length > 0 && gerichtListe.map((singleGericht, index) => (
    <>
    <div className = "col-span-6" key={index}>
            {singleGericht.name} {singleGericht.calories} {singleGericht.fat} {singleGericht.protein}
        </div>
        <button onClick={() => {deleteGericht(index)}} className = "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded col-span-2">
            delete
        </button>
        </>
    ))
}
    <input id="gerichtField"
    className ="col-span-4"
        onChange={(e) => {setGericht(e.target.value), validateButton()}}
        type="text" placeholder="Name">
    </input>
    <input id="kalorienField"
    className = "col-span-1"
    required
    min = "0"
        onChange={(e) => {setCalories(e.target.value), validateButton()}}
        type="number" placeholder="kcal">
    </input>
    <input id="fatField"
    className ="col-span-1"
    min = "0"
        onChange={(e) => {setFat(e.target.value), validateButton()}}
        type="number" placeholder="fat">
    </input>
    <input id="proteinField"
    className ="col-span-1"
    min = "0"
        onChange={(e) => {setProtein(e.target.value), validateButton()}}
        type="number" placeholder="protein">
    </input>
    <button disabled = {buttonEnabled}
        onClick={() => {addGericht(), clearFields()}}
        className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
       +
        </button>

    <button onClick={addToDatabase}
        className="col-span-full rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
       Add to Database
    </button>
        </div>
    </div>
    </div>
    </>

    )
}


    
export default gerichtForm