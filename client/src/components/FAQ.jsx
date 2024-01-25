import { useState } from "react";
import { useEffect } from "react";
import React from 'react'

import { Link } from "react-router-dom";

function FAQ() {

    const accordionToggle = () => {
        var acc = document.getElementsByClassName("accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
                /* Toggle between adding and removing the "active" class,
                to highlight the button that controls the panel */
                this.classList.toggle("active");

                /* Toggle between hiding and showing the active panel */
                var panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                    panel.style.display = "none";
                } else {
                    panel.style.display = "block";
                }
            });
        }
    }

    return (
        <>
            <button class="accordion" onClick={accordionToggle}>Section 1</button>
            <div class="panel">
                <p>Lorem ipsum...</p>
            </div>

            <button class="accordion" onClick={accordionToggle}>Section 2</button>
            <div class="panel">
                <p>Lorem ipsum...</p>
            </div>

            <button class="accordion" onClick={accordionToggle}>Section 3</button>
            <div class="panel">
                <p>Lorem ipsum...</p>
            </div>
        </>
    );
}
export default FAQ