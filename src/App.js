import React from "react";
import "./App.css";

import Navigation from "./component/Navigation";

//Bring in React Router
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//Bring In API
import GetUpcomingTrips from "./api/GetUpcomingTrips";
import GetTripFinderData from "./api/GetTripFinderData";

//Call APIs
GetUpcomingTrips();
GetTripFinderData();
// GetContactInfo();

//Setup App Routes
const appRoutes = {
    Home: {
        pageName: "Home",
        url: "/"
    },
    TripCodeLookup: {
        pageName: "Trip Code Lookup",
        url: "/trip-code-lookup"
    },
    TravellerLookup: {
        pageName: "Traveler Lookup",
        url: "/traveller-lookup"
    },
    TripfinderDisplay: {
        pageName: "Tripfinder Display",
        url: "/tripfinder-display"
    },
    Calendar: {
        pageName: "Calendar",
        url: "/calendar"
    },
    Settings: {
        pageName: "Settings",
        url: "/settings"
    },
    Login: {
        pageName: "Login",
        url: "/login"
    },
    Logout: {
        pageName: "Logout",
        url: "/logout"
    }
};

const message = "This is a homepage message";

function App() {
    return (
        <div className="App">
            <Router>
                <Navigation appRoutes={appRoutes} message={message} />
            </Router>
        </div>
    );
}

export default App;
