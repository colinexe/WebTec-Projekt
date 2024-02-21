import CookieConsent from "react-cookie-consent";
import { useNavigate, Navigate, Link } from "react-router-dom";
import IconApp from "../assets/images/IconApp.png";
import IconAppDesk from "../assets/images/IconAppDesk.png"
import CookieBanner from "../assets/images/CookieBanner.png"

function Navigation() {
    


    return (
    <>
    
    <div>
        
        <CookieConsent
                location="bottom"
                buttonText="Verstanden!"
                cookieName="myAwesomeCookieName2"
                style={{
                    background: "linear-gradient(to bottom, transparent , grey)",
                    textShadow: "2px 2px black",
                  }}
                buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
                expires={150}
               
                
            >
            <div className=" flex content-end m-0">
                <span className="pt-24">Diese Website nutzt essenzielle Cookies, um eine einwandfreie Funktion der Website zu ermöglichen.{}</span>
                <div className="relative">
                <img src={CookieBanner} alt="Logo" width="40%" height="40%" className="only-desktop"/>
                </div>
            </div>
        </CookieConsent>
   
    <div>
        <ul className="nav-bar">
        <Link to="/Home" className="nav-icon p-color">
            <span className="material-icons">home</span>
            Home
        </Link>
       <Link to="/gerichtForm" className="nav-icon p-color">
            <span className="material-icons">restaurant_menu</span>
            Gerichte
        </Link>
        <Link to="/workoutList" className="nav-icon p-color">
            <span className="material-icons">fitness_center</span>
            Workouts
        </Link>
        <Link to="/FAQ" className="nav-icon FAQ-button p-color">
            <span className="material-icons">quiz</span>
            FAQ
        </Link>
        <Link to="/Impressum" className="p nav-logout-desktop nav-logout">
            <span className="material-icons">info</span>
            <span className="nav-text p-color">Impressum</span>
        </Link>
        
        <a className="p nav-logout-desktop nav-logout" 
        href="/logout">
            <span className="material-icons">logout</span>
            <span className="nav-text p-color">Abmelden</span>
            </a>
        </ul>

        <p className="flex justify-center items-center only-mobile">
            <img src={IconApp} alt="Logo" className="only-mobile"/>
        </p>

        <p className="flex justify-center items-center only-desktop">
            <img src={IconAppDesk} alt="Logo" className="only-desktop"/>
        </p>
        

    <div className="flex items-center justify-between">
        <Link to="/Impressum" className="p nav-logout-mobile nav-logout ml-2">
            <span className="material-icons">info</span>
            
        </Link>
        <div className="icon-width"></div>
        <span className="nav-logout-desktop"></span>
        <a className="nav-logout nav-logout-mobile p-color mr-2" 
        href="/logout">
            <span className="material-icons">logout</span>
            
        </a>
        </div>
    </div>
    </div>
    </>
    )
}
export default Navigation