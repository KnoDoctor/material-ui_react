import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Navigation from "./component/Navigation";
import Calendar from "./component/Calendar";

//Bring in React Router
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// //Bring In API
// import GetUpcomingTrips from "./api/GetUpcomingTrips";

// //Call APIs
// GetUpcomingTrips();

//Setup App Routes
const appRoutes = {
    Home: {
        pageName: "Home",
        url: "/"
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
