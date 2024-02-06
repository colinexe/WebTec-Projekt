import { useState } from "react";
import { useEffect } from "react";
import React from 'react'
import Navigation from "./Navigation";
import FaqContent from "./faqContent.jsx";
import { Link } from "react-router-dom";

function FAQ() {


    return (
        <>
            <div className='h-11'></div>
            
            <div><Navigation /></div>
            <h1 className="text-2xl font-bold flex justify-center items-center">FAQ</h1>
            <div><FaqContent /></div>
      
            
        </>
    );
}
export default FAQ