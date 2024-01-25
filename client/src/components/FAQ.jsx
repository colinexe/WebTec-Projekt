import { useState } from "react";
import { useEffect } from "react";
import React from 'react'

import { Link } from "react-router-dom";

function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleAccordionClick = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const menuItems = [
        { title: 'Section 1', content: 'Lorem ipsum 1...' },
        { title: 'Section 2', content: 'Lorem ipsum 2...' },
        { title: 'Section 3', content: 'Lorem ipsum 3...' },
    ];

    return (
        <>
            <div className="accordion-menu">
                {menuItems.map((item, index) => (
                    <div key={index} className={`accordion-item ${activeIndex === index ? 'active' : ''}`}>
                        <button className="accordion-title accordion" onClick={() => handleAccordionClick(index)}>
                            {item.title}
                        </button>
                        <div className="accordion-content panel" style={{ display: activeIndex === index ? 'block' : 'none' }}>
                            <p>{item.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
export default FAQ