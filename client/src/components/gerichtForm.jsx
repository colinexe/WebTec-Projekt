import { useState } from "react";
import { useEffect } from "react";
import Navigation from "./Navigation";
import FAQ from "./FAQ";
import FaqContent from "./faqContent";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import "../styles.css";

function gerichtForm() {
    const [gericht, setGericht] = useState();
    const [calories, setCalories] = useState();
    const [fat, setFat] = useState();
    const [totalFat, setTotalFat] = useState(0);
    const [protein, setProtein] = useState();
    const [totalProtein, setTotalProtein] = useState(0);
    const [carbs, setCarbs] = useState();
    const [totalCarbs, setTotalCarbs] = useState(0);
    const [loading, setLoading] = useState(true)
    const [gerichte, setGerichte] = useState();
    const [datum, setDatum] = useState();
    const [gerichtListe, setGerichtListe] = useState([]);
    const [totalCalories, setTotalCalories] = useState(0);
    const [buttonEnabled, setButtonEnabled] = useState(true);
    const [title, setTitle] = useState();
    const [selectedDate, setselectedDate] = useState(new Date().toISOString().split("T")[0]);


//Hier bitte aktivieren, nur ausgeschaltet wegen Bugs
    async function fetchData() {
        const res = await fetch("/gerichte/all");
        const data = await res.json();
        const newdata = data.map(element => {
            const { summeKalorien, summeFett, summeProtein, summeCarbs } = berechneSummen(element)
            return {
                ...element, summeKalorien, summeFett, summeProtein, summeCarbs
            }
        })
        setGerichte(newdata)
        console.log(newdata)
        setLoading(false)
    }

    function berechneSummen(data) {
        let summeKalorien = 0;
        let summeFett = 0;
        let summeProtein = 0
        let summeCarbs = 0;

        data.list.forEach(item => {
            summeKalorien += item.calories;
            summeFett += item.fat;
            summeProtein += item.protein;
            summeCarbs += item.carbs;
        });

        return {
            summeKalorien,
            summeFett,
            summeProtein,
            summeCarbs
        };
    }


    const addToDatabase = async () => {
        try {
            console.log("Datum vor dem Hinzufügen zur Datenbank:", datum);
            const res = await fetch("/gerichte/liste/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    date: datum,
                    list: gerichtListe,
                }),
            });
    
            if (res.status === 200) {
                console.log("Gerichte erfolgreich zur Datenbank hinzugefügt.");
                setGerichtListe([]);
                setTotalCalories(0);
                setTotalFat(0);
                setTotalProtein(0);
                setTotalCarbs(0);

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
        setTotalCarbs(previous => previous + Number(carbs));
        setGerichtListe([...gerichtListe, { name: gericht, calories: calories, fat: fat, protein: protein, carbs: carbs }])
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
        //deleteMahlzeitFromDatabase(deletedMahlzeit.id);
        updatedGerichtListe.splice(index, 1);
        setGerichtListe(updatedGerichtListe);
        console.log("Gericht gelöscht:", index);
        setTotalCalories(previous => previous - Number(calories));
        setTotalFat(previous => previous - Number(fat));
        setTotalProtein(previous => previous - Number(protein));
        setTotalCarbs(previous => previous - Number(carbs));
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
            setTotalCarbs((previous) => previous - Number(deletedMahlzeit.carbs));
    
            window.location.reload();
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
        document.getElementById("carbsField").value = "";
        setButtonEnabled(true)
        setGericht("")
        setCalories(undefined)
    }

    /*const getCurrentDate = () => {
        const date = new Date()
        const stringdate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
        setDatum(stringdate);
    }*/

    const getCurrentDate = () => {
        const date = new Date();
        const formattedDate = format(date, 'yyyy-MM-dd');
        setDatum(formattedDate);
    }

    useEffect(() => {
        const date = new Date().toISOString().split("T")[0];
        console.log(date)
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
            <div className='top-margin'></div>
            <div>
                <Navigation />
                <div className="FAQ-visibility"><FaqContent /></div>
            </div>
            <p className="header1 flex justify-center items-center">Gerichte</p>
            <div className="center-content">
            <p className="header1 flex justify-center items-center">Gerichte</p>
                <div className="roundedflex justify-center items-center h-full" style={{ backgroundColor: 'var(--tiles)', borderRadius: '10px'}}>
                    
                    <div className="grid grid-cols-9 gap-2 w-full md:p-0 p-3 ">
                        
                        
                        <input
                            className="col-span-2 inputFieldAaron"
                            style={{borderRadius: '10px', marginBottom: '5px', marginLeft: '10px', width: '150px', zIndex: '1', marginTop: '5px'}}
                            type="date"
                            value={datum}
                            onChange={(e) => setDatum(e.target.value)}
                        />
                        
                        <br className="col-span-1"></br>

                        <input id="titleField"
                            className="header-input justify-center col-span-3"
                            style={{ color: 'var(--text-white)', borderRadius: '10px', marginHeight: '20px', marginTop: '5px', marginLeft: '5px'}}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text" placeholder="Mahlzeit">
                        </input>
                        
                        <div></div>

                        <div className="col-span-2 font-bold" style={{ color: 'var(--text-white)', textAlign: 'right', marginRight: '10px' }}>
                            KC: {totalCalories} | F: {totalFat} 
                            <br></br>P: {totalProtein} | C: {totalCarbs}
                        </div>
                        {
                            gerichtListe && gerichtListe.length > 0 && gerichtListe.map((singleGericht, index) => (
                                <>
                                    <div className="col-span-6" style={{ color: 'var(--text-white)' }} key={index}>
                                        {singleGericht.name} {singleGericht.calories} {singleGericht.fat} {singleGericht.protein} {singleGericht.carbs}
                                    </div>
                                    <button onClick={() => { deleteGericht(index) }} className="delete-button bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded col-span-2 justify-right">
                                        delete
                                    </button>
                                </>
                            ))
                        }

                        <input id="gerichtField"
                            className="col-span-4"
                            style={{borderRadius: '5px', marginLeft: '10px'}}
                            onChange={(e) => { setGericht(e.target.value), validateButton() }}
                            type="text" placeholder="Zutat">
                                
                        </input>
                        <input id="kalorienField"
                            className="col-span-1"
                            style={{borderRadius: '5px'}}
                            required
                            min="0"
                            onChange={(e) => { setCalories(e.target.value), validateButton() }}
                            type="number" placeholder="kcal">
                        </input>
                        <input id="fatField"
                            className="col-span-1"
                            style={{borderRadius: '5px'}}
                            min="0"
                            onChange={(e) => { setFat(e.target.value), validateButton() }}
                            type="number" placeholder="fat">
                        </input>
                        <input id="proteinField"
                            className="col-span-1"
                            style={{borderRadius: '5px'}}
                            min="0"
                            onChange={(e) => { setProtein(e.target.value), validateButton() }}
                            type="number" placeholder="protein">
                        </input>
                        <input id="carbsField"
                            className="col-span-1"
                            style={{borderRadius: '5px'}}
                            min="0"
                            onChange={(e) => { setCarbs(e.target.value), validateButton() }}
                            type="number" placeholder="carbs">
                        </input>
                        
                        <button disabled={buttonEnabled}
                            onClick={() => { addGericht(), clearFields() }}
                            className="material-icons modal-line-tag rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            +
                        </button>
                        <div className="col-span-4"></div>
                        <button onClick={addToDatabase}
                            className="button-normal  rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        style={{marginLeft: '10px', marginRight: '10px', marginBottom: '5px'}}
                        >
                            Add to DB
                        </button>
                        </div>
                </div>
                {gerichte && gerichte.length > 0 && gerichte.filter(element => element.date.startsWith(datum.split("T")[0])).map((singleGericht, index) => (
                        <div className="w-full h-fit  bg-gray-200" key={index} style={{ marginBottom: '20px', marginTop: '10px', borderRadius: '10px', flexDirection: 'column', backgroundColor: 'var(--tiles)', color: 'var(--text-white)'}}>
                        <div>
                        <div className="grid grid-cols-2">
                            <div id="left" className="header1 ml-2 col-span-1">
                            {singleGericht.title}
                            </div>
                            <div id="right" className="col-span-1 flex h-fit text-left justify-end font-bold" style={{marginRight:'5px'}}>
                                Kc: {singleGericht.summeKalorien} |
                                P: {singleGericht.summeProtein} |
                                F: {singleGericht.summeFett} |
                                C: {singleGericht.summeCarbs}
                            </div>
                        </div>
                            <div className="grid grid-cols-3">
                           
                            <div className="col-span-1 flex h-fit justify-left" style={{ marginLeft: '50px', marginTop: '10px' }}>
                            {singleGericht.list && singleGericht.list.length > 0 && (
                                <div>
                                {singleGericht.list.map((zutat, zutatIndex) => (
                                    <div key={zutatIndex} style={{fontWeight: 500, marginHeight: '40px'}} className=" caloriesAaron header3">{zutat.name} 
                                    <br></br>
                                    </div>
                                ))}
                                </div>
                            )}
                            
                            </div>
                            <div className="col-span-2 flex h-fit justify-end text-right pr-8" style={{ marginTop: '10px' }}>
                            {singleGericht.list && singleGericht.list.length > 0 && (
                                <div>
                                {singleGericht.list.map((zutat, zutatIndex) => (
                                    <div key={zutatIndex}>
                                    <div className="flex flex-col p-2 caloriesAaron">
                                        <div style={{fontWeight: 400}}> 
                                           kc: {zutat.calories} | f: {zutat.fat} | p: {zutat.protein} | c: {zutat.carbs}<br></br>
                                        </div>
                                    </div> 
                                    </div>
                                ))}
                                </div>
                            )}
                            </div>
                            </div>
                        </div>
                        <div className="col-span-1 flex h-fit justify-center">
                        <button
                            onClick={() => {
                            deleteMahlzeit(index, singleGericht._id);
                            }}
                            className="justify-center delete-button bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded col-span-full"
                        >
                            delete
                        </button>
                        </div>
                        </div>
                    ))
                    }








            </div>
            <div className="bottom-margin"></div>
        </>

    )
}

