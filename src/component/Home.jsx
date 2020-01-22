import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import Counter from "../testing/Counter";
import TripCodeLookup from "./TripCodeLookup";

const useStyles = makeStyles({
    root: {
        width: "100%",
        maxWidth: 500
    }
});

export default function Home(props) {
    const classes = useStyles();

    return (
        <div className="container">
            <div className={classes.root}>
                <Counter />
            </div>
        </div>
    );
}
