import React, { useState, useEffect } from "react";

export default function Counter() {
    //SET LOGIN STATE
    const [loginState] = useState(JSON.parse(localStorage.getItem("loggedIn")));

    //SET INITIAL STATE OF VARIABLES
    let initialMessage;
    if (loginState === false) initialMessage = "You are logged out";
    else {
        initialMessage = JSON.parse(sessionStorage.getItem("upcomingTrips"))
            .upcomingTrips[0].p15_name;
    }

    //MANAGE STATE OF VARIABLES
    const [count, setCount] = useState(0);
    const [message, setMessage] = useState(initialMessage);

    //PUSH CHANGES THROUGH USEEFFECT();
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `${count} - ${loginState} - ${message}`;
    });

    //RENDER
    if (loginState === false) {
        return (
            <div>
                <h1>Logged Out</h1>
                <p>{message}</p>
            </div>
        );
    } else {
        return (
            <div>
                <h1>Logged In</h1>
                <div>
                    <p>{message}</p>
                    <button
                        onClick={() =>
                            setMessage(
                                JSON.parse(
                                    sessionStorage.getItem("upcomingTrips")
                                ).upcomingTrips[0].p15_name
                            )
                        }
                    >
                        Get Guest Name
                    </button>
                    <button
                        onClick={() =>
                            setMessage(
                                JSON.parse(
                                    sessionStorage.getItem("upcomingTrips")
                                ).upcomingTrips[0].p15_departuresguestsidname
                            )
                        }
                    >
                        Get Next Departure
                    </button>
                    <p>You clicked {count} times</p>
                    <button onClick={() => setCount(count - 1)}>-1</button>
                    <button onClick={() => setCount(count + 1)}>+1</button>
                </div>
            </div>
        );
    }
}
