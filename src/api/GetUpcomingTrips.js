export default function GetUpcomingTrips() {
    const email = localStorage.getItem("email");
    const sessionID = localStorage.getItem("sessionID");

    var XHTTPR = new XMLHttpRequest();
    var O_ask = {
        userEmail: email,
        sessionID: sessionID
    };
    XHTTPR.open(
        "POST",
        "https://endpoint.scribesoft.com/v1/orgs/3487/requests/13667?accesstoken=0bdb0da4-816c-436f-adfd-582a3947c135",
        false
    );
    XHTTPR.setRequestHeader("Content-type", "application/json");
    XHTTPR.send(JSON.stringify(O_ask));

    let responseObject = JSON.parse(XHTTPR.response);

    let upcomingTrips = responseObject.getUpcomingTrips;

    sessionStorage.setItem(
        "upcomingTrips",
        JSON.stringify({ upcomingTrips: upcomingTrips })
    );

    //return upcomingTrips;
}
