import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        width: "100%",
        maxWidth: 500
    }
});

export default function Settings(props) {
    const classes = useStyles();

    return (
        <div className="container">
            <div className={classes.root}>
                <Typography variant="h2" gutterBottom>
                    {props.pageName}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    caption text
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Welcome to {props.pageName}
                </Typography>
            </div>
        </div>
    );
}