/*{gerichte && gerichte.length > 0 && gerichte.filter(element => element.date.startsWith(datum.split("T")[0])).map((singleGericht, index) => (
                        <div className="w-full h-fit  bg-gray-200" key={index} style={{ marginBottom: '10px', marginTop: '10px', borderRadius: '10px', flexDirection: 'column', backgroundColor: 'var(--tiles)', color: 'var(--text-white)'}}>
                        <div>
                        <div className="grid grid-cols-2">
                            <div id="left" className="header1 ml-2 font-bold text-xl col-span-1">
                            {singleGericht.title}
                            </div>
                            <div id="right" className="col-span-1 flex h-fit justify-cente">
                                Kc: {singleGericht.summeKalorien} |
                                P: {singleGericht.summeProtein} |
                                F: {singleGericht.summeFett} |
                                C: {singleGericht.summeCarbs}
                            </div>
                        </div>
                            <div className="grid grid-cols-2">
                            <div id="right" className="col-span-1 flex h-fit justify-left" style={{ marginLeft: '50px', marginTop: '10px' }}>
                            {singleGericht.list && singleGericht.list.length > 0 && (
                                <div>
                                {singleGericht.list.map((zutat, zutatIndex) => (
                                    <div key={zutatIndex} style={{height: "88px", fontWeight: 500}} className="header3">{zutat.name}
                                    <div className="flex flex-col p-2" >
                                        <div style={{marginTop:'2px', fontSize: '14px', fontWeight: 400}}> 
                                           F:{zutat.fat} P:{zutat.protein} C:{zutat.carbs}
                                           <br></br>
                                        </div>
                                    </div> 
                                    </div>
                                ))}
                                </div>
                            )}
                            </div>
                            <div id="right" className="col-span-1 flex h-fit justify-end text-right pr-8" style={{ marginTop: '20px' }}>
                            {singleGericht.list && singleGericht.list.length > 0 && (
                                <div>
                                {singleGericht.list.map((zutat, zutatIndex) => (
                                    <div key={zutatIndex} style={{ height: '88px'}}>
                                    <div className="flex flex-col p-2">
                                        <div style={{fontWeight: 500}}> 
                                           {zutat.calories}kcal
                                        </div>
                                    </div> 
                                    </div>
                                ))}
                                </div>
                            )}
                            </div>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                            deleteMahlzeit(index, singleGericht._id);
                            }}
                            className="mx-auto delete-button bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded col-span-full"
                        >
                            delete
                        </button>
                        </div>
                    ))
                    }*/


