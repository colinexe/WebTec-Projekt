import { useState } from "react";
import { useEffect } from "react";
import React from 'react'
import Navigation from "./Navigation";


import { Link } from "react-router-dom";

function faqContent() {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleAccordionClick = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const menuItems = [
        { title: "What's the best type of workout for beginners?", content: "Beginners should start with a balanced routine that includes cardio, strength training, and flexibility exercises. Activities like walking, swimming, or beginner-friendly group fitness classes are great options." },
        { title: "What's the importance of rest days in a workout schedule?", content: "Rest days are crucial for allowing your muscles to recover and repair, reducing the risk of overuse injuries, preventing burnout, and allowing for optimal performance during workouts." },
        { title: "How long should my workouts be?", content: "The duration of your workout depends on your fitness level and goals. Aim for at least 150 minutes of moderate-intensity exercise or 75 minutes of vigorous exercise per week, spread out over several days." },
        { title: 'Section 4', content: 'Lorem ipsum 4...' },
        { title: 'Section 5', content: 'Lorem ipsum 5...' },
    ];

    return (
        <>
            
      
            <div className="accordion-menu">
                {menuItems.map((item, index) => (
                    <div key={index} className={`accordion-item ${activeIndex === index ? 'active' : ''}`}>
                        <button className="accordion-title accordion flex" onClick={() => handleAccordionClick(index)}>
                            <span className="header3 font-semibold flex-1">{item.title}</span>
                            <span className="material-icons flex-none button-color">expand_more</span>
                        </button>
                        <div className="accordion-content panel p p-color" style={{ display: activeIndex === index ? 'block' : 'none' }}>
                            <p>{item.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
export default faqContent