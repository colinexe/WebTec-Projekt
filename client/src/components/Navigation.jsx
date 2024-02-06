import CookieConsent from "react-cookie-consent";
import { useNavigate, Navigate, Link } from "react-router-dom";

function Navigation() {
    


    return (
    <>
    <div>
        <CookieConsent
                location="bottom"
                buttonText="Verstanden!"
                cookieName="myAwesomeCookieName2"
                style={{ background: "#2B373B" }}
                buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
                expires={150}
            >
                Diese Website nutzt essenzielle Cookies, um eine einwandfreie Funktion der Website zu ermöglichen.{" "}
                
            </CookieConsent>
    <div>
        <ul className="nav-bar">
        <li id="GerichtList" className="nav-icon"><Link to="/Home">Home</Link></li>
        <li id="GerichtForm" className="nav-icon"><Link to="/gerichtForm" >Gerichte</Link></li>
        <li id="WorkoutList" className="nav-icon"><Link to="/workoutList"> Workouts</Link></li>
        <li id="FAQ"  className="nav-icon FAQ-button"><Link to="/FAQ">FAQ</Link></li>
        
        </ul>
        <div>
            <a className="button-normal" 
        href="/logout">Log Out</a></div>
    </div>
    </div>
    </>
    )
}
export default Navigation