//element=>element.date.toISOString().slice(0, 10) === selectedDate.toISOString().slice(0, 10)

/*{singleGericht.list && singleGericht.list.length > 1 ? (
    <div>
      
        {singleGericht.list.map((zutat, zutatIndex) => (
        <div>
            -----------------------------------------------------------
        </div>
        ))}
    </div>
) : (
    <div>
    </div>
)}*/

/*<div id="left" className="col-span-1 flex h-fit justify-center bg-gray-200">
<div className="flex flex-col bg-gray-200 p-4">
    <div>Kalorien: {singleGericht.summeKalorien}</div>
    <div>Protein: {singleGericht.summeProtein}</div>
    <div>Fett: {singleGericht.summeFett}</div>
    <div>Carbs: {singleGericht.summeCarbs}</div>
</div>
</div>*/

/*{gerichte && gerichte.length > 0 && gerichte.filter(element => element.date.startsWith(datum.split("T")[0])).map((singleGericht, index) => (
    <div className="w-full h-fit  bg-gray-200" key={index}>
    <div className="grid grid-cols-2">
        <div className="ml-2 font-bold text-xl col-span-full">
        {singleGericht.title}
        </div>
        <div id="left" className="col-span-1 flex h-fit justify-center bg-gray-200">
        <div className="flex flex-col bg-gray-200 p-4">
            <div>Kalorien: {singleGericht.summeKalorien}</div>
            <div>Protein: {singleGericht.summeProtein}</div>
            <div>Fett: {singleGericht.summeFett}</div>
            <div>Carbs: {singleGericht.summeCarbs}</div>
        </div>
        </div>
        <div id="right" className="col-span-1 flex h-fit justify-center bg-gray-200">
        {singleGericht.list && singleGericht.list.length > 0 && (
            <div>
            {singleGericht.list.map((zutat, zutatIndex) => (
                <div key={zutatIndex}>{zutat.name}
                <div className="flex flex-col p-2">
                    <div> 
                        kc:{zutat.calories} f:{zutat.fat} p:{zutat.protein} c:{zutat.carbs}
                    </div>
                </div> 
                </div>
            ))}
            </div>
        )}
        </div>
</div>
    <button
        onClick={() => {
        deleteMahlzeit(index, singleGericht._id);
        }}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded col-span-full"
    >
        delete
    </button>
    </div>
))
}*/

