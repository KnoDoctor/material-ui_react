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
        width: "100%",
        maxWidth: 500
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
    const [tripPhoto, setTripPhoto] = useState("");
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

    //RENDER
    if (tripPhoto === "") {
        return (
            <div className="container">
                <div className={classes.root}>
                    <div>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="tripCode"
                            label="Trip Code"
                            type="tripCode"
                            id="tripCode"
                            autoComplete="current-trip"
                            value={tripCode}
                            onChange={event => setTripCode(event.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<Icon>search</Icon>}
                            onClick={function() {
                                GetTripByTripCode(tripCode);
                                setTripName(
                                    JSON.parse(
                                        sessionStorage.getItem("tripData")
                                    ).tripData.p15_tripname
                                );
                                setTripActivityLevel(
                                    JSON.parse(
                                        sessionStorage.getItem("tripData")
                                    ).tripData.br_activitylevel_displayname
                                );
                                setTripSupport(
                                    JSON.parse(
                                        sessionStorage.getItem("tripData")
                                    ).tripData.br_supportlevel_displayname
                                );
                                setTripPhoto(
                                    JSON.parse(
                                        sessionStorage.getItem("tripData")
                                    ).tripData.tripPhoto
                                );
                                setTripUrl(
                                    JSON.parse(
                                        sessionStorage.getItem("tripData")
                                    ).tripData.tripUrl
                                );
                            }}
                        >
                            Search for {tripCode}
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
                            <a href={tripUrl}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={tripPhoto}
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="h2"
                                        >
                                            {tripName}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                        >
                                            {tripActivityLevel} | {tripSupport}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </a>
                            <CardActions>
                                <Button
                                    size="small"
                                    color="primary"
                                    variant="contained"
                                    href="#"
                                >
                                    Start Planning
                                </Button>
                                <Button
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                    href={tripUrl}
                                >
                                    View Trip
                                </Button>
                            </CardActions>
                        </Card>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="tripCode"
                            label="Trip Code"
                            type="tripCode"
                            id="tripCode"
                            autoComplete="current-trip"
                            value={tripCode}
                            onChange={event => setTripCode(event.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<Icon>search</Icon>}
                            onClick={function() {
                                GetTripByTripCode(tripCode);
                                setTripName(
                                    JSON.parse(
                                        sessionStorage.getItem("tripData")
                                    ).tripData.p15_tripname
                                );
                                setTripActivityLevel(
                                    JSON.parse(
                                        sessionStorage.getItem("tripData")
                                    ).tripData.br_activitylevel_displayname
                                );
                                setTripSupport(
                                    JSON.parse(
                                        sessionStorage.getItem("tripData")
                                    ).tripData.br_supportlevel_displayname
                                );
                                setTripPhoto(
                                    JSON.parse(
                                        sessionStorage.getItem("tripData")
                                    ).tripData.tripPhoto
                                );
                                setTripUrl(
                                    JSON.parse(
                                        sessionStorage.getItem("tripData")
                                    ).tripData.tripUrl
                                );
                            }}
                        >
                            Search for {tripCode}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}
