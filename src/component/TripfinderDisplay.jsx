import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";

import GetTripByTripCode from "../api/GetTripByTripCode";

const useStyles = makeStyles({
    card: {
        maxWidth: 345
    },
    media: {
        height: 140
    },
    root: {
        width: "100%"
    }
});

export default function TripCodeLookup() {
    const classes = useStyles();
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
    const [tripCode, setTripCode] = useState("");
    const [tripName, setTripName] = useState("");
    const [tripActivityLevel, setTripActivityLevel] = useState("");
    const [tripPhoto, setTripPhoto] = useState(null);
    const [tripSupport, setTripSupport] = useState("");
    const [tripUrl, setTripUrl] = useState("");
    // const [tripSupport, setTripSupport] = useState("No Trip Support");
    // const [tripSupport, setTripSupport] = useState("No Trip Support");

    //PUSH CHANGES THROUGH USEEFFECT();
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `${tripName} - B&R`;
    });

    const tripList = JSON.parse(sessionStorage.getItem("tripFinderData"))
        .tripFinderData;

    console.log(tripList);

    const tripNames = tripList.map(trip => trip.tripDetails.p15_tripname);

    const tripFinderArray = tripList.map(trip => ({
        tripName: trip.tripDetails.p15_tripname,
        startDate: trip.tripDetails.p15_startdate,
        endDate: trip.tripDetails.p15_enddate,
        price: trip.tripDetails.pp_in_a_double_room,
        departureId: trip.tripDetails.p15_tripdeparturesid
    }));

    console.log(tripFinderArray);

    function uniq(a) {
        var prims = { boolean: {}, number: {}, string: {} },
            objs = [];

        return a.filter(function(item) {
            var type = typeof item;
            if (type in prims)
                return prims[type].hasOwnProperty(item)
                    ? false
                    : (prims[type][item] = true);
            else return objs.indexOf(item) >= 0 ? false : objs.push(item);
        });
    }

    let uniqueTripNames = uniq(tripNames);

    const tripListByUniqueName = uniqueTripNames.map(uniqueTrip => {
        return <li>{uniqueTrip}</li>;
    });

    const tripListByName = tripList.map(listItems => {
        return <li>{listItems.tripDetails.p15_tripname}</li>;
    });

    const tripNameAndDepature = tripFinderArray.map(trip => {
        return (
            <li key={trip.departureId}>
                <h2>{trip.tripName}</h2>
                <ul>
                    <li>Departure Date - {trip.startDate} </li>
                    <li>Trip Price - {trip.price}</li>
                </ul>
            </li>
        );
    });

    //RENDER
    return (
        <div className="container">
            <div className={classes.root}>
                <div>
                    <ul>{tripNameAndDepature}</ul>
                </div>
            </div>
        </div>
    );
}