/*<div className="col-span-1 flex h-fit justify-center bg-gray-200">
                        <div className="flex flex-col p-4">
                            <div>Kc:{singleGericht.calories} f:{singleGericht.fat} p:{singleGericht.protein} c:{singleGericht.carbs}</div>
                        </div>
                        </div>*/

/*{
    gerichte && gerichte.length > 0 && gerichte.filter(element => element.date.startsWith(datum.split("T")[0])).map((singleGericht, index) => (
       <div className="grid h-80 w-full grid-cols-2 bg-gray-200" key={index}>
           <div className="flex flex-col">
               <div className="ml-2 font-bold text-xl">
               {singleGericht.title}
               </div>
                   <div id="left" className="col-span-1 flex h-80 justify center bg-blue-50">
                   <div>Kalorien: {singleGericht.summeKalorien}</div>
                   <div>Protein: {singleGericht.summeProtein}</div>
                   <div>Fett: {singleGericht.summeFett}</div>
                   <div>Carbs: {singleGericht.summeCarbs}</div>
               </div>
               <div id="right" className="col-span-1 flex h-80 justify center bg-blue-50">
               {singleGericht.list && singleGericht.list.length > 0 && (
                   <div>
                   {singleGericht.list.map((zutat, zutatIndex) => (
                       <div key={zutatIndex}>{zutat.name}</div>
                   ))}
                   </div>
               )}
               </div>
           </div>
           <button
               onClick={() => {
               deleteMahlzeit(index, singleGericht._id);
               }}
               className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded col-span-2"
           >
               delete
           </button>
       </div>
   ))
}*/

