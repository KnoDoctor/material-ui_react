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

import GetContactInfoNewEndpoint from "../api/GetContactInfoNewEndpoint";
import GetBookingsNewEndpoint from "../api/GetBookingsNewEndpoint";

const useStyles = makeStyles({
    card: {
        maxWidth: 480
    },
    media: {
        height: 140
    },
    root: {
        width: "100%",
        maxWidth: 500
    }
});

export default function TravellerLookup() {
    const classes = useStyles();
    //SET LOGIN STATE
    const [loginState] = useState(JSON.parse(localStorage.getItem("loggedIn")));

    //IMPORT KEY ENTITIES
    ////Contact - Summary
    // let contactSummary = JSON.parse(
    //     sessionStorage.getItem("contactInfoNewEndpoint")
    // ).contactSummary[0];
    // ////Contact - Preferences
    // let contactPreferences = JSON.parse(
    //     sessionStorage.getItem("contactInfoNewEndpoint")
    // ).contactPreferences[0];
    // ////Contact - Misc.
    // let usefulInfo = JSON.parse(
    //     sessionStorage.getItem("contactInfoNewEndpoint")
    // ).usefulInfo[0];

    //SET INITIAL STATE OF VARIABLES
    let initialMessage;
    if (loginState === false) initialMessage = "You are logged out";
    else {
        initialMessage = JSON.parse(sessionStorage.getItem("upcomingTrips"))
            .upcomingTrips[0].p15_name;
    }

    //MANAGE STATE OF VARIABLES
    ////Search
    const [searchCount, setSearchCount] = useState(0);
    const [search, setSearch] = useState("");
    ////Traveler Profile Card
    //////Key Details
    const [travelerName, setTravelerName] = useState("");
    const [travelerContactType, setTravelerContactType] = useState("");
    const [travelerNetWorth, setTravelerNetWorth] = useState("");
    const [travelerTripsCompleted, setTravelerTripsCompleted] = useState("");
    const [previousBookingOwner, setPreviousBookingOwner] = useState("");
    const [travelerMobilePhone, setTravelerMobilePhone] = useState("");
    const [travelerEmail, setTravelerEmail] = useState("");
    const [travelerUpcomingTrips, setTravelerUpcomingTrips] = useState("");
    //////Preferences
    const [travelerActiveInquiries, setTravelerActiveInquiries] = useState("");
    const [infoForTaAndTp, setInfoForTaAndTp] = useState("");
    const [infoForGuides, setInfoForGuides] = useState("");
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
        document.title = `${travelerName} - B&R`;
    });

    //RENDER
    if (searchCount === 0) {
        return (
            <div className="container">
                <div className={classes.root}>
                    <div>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="travellerEmail"
                            label="Traveller Email"
                            type="travellerEmail"
                            id="travellerEmail"
                            autoComplete="current-trip"
                            value={search}
                            onChange={event => setSearch(event.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<Icon>search</Icon>}
                            onClick={function() {
                                GetContactInfoNewEndpoint(search);
                                GetBookingsNewEndpoint(search);
                                setSearchCount(searchCount + 1);
                                setTravelerMobilePhone(
                                    JSON.parse(
                                        sessionStorage.getItem(
                                            "contactInfoNewEndpoint"
                                        )
                                    ).contactSummary[0].mobilephone
                                );
                                setTravelerEmail(
                                    JSON.parse(
                                        sessionStorage.getItem(
                                            "contactInfoNewEndpoint"
                                        )
                                    ).contactSummary[0].email
                                );
                                setTravelerContactType(
                                    JSON.parse(
                                        sessionStorage.getItem(
                                            "contactInfoNewEndpoint"
                                        )
                                    ).contactSummary[0]
                                        .p15_contacttype_contactidname
                                );
                                setPreviousBookingOwner(
                                    JSON.parse(
                                        sessionStorage.getItem(
                                            "contactInfoNewEndpoint"
                                        )
                                    ).usefulInfo[0].lastBookingOwner
                                );
                                setTravelerTripsCompleted(
                                    JSON.parse(
                                        sessionStorage.getItem(
                                            "contactInfoNewEndpoint"
                                        )
                                    ).usefulInfo[0].tripsCompleted
                                );
                                setTravelerUpcomingTrips(
                                    JSON.parse(
                                        sessionStorage.getItem(
                                            "contactInfoNewEndpoint"
                                        )
                                    ).usefulInfo[0].futureBookingsCount
                                );
                                setTravelerNetWorth(
                                    JSON.parse(
                                        sessionStorage.getItem(
                                            "contactInfoNewEndpoint"
                                        )
                                    ).contactSummary[0].br_networthrange
                                );
                                setInfoForTaAndTp(
                                    JSON.parse(
                                        sessionStorage.getItem(
                                            "contactInfoNewEndpoint"
                                        )
                                    ).contactPreferences[0].infoForTaAndTp
                                );
                                setInfoForGuides(
                                    JSON.parse(
                                        sessionStorage.getItem(
                                            "contactInfoNewEndpoint"
                                        )
                                    ).contactPreferences[0].infoForGuides
                                );
                                setTravelerName(
                                    JSON.parse(
                                        sessionStorage.getItem(
                                            "contactInfoNewEndpoint"
                                        )
                                    ).contactSummary[0].p15_title +
                                        " " +
                                        JSON.parse(
                                            sessionStorage.getItem(
                                                "contactInfoNewEndpoint"
                                            )
                                        ).contactSummary[0].firstname +
                                        " " +
                                        JSON.parse(
                                            sessionStorage.getItem(
                                                "contactInfoNewEndpoint"
                                            )
                                        ).contactSummary[0].lastname
                                );
                            }}
                        >
                            Lookup Traveller by Email: {search}
                        </Button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="container">
                <div className={classes.root}>
                    <div>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="h2"
                                    >
                                        Traveller: {travelerName}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p"
                                    >
                                        {travelerContactType}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p"
                                    >
                                        Net Worth: {travelerNetWorth}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p"
                                    >
                                        Trips Completed:{" "}
                                        {travelerTripsCompleted}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p"
                                    >
                                        Upcoming Trips Booked:{" "}
                                        {travelerUpcomingTrips}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p"
                                    >
                                        Previous Booking Owner:{" "}
                                        {previousBookingOwner}
                                    </Typography>
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        component="h2"
                                    >
                                        Contact Information
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p"
                                    >
                                        Mobile Phone:{" "}
                                        <a href={"tel:" + travelerMobilePhone}>
                                            {travelerMobilePhone}
                                        </a>
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p"
                                    >
                                        Email:{" "}
                                        <a href={"mailto:" + travelerEmail}>
                                            {travelerEmail}
                                        </a>
                                    </Typography>
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        component="h2"
                                    >
                                        Info for TA and TP:
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p"
                                    >
                                        {infoForTaAndTp}
                                    </Typography>
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        component="h2"
                                    >
                                        Info for Guides:
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p"
                                    >
                                        {infoForGuides}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button
                                    size="small"
                                    color="primary"
                                    variant="contained"
                                    href="#"
                                >
                                    View Profile
                                </Button>
                            </CardActions>
                        </Card>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="travellerEmail"
                            label="Traveller Email"
                            type="travellerEmail"
                            id="travellerEmail"
                            autoComplete="current-trip"
                            value={search}
                            onChange={event => setSearch(event.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<Icon>search</Icon>}
                            onClick={function() {
                                GetContactInfoNewEndpoint(search);
                                GetBookingsNewEndpoint(search);
                                setSearchCount(searchCount + 1);
                                setTravelerMobilePhone(
                                    JSON.parse(
                                        sessionStorage.getItem(
                                            "contactInfoNewEndpoint"
                                        )
                                    ).contactSummary[0].mobilephone
                                );
                                setTravelerEmail(
                                    JSON.parse(
                                        sessionStorage.getItem(
                                            "contactInfoNewEndpoint"
                                        )
                                    ).contactSummary[0].email
                                );
                                setTravelerContactType(
                                    JSON.parse(
                                        sessionStorage.getItem(
                                            "contactInfoNewEndpoint"
                                        )
                                    ).contactSummary[0]
                                        .p15_contacttype_contactidname
                                );
                                setPreviousBookingOwner(
                                    JSON.parse(
                                        sessionStorage.getItem(
                                            "contactInfoNewEndpoint"
                                        )
                                    ).usefulInfo[0].lastBookingOwner
                                );
                                setTravelerTripsCompleted(
                                    JSON.parse(
                                        sessionStorage.getItem(
                                            "contactInfoNewEndpoint"
                                        )
                                    ).usefulInfo[0].tripsCompleted
                                );
                                setTravelerUpcomingTrips(
                                    JSON.parse(
                                        sessionStorage.getItem(
                                            "contactInfoNewEndpoint"
                                        )
                                    ).usefulInfo[0].futureBookingsCount
                                );
                                setTravelerNetWorth(
                                    JSON.parse(
                                        sessionStorage.getItem(
                                            "contactInfoNewEndpoint"
                                        )
                                    ).contactSummary[0].br_networthrange
                                );
                                setInfoForTaAndTp(
                                    JSON.parse(
                                        sessionStorage.getItem(
                                            "contactInfoNewEndpoint"
                                        )
                                    ).contactPreferences[0].infoForTaAndTp
                                );
                                setInfoForGuides(
                                    JSON.parse(
                                        sessionStorage.getItem(
                                            "contactInfoNewEndpoint"
                                        )
                                    ).contactPreferences[0].infoForGuides
                                );
                                setTravelerName(
                                    JSON.parse(
                                        sessionStorage.getItem(
                                            "contactInfoNewEndpoint"
                                        )
                                    ).contactSummary[0].p15_title +
                                        " " +
                                        JSON.parse(
                                            sessionStorage.getItem(
                                                "contactInfoNewEndpoint"
                                            )
                                        ).contactSummary[0].firstname +
                                        " " +
                                        JSON.parse(
                                            sessionStorage.getItem(
                                                "contactInfoNewEndpoint"
                                            )
                                        ).contactSummary[0].lastname
                                );
                            }}
                        >
                            Lookup Traveller by Email: {search}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}
