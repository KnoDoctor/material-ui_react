import React, { useState, useEffect } from "react";

// //Bring In API
// import GetUpcomingTrips from "../api/GetUpcomingTrips";

// GetUpcomingTrips();

export default function Counter(props) {
    //MANAGE FUNCTION STATE
    const [count, setCount] = useState(0);
    const [message, setMessage] = useState("");
    const [loginState] = useState(JSON.parse(localStorage.getItem("loggedIn")));

    //USE STATE(effect) ACROSS FUNCTIONS
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `${count} - ${message}`;
    });

    //RENDER

    if (loginState === false) {
        return (
            <div>
                <h1>Logged Out</h1>
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
    // return (
    //     <div>
    //         <p>{message}</p>
    //         <button
    //             onClick={() =>
    //                 setMessage(
    //                     JSON.parse(sessionStorage.getItem("upcomingTrips"))
    //                         .upcomingTrips[0].p15_departuresguestsidname
    //                 )
    //             }
    //         >
    //             Next Departure
    //         </button>
    //         <button
    //             onClick={() =>
    //                 setMessage(
    //                     JSON.parse(sessionStorage.getItem("upcomingTrips"))
    //                         .upcomingTrips[0].p15_name
    //                 )
    //             }
    //         >
    //             Guest Name
    //         </button>
    //         <p>You clicked {count} times</p>
    //         <button onClick={() => setCount(count - 1)}>-1</button>
    //         <button onClick={() => setCount(count + 1)}>+1</button>
    //     </div>
    // );
}