/*{
    gerichte && gerichte.length > 0 && gerichte.filter(element => element.date.startsWith(datum.split("T")[0])).map((singleGericht, index) => (
       <div className="w-full bg-gray-200 h-fit rounded-lg mt-2 mb-5" key={index}>
           <div id="left" className="col-span-1 flex h-80 justify center bg-blue-50">
               <div className="ml-2 font-bold text-xl">
               {singleGericht.title}
               </div>
                   <div className="ml-2">
                   <div>Kalorien: {singleGericht.summeKalorien}</div>
                   <div>Protein: {singleGericht.summeProtein}</div>
                   <div>Fett: {singleGericht.summeFett}</div>
                   <div>Carbs: {singleGericht.summeCarbs}</div>
               </div>
               <div id="right" className="col-span-1 flex h-80 justify center bg-blue-50">
               {singleGericht.list && singleGericht.list.length > 0 && (
                   <div>
                   {singleGericht.list.map((zutat, zutatIndex) => (
                       <div key={zutatIndex}>{zutat.name}</div>
                   ))}
                   </div>
               )}
               </div>
           </div>
           <button
               onClick={() => {
               deleteMahlzeit(index, singleGericht._id);
               }}
               className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded col-span-2"
           >
               delete
           </button>
       </div>
   ))
}*/


/*{
                    gerichte && gerichte.length > 0 && gerichte.filter(element=>element.date.startsWith(datum.split("T")[0])).map((singleGericht, index) => (
                        <>
                            <div className="w-full bg-gray-200 h-fit  rounded-lg mt-2 mb-5" key={index}>
                                <div className="flex flex-col">
                                    <div className="ml-2 font-bold text-xl">
                                        {singleGericht.title}
                                    </div>
                                        <div className = "ml-2">
                                            <div>Kalorien:{singleGericht.summeKalorien}</div>
                                            <div>Protein: {singleGericht.summeProtein}</div>
                                            <div>Fett: {singleGericht.summeFett}</div>
                                            <div>Carbs: {singleGericht.summeCarbs}</div>
                                        </div>
                                <div className="ml-auto pr-2">
                                {singleGericht.list && singleGericht.list.length > 0 && singleGericht.list.map((zutat, zutatIndex) => (
                                <div key={zutatIndex} >{zutat.name}</div>
                                ))}
                                </div>
                                <button onClick={() => { deleteMahlzeit(index, singleGericht._id) }} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded col-span-2">
                                        delete
                                    </button>
                                </div>
                            </div>
                        </>
                    ))
                }*/
export default gerichtForm