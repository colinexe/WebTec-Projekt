import { useState } from "react";
import { useEffect } from "react";
import React from 'react'
import Navigation from "./Navigation";
import FaqContent from "./faqContent.jsx";
import ImpressumYac from "../assets/images/ImpressumYac.png"
import { Link } from "react-router-dom";

function Impressum() {
    const [loading, setLoading] = useState(true)
    const [workouts, setWorkouts] = useState()

    async function fetchData() {
        const res = await fetch("/workouts/all");
        const data = await res.json();
        setWorkouts(data)
        setLoading(false)
    }
    useEffect(() => {
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
                <div className="FAQ-visibility"><FaqContent />
                
                </div>
            </div>
            <p className="header1 flex justify-center items-center">Impressum</p>
            <p className="center-content p p-color">
                <div className="p">Angaben gemäß § 5 TMG</div>
                <div className="p">
                    Colin Geib
                </div>
                <div className="p">
                    Birkenstr. 15
                </div>
                <div className="p">
                    64569 Nauheim
                </div>
                <div className="p">
                    Telefon: 0151 72321487
                </div>
                <div className="p">
                    E-Mail: colin.geib.03@gmail.com
                </div>
                <div className="h-6">

                </div>

                <div className="p">
                    Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.
                    Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
                    Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.
                </div>
            </p>
            <div className="flex justify-center">
                <img src={ImpressumYac} alt="Logo" width="15%" height="15%" className="only-desktop"/>
                <img src={ImpressumYac} alt="Logo" width="80%" height="80%" className="only-mobile"/>
            </div>
            <div className="bottom-margin"></div>
        </>
    );
}
export default Impressum