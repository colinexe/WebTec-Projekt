import { useState } from "react";
import { useEffect } from "react";
import React from 'react'
import { Link } from "react-router-dom";

function gerichtList() {
    const [loading,setLoading] = useState(true)
    const [gerichte, setGerichte] = useState();

    async function fetchData(){
        const res = await fetch("/gerichte/all");
        const data = await res.json();
        setGerichte(data)
        setLoading(false)
    }

    useEffect(() =>{
        fetchData();
    },[])

    if(loading) return <div>Is Loading...</div>
    return (
    <>
        {
          gerichte.map((el, index) =>{
            return (
              <div  key={index}>
              <div className="flex flex-row">

             
              <div> {el.Gericht}</div>
              {/*<div> {el.producer}</div>*/}
              <div> {el.calories}</div>
              {/*<div> {el.fat}</div>
              <div> {el.carbohydrates}</div>
              <div> {el.protein}</div>*/}
             
            
            </div>
            </div>)
           
          })
        }
    </>

    )
}
export default gerichtList