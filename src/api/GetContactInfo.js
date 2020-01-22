export default function GetContactInfo() {
    const email = localStorage.getItem("email");
    const sessionID = localStorage.getItem("sessionID");

    var XHTTPR = new XMLHttpRequest();
    var O_ask = {
        userEmail: email,
        sessionID: sessionID
    };
    XHTTPR.open(
        "POST",
        "http://wwwrebuild.butterfield.com/mbrAPI?op=getContactInfo",
        false
    );
    XHTTPR.setRequestHeader("Content-type", "application/json");
    XHTTPR.send(JSON.stringify(O_ask));

    let responseObject = JSON.parse(XHTTPR.response);

    console.log(responseObject);

    let contactInfo = responseObject;

    sessionStorage.setItem(
        "contactInfo",
        JSON.stringify({ contactInfo: contactInfo })
    );

    // if (tripData.success === false) {
    //     localStorage.setItem("loggedIn", false);
    // }

    //return upcomingTrips;
}
