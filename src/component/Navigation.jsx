import React from "react";

//Material-UI Stuff
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SettingsIcon from "@material-ui/icons/Settings";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import EventIcon from "@material-ui/icons/Event";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import CardTravelIcon from "@material-ui/icons/CardTravel";

//COMPONENTS
import Home from "./Home";
import Calendar from "./Calendar";
import Settings from "./Settings";
import Login from "./Login";
import TripCodeLookup from "./TripCodeLookup";
import TripfinderDisplay from "./TripfinderDisplay";

//API
import HandleLogout from "../api/HandleLogout";

//Router
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginRight: 36
    },
    hide: {
        display: "none"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap"
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        overflowX: "hidden",
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9) + 1
        }
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    }
}));

export default function Navigation(props) {
    const [loginState] = React.useState(
        JSON.parse(localStorage.getItem("loggedIn"))
    );
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    if (loginState === false || loginState === null) {
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: open
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Material App Skeleton | Logged Out
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open
                        })
                    }}
                    open={open}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === "rtl" ? (
                                <ChevronRightIcon />
                            ) : (
                                <ChevronLeftIcon />
                            )}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <Link to={props.appRoutes.Home.url}>
                            <ListItem button key="Home">
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItem>
                        </Link>
                    </List>
                    <Divider />
                    <List>
                        <Link to={props.appRoutes.Login.url}>
                            <ListItem button key="Login">
                                <ListItemIcon>
                                    <ThumbUpIcon />
                                </ListItemIcon>
                                <ListItemText primary="Login" />
                            </ListItem>
                        </Link>
                        {/* <Link to={props.appRoutes.Logout.url}>
                        <ListItem button key="Logout">
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </Link> */}
                    </List>
                </Drawer>
                <main className={classes.content} style={{ marginTop: "64px" }}>
                    <Switch>
                        <Route path={props.appRoutes.Login.url}>
                            <Login pageName={props.appRoutes.Login.pageName} />
                        </Route>
                        <Route path={props.appRoutes.Home.url}>
                            <Home
                                pageName={props.appRoutes.Home.pageName}
                                message={props.message}
                            />
                        </Route>
                    </Switch>
                </main>
            </div>
        );
    } else {
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: open
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Material App Skeleton | Logged In
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open
                        })
                    }}
                    open={open}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === "rtl" ? (
                                <ChevronRightIcon />
                            ) : (
                                <ChevronLeftIcon />
                            )}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <Link to={props.appRoutes.Home.url}>
                            <ListItem button key="Home">
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItem>
                        </Link>
                        <Link to={props.appRoutes.TripCodeLookup.url}>
                            <ListItem button key="TripCodeLookup">
                                <ListItemIcon>
                                    <SearchIcon />
                                </ListItemIcon>
                                <ListItemText primary="Trip Code Lookup" />
                            </ListItem>
                        </Link>
                        <Link to={props.appRoutes.TripfinderDisplay.url}>
                            <ListItem button key="TripfinderDisplay">
                                <ListItemIcon>
                                    <CardTravelIcon />
                                </ListItemIcon>
                                <ListItemText primary="Tripfinder Display" />
                            </ListItem>
                        </Link>
                        <Link to={props.appRoutes.Calendar.url}>
                            <ListItem button key="Calendar">
                                <ListItemIcon>
                                    <EventIcon />
                                </ListItemIcon>
                                <ListItemText primary="Calendar" />
                            </ListItem>
                        </Link>
                    </List>
                    <Divider />
                    <List>
                        <Link to={props.appRoutes.Settings.url}>
                            <ListItem button key="Settings">
                                <ListItemIcon>
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Settings" />
                            </ListItem>
                        </Link>
                        <ListItem button key="Logout" onClick={HandleLogout}>
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                        {/* <Link to={props.appRoutes.Logout.url}>
                        <ListItem button key="Logout">
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </Link> */}
                    </List>
                </Drawer>
                <main className={classes.content} style={{ marginTop: "64px" }}>
                    <Switch>
                        <Route path={props.appRoutes.TripCodeLookup.url}>
                            <TripCodeLookup />
                        </Route>
                        <Route path={props.appRoutes.TripfinderDisplay.url}>
                            <TripfinderDisplay />
                        </Route>
                        <Route path={props.appRoutes.Calendar.url}>
                            <Calendar />
                        </Route>
                        <Route path={props.appRoutes.Settings.url}>
                            <Settings
                                pageName={props.appRoutes.Settings.pageName}
                            />
                        </Route>
                        <Route path={props.appRoutes.Login.url}>
                            <Login pageName={props.appRoutes.Login.pageName} />
                        </Route>
                        <Route path={props.appRoutes.Home.url}>
                            <Home
                                pageName={props.appRoutes.Home.pageName}
                                message={props.message}
                            />
                        </Route>
                    </Switch>
                </main>
            </div>
        );
    }
}
