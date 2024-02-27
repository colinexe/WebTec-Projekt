import { useState } from "react";
import { useEffect } from "react";
import React from 'react'
import Navigation from "./Navigation";
import FaqContent from "./faqContent.jsx";
import { Link } from "react-router-dom";

function FAQ() {


    return (
        <>
            <div className='top-margin'></div>
            
            <div><Navigation /></div>
            <h1 className="flex justify-center items-center header1">FAQ</h1>
            <div><FaqContent /></div>
      
            <div className="bottom-margin"></div>
        </>
    );
}
export default FAQ