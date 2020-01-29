export default function GetDepartures() {
    const email = localStorage.getItem("email");
    const sessionID = localStorage.getItem("sessionID");

    var XHTTPR = new XMLHttpRequest();
    var O_ask = {};
    XHTTPR.open(
        "POST",
        "https://endpoint.scribesoft.com/v1/orgs/3487/requests/14361?accesstoken=0bdb0da4-816c-436f-adfd-582a3947c135",
        false
    );
    XHTTPR.setRequestHeader("Content-type", "application/json");
    XHTTPR.send(JSON.stringify(O_ask));

    let responseObject = JSON.parse(XHTTPR.response);

    let departures = responseObject;

    console.log(departures);

    // sessionStorage.setItem(
    //     "upcomingTrips",
    //     JSON.stringify({ upcomingTrips: upcomingTrips })
    // );

    // if (upcomingTrips[0].success === false) {
    //     localStorage.setItem("loggedIn", false);
    // }

    //return upcomingTrips;
}
