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
        { title: "Warum sollte ich Yac-Fitness benutzen um mein Training zu tracken?", content: "Das Tracken deines Workouts ist entscheidend, um Fortschritt zu messen, Motivation aufrechtzuerhalten und effizienter zu trainieren. Es ermöglicht dir, deine Leistung zu optimieren und langfristig gesunde Trainingsgewohnheiten zu entwickeln." },
        { title: "Was sollte ich als Anfänger trainieren?", content: "Als Anfänger sollte man eine balancierte Routine zu finden. Diese sollte Gewichtstraining und Cardio beinhalten. Dabei sollte man das Dehnen nicht vergessen, um Verletzungen zu vermeiden und die körperliche Flexibilität zu verbessern. Neben dem Fitness-Studio sind Aktivitäten wie Joggen, Schwimmen oder Fitness-Kurse eine gute Option." },
        { title: "Wie lange sollte ich trainieren?", content: "Die Länge der einzelnen Workouts hängt von deinem Fitness-Level ab. Generell sollte man sich mindestens 150 mins moderates oder 75 mins intensives Training pro Woche ansteuern. Diese Zeit kann man sich frei über die Woche verteilen." },
        {
            "title": "Wie sollte ich meine Ernährung planen?",
            "content": "Um fit zu bleiben, sollten Männer und Frauen eine ausgewogene Ernährung anstreben, die aus einer angemessenen Menge an Protein, Kohlenhydraten und gesunden Fetten besteht. \nFür Frauen: Die durchschnittliche empfohlene tägliche Kalorienzufuhr liegt zwischen 1600 und 2400 Kalorien pro Tag.\nFür Männer: Die durchschnittliche empfohlene tägliche Kalorienzufuhr liegt zwischen 2000 und 3000 Kalorien pro Tag."
          },
        { title: 'Warum sind Rest Days so wichtig?', content: 'Rest Days sind wichtig, um deinen Muskeln genug Zeit zu geben, sich zu regenerieren. Das reduziert das Risiko von Verletzungen, verhindert Überanstrengung und erlaubt optimale Leistung im nächsten Training.' },
          
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