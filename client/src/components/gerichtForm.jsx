import { useState } from "react";
import { useEffect } from "react";
import Navigation from "./Navigation";
import FAQ from "./FAQ";
import FaqContent from "./faqContent";
import { Link } from "react-router-dom";

function gerichtForm() {
    const [gericht, setGericht] = useState();
    const [calories, setCalories] = useState();
    const [fat, setFat] = useState();
    const [totalFat, setTotalFat] = useState(0);
    const [protein, setProtein] = useState();
    const [totalProtein, setTotalProtein] = useState(0);
    const [loading, setLoading] = useState(true)
    const [gerichte, setGerichte] = useState();
    const [datum, setDatum] = useState();
    const [gerichtListe, setGerichtListe] = useState([]);
    const [totalCalories, setTotalCalories] = useState(0);
    const [buttonEnabled, setButtonEnabled] = useState(true);
    const [title, setTitle] = useState();


//Hier bitte aktivieren, nur ausgeschaltet wegen Bugs
    async function fetchData() {
        const res = await fetch("/gerichte/all");
        const data = await res.json();
        const newdata = data.map(element => {
            const { summeKalorien, summeFett, summeProtein } = berechneSummen(element)
            return {
                ...element, summeKalorien, summeFett, summeProtein
            }
        })
        setGerichte(newdata)
        console.log(newdata)
        setLoading(false)
    }

    function berechneSummen(data) {
        let summeKalorien = 0;
        let summeFett = 0;
        let summeProtein = 0;

        data.list.forEach(item => {
            summeKalorien += item.calories;
            summeFett += item.fat;
            summeProtein += item.protein;
        });

        return {
            summeKalorien,
            summeFett,
            summeProtein
        };
    }


    //Hier werden die Sachen nur in die Datenbank geschrieben, die Eingabefelder aber nicht geleert
    /*const addToDatabase = async () => {
        console.log("in addToDatabase")
        const res = await fetch("/gerichte/liste/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title, list: gerichtListe
            }
            ),
        }
        );
        console.log(res.status)
    }*/

    //Hier der Versuch mit Leerung der Datenfelder
    const addToDatabase = async () => {
        try {
            const res = await fetch("/gerichte/liste/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    list: gerichtListe,
                }),
            });
    
            if (res.status === 200) {
                console.log("Gerichte erfolgreich zur Datenbank hinzugefügt.");
                setGerichtListe([]);
                setTotalCalories(0);
                setTotalFat(0);
                setTotalProtein(0);

                window.location.reload();
            } else {
                console.error("Fehler beim Hinzufügen zur Datenbank:", res.status);
            }
        } catch (error) {
            console.error("Fehler beim Hinzufügen zur Datenbank:", error);
        }
    };
    

    const addGericht = (e) => {
        setTotalCalories(previous => previous + Number(calories));
        setTotalFat(previous => previous + Number(fat));
        setTotalProtein(previous => previous + Number(protein));
        setGerichtListe([...gerichtListe, { name: gericht, calories: calories, fat: fat, protein: protein }])
    }

    const validateButton = () => {
        if (calories !== undefined && gerichte !== undefined && calories !== '' && gerichte !== '') {
            setButtonEnabled(false)
        }
        else {
            setButtonEnabled(true)
        }
    }

    const deleteGericht = (index) => {
        const updatedGerichtListe = [...gerichtListe];
        deleteMahlzeitFromDatabase(deletedMahlzeit.id);
        updatedGerichtListe.splice(index, 1);
        setGerichtListe(updatedGerichtListe);
        console.log("Gericht gelöscht:", index);
        setTotalCalories(previous => previous - Number(calories));
        setTotalFat(previous => previous - Number(fat));
        setTotalProtein(previous => previous - Number(protein));
    };

    const deleteMahlzeit = async (index, gerichtId) => {
        try {
            console.log("gerichtID:", gerichtId);
            // Rufe die Backend-API auf, um die Mahlzeit zu löschen
            await fetch("/gerichte/deleteMahlzeit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ gericht_id: gerichtId }),
            });
    
            const updatedGerichte = [...gerichte];
            const deletedMahlzeit = updatedGerichte[index];
            updatedGerichte.splice(index, 1);
            setGerichte(updatedGerichte);
            setTotalCalories((previous) => previous - Number(deletedMahlzeit.calories));
            setTotalFat((previous) => previous - Number(deletedMahlzeit.fat));
            setTotalProtein((previous) => previous - Number(deletedMahlzeit.protein));
    
            console.log("Mahlzeit gelöscht:", index);
        } catch (error) {
            console.error("Fehler beim Löschen der Mahlzeit im Frontend:", error);
        }
    };
    




    /*const deleteMahlzeit = (index) => {
        const updatedGerichte = [...gerichte];
        const deletedMahlzeit = updatedGerichte[index];
        updatedGerichte.splice(index, 1);
        setGerichte(updatedGerichte);
        setTotalCalories((previous) => previous - Number(deletedMahlzeit.calories));
        setTotalFat((previous) => previous - Number(deletedMahlzeit.fat));
        setTotalProtein((previous) => previous - Number(deletedMahlzeit.protein));
      
        console.log("Mahlzeit gelöscht:", index);
      };*/


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
        const stringdate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
        setDatum(stringdate)
    }
    useEffect(() => {
        getCurrentDate();
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
            <div className='h-11'></div>
            <div>
                <Navigation />
                <div className="FAQ-visibility"><FaqContent /></div>
            </div>
            <div className="center-content">
                <div className="rounded bg-gray-200 flex justify-center items-center h-full">
                    <div className="grid grid-cols-8 md:w-1/2 gap-2 w-full md:p-0 p-3">
                        <br className="col-span-full"></br>
                        <div className="flex justify-center col-span-full">{datum}</div>
                        <input id="titleField"
                            className="col-span-5"
                            onChange={(e) => setTitle(e.target.value)}
                            type="text" placeholder="Mahlzeit">
                        </input>

                        <div className="col-span-3">
                            kcal-all: {totalCalories} fat-all: {totalFat} protein-all: {totalProtein}
                        </div>
                        {
                            gerichtListe && gerichtListe.length > 0 && gerichtListe.map((singleGericht, index) => (
                                <>
                                    <div className="col-span-6" key={index}>
                                        {singleGericht.name} {singleGericht.calories} {singleGericht.fat} {singleGericht.protein}
                                    </div>
                                    <button onClick={() => { deleteGericht(index) }} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded col-span-2">
                                        delete
                                    </button>
                                </>
                            ))
                        }
                        <input id="gerichtField"
                            className="col-span-4"
                            onChange={(e) => { setGericht(e.target.value), validateButton() }}
                            type="text" placeholder="Name">
                        </input>
                        <input id="kalorienField"
                            className="col-span-1"
                            required
                            min="0"
                            onChange={(e) => { setCalories(e.target.value), validateButton() }}
                            type="number" placeholder="kcal">
                        </input>
                        <input id="fatField"
                            className="col-span-1"
                            min="0"
                            onChange={(e) => { setFat(e.target.value), validateButton() }}
                            type="number" placeholder="fat">
                        </input>
                        <input id="proteinField"
                            className="col-span-1"
                            min="0"
                            onChange={(e) => { setProtein(e.target.value), validateButton() }}
                            type="number" placeholder="protein">
                        </input>
                        <button disabled={buttonEnabled}
                            onClick={() => { addGericht(), clearFields() }}
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
                {
                    gerichte && gerichte.length > 0 && gerichte.map((singleGericht, index) => (
                        <>
                            <div className="w-full bg-gray-200 h-fit flex flex-col rounded-lg mt-2 mb-5" key={index}>
                                <div className="ml-2 font-bold text-xl">
                                    {singleGericht.title}
                                </div>
                                <div className = "ml-2">
                                <div>Kalorien:{singleGericht.summeKalorien}</div>
                                <div>Protein: {singleGericht.summeProtein}</div>
                                <div>Fett: {singleGericht.summeFett}</div>
                                <button onClick={() => { deleteMahlzeit(index, singleGericht._id) }} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded col-span-2">
                                        delete
                                    </button>
                                </div>
                            </div>
                        </>
                    ))
                }
            </div>
        </>

    )
}



export default gerichtForm