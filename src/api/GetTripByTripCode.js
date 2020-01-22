export default function GetTripByTripCode(tripCode) {
    const tc = tripCode;

    var XHTTPR = new XMLHttpRequest();
    var O_ask = {
        tripCode: tc
    };
    XHTTPR.open(
        "POST",
        "https://endpoint.scribesoft.com/v1/orgs/3487/requests/14358?accesstoken=0bdb0da4-816c-436f-adfd-582a3947c135",
        false
    );
    XHTTPR.setRequestHeader("Content-type", "application/json");
    XHTTPR.send(JSON.stringify(O_ask));

    let responseObject = JSON.parse(XHTTPR.response);

    console.log(responseObject.data[0]);

    let tripData = responseObject.data[0];

    sessionStorage.setItem("tripData", JSON.stringify({ tripData: tripData }));

    if (tripData.success === false) {
        localStorage.setItem("loggedIn", false);
    }

    //return upcomingTrips;
}
