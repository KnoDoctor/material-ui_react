import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden"
    },
    icon: {
        color: "rgba(255, 255, 255, 0.54)"
    }
}));

export default function TripFinderDisplay() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
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
    let tripsNestedDepartures = [];

    let imageUrls = [];
    for (let i in uniqueTripNames) {
        imageUrls.push("https://picsum.photos/200/300?random=" + i);
    }

    console.log(tripsNestedDepartures);

    for (let i in uniqueTripNames) {
        let departures = [];
        for (let j in tripList) {
            if (tripList[j].tripDetails.p15_tripname === uniqueTripNames[i]) {
                let departureObject = {
                    startDate: tripList[j].tripDetails.p15_startdate,
                    departureCode: tripList[j].tripDetails.p15_departurecode
                };

                // departures.push(tripList[j].tripDetails.p15_startdate);
                // departures.push(tripList[j].tripDetails.p15_departurecode);
                departures.push(departureObject);
            }
        }
        // console.log(departures);

        tripsNestedDepartures.push({
            tripName: uniqueTripNames[i],
            tripImage: imageUrls[i],
            departures: departures
        });
    }

    console.log(tripsNestedDepartures);

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

    const tripsWithNestedDepartures = tripsNestedDepartures.map(trip => {
        return (
            <li key={trip.tripname}>
                <h2>{trip.tripName}</h2>
                <ul>
                    {trip.departures.map(departure => {
                        return <li>{departure.departureCode}</li>;
                    })}
                </ul>
            </li>
        );
    });

    const test = (
        <div className={classes.root}>
            <GridList cellHeight={360} cols={2} className={classes.gridList}>
                <GridListTile
                    key="Subheader"
                    cols={2}
                    style={{ height: "auto" }}
                >
                    <ListSubheader component="div">December</ListSubheader>
                </GridListTile>
                {tripsNestedDepartures.map(trip => (
                    <GridListTile>
                        <img src={trip.tripImage} alt={trip.tripName} />
                        <GridListTileBar
                            title={trip.tripName}
                            subtitle={<span>by: {trip.tripName}</span>}
                            actionIcon={
                                <IconButton
                                    aria-label={`info about ${trip.tripName}`}
                                    className={classes.icon}
                                >
                                    <InfoIcon />
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );

    //RENDER
    return (
        <div className="container">
            <div className={classes.root}>
                <div>
                    <ul>{tripsWithNestedDepartures}</ul>
                </div>
            </div>
        </div>
    );
}
