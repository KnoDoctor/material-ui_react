export default function GetBookingsNewEndpoint(searchEmail) {
    const email = searchEmail;
    // const sessionID = localStorage.getItem("sessionID");

    var XHTTPR = new XMLHttpRequest();
    var O_ask = {
        email: email
    };
    XHTTPR.open(
        "POST",
        "https://endpoint.scribesoft.com/v1/orgs/3487/requests/14444?accesstoken=0bdb0da4-816c-436f-adfd-582a3947c135",
        false
    );
    XHTTPR.setRequestHeader("Content-type", "application/json");
    XHTTPR.send(JSON.stringify(O_ask));

    let responseObject = JSON.parse(XHTTPR.response);

    console.log(responseObject);

    let getBookingsNewEndpoint = responseObject.brBookings[0];

    sessionStorage.setItem(
        "getBookingsNewEndpoint",
        JSON.stringify(getBookingsNewEndpoint)
    );

    // if (tripData.success === false) {
    //     localStorage.setItem("loggedIn", false);
    // }

    //return upcomingTrips;
}
