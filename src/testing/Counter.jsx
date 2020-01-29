import React, { useState, useEffect } from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import GetSubReddit from "../api/GetSubReddit";
import GetTripFinderData from "../api/GetTripFinderData";
import GetItineraryData from "../api/GetItineraryData";
import GetDepartures from "../api/GetDepartures";

export default function Counter() {
    //SET LOGIN STATE
    const [loginState] = useState(JSON.parse(localStorage.getItem("loggedIn")));

    //SET INITIAL STATE OF VARIABLES
    let initialMessage;
    let name;
    if (loginState === false) {
        initialMessage = "You are logged out";
        name = "";
    } else {
        initialMessage = JSON.parse(sessionStorage.getItem("upcomingTrips"))
            .upcomingTrips[0].p15_name;
        name =
            JSON.parse(sessionStorage.getItem("contactInfo")).contactInfo
                .p15_title +
            " " +
            JSON.parse(sessionStorage.getItem("contactInfo")).contactInfo
                .lastname;
    }

    //MANAGE STATE OF VARIABLES
    const [count, setCount] = useState(0);
    const [message, setMessage] = useState(initialMessage);
    const [tripCode, setTripCode] = useState("");
    const [tripName, setTripName] = useState("");
    const [tripActivityLevel, setTripActivityLevel] = useState("");
    const [tripSupport, setTripSupport] = useState("");
    const [userTitle, setUserTitle] = useState(name);
    const [subReddit, setSubReddit] = useState("");

    //PUSH CHANGES THROUGH USEEFFECT();
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `${count} - ${loginState} - ${message}`;
    });

    //RENDER
    if (loginState === false || loginState === null) {
        return (
            <div>
                <h1>Logged Out</h1>
                <p>{message}</p>
            </div>
        );
    } else {
        return (
            <div>
                <h1>Hello {name}</h1>
                <div>
                    <p>{message}</p>
                    <button
                        onClick={() =>
                            setMessage(
                                JSON.parse(
                                    sessionStorage.getItem("upcomingTrips")
                                ).upcomingTrips[0].p15_guestsid
                            )
                        }
                    >
                        Get Guest ID
                    </button>
                    <button
                        onClick={() =>
                            setMessage(
                                JSON.parse(
                                    sessionStorage.getItem("upcomingTrips")
                                ).upcomingTrips[0].p15_tripname
                            )
                        }
                    >
                        Get Next Departure
                    </button>
                    <p>You clicked {count} times</p>
                    <button onClick={() => setCount(count - 1)}>-1</button>
                    <button onClick={() => setCount(count + 1)}>+1</button>
                    <p></p>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="subReddit"
                        label="Sub Reddit"
                        type="subReddit"
                        id="subReddit"
                        autoComplete="current-trip"
                        value={subReddit}
                        onChange={event => setSubReddit(event.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={function() {
                            GetSubReddit(subReddit);
                            setMessage("Sub Reddit Request Complete");
                        }}
                    >
                        Get Sub Reddit Data
                    </Button>
                    <p></p>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={function() {
                            GetTripFinderData();
                        }}
                    >
                        Get Tripfinder Data
                    </Button>
                    <p></p>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={function() {
                            GetItineraryData();
                        }}
                    >
                        Get Itinerary Data
                    </Button>
                    <p></p>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={function() {
                            GetDepartures();
                        }}
                    >
                        Get 2020 Departure Data
                    </Button>
                </div>
            </div>
        );
    }
}
