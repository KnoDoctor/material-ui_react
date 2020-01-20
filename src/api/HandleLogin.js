import SHA512 from "crypto-js/sha512";

//Bring In API
import GetUpcomingTrips from "../api/GetUpcomingTrips";

export default function handleSubmit(event, email, password) {
    event.preventDefault();
    const e = email;
    const p = password;
    let hashed = ("" + SHA512(p)).toUpperCase();
    let HASHED =
        "41787F243914926D0CD7473CDBF3785C5782AC466850862A379094F31E20850D185D769515A10988A6A7A4403884169C29A3C56FC3F7A59F7BF1E2F2BF0A38C9";
    console.log(HASHED);

    console.log(`Login Attempted with the following credentials: \n
          email: ${e} \n
          password: ${p} \n
          hashed:${hashed}`);

    //LOGIN
    //https://endpoint.scribesoft.com/v1/orgs/3487/requests/8249?accesstoken=0bdb0da4-816c-436f-adfd-582a3947c135
    var DT_start = new Date();
    var XHTTPR = new XMLHttpRequest();
    var O_ask = {
        userEmail: e,
        userPassword: HASHED
    };
    //var O_ask={'userEmail':'pgorbunov@gmail.com','userPassword':'1234567890!'};
    XHTTPR.open(
        "POST",
        "https://endpoint.scribesoft.com/v1/orgs/3487/requests/8249?accesstoken=0bdb0da4-816c-436f-adfd-582a3947c135",
        false
    );
    XHTTPR.setRequestHeader("Content-type", "application/json");
    XHTTPR.send(JSON.stringify(O_ask));
    // console.log(
    //   XHTTPR.responseText +
    //     "\n\n\nCall took " +
    //     String(new Date() - DT_start) +
    //     "ms"
    // );
    let responseTime = String(new Date() - DT_start);

    let responseObject = JSON.parse(XHTTPR.response);
    console.log(responseObject);

    let loginSuccess = responseObject.loginResponse[0].success;
    console.log(loginSuccess);

    if (loginSuccess) {
        let sessionData = responseObject.loginResponse[0].sessionData[0];
        let sessionID = sessionData.sessionID;
        let contactID = sessionData.contactid;

        console.log(`Login Result: \n
          Login Successful: ${loginSuccess} \n
          Response Time: ${responseTime} ms \n
          Contact ID: ${contactID} \n
          Session ID: \n ${sessionID}`);

        localStorage.setItem("email", e);
        localStorage.setItem("sessionID", sessionID);
        localStorage.setItem("contactID", contactID);
        localStorage.setItem("loggedIn", "true");

        GetUpcomingTrips();

        // console.log(this.state);
    } else {
        let loginFailMessage = responseObject.loginResponse[0].message;
        console.log(loginFailMessage);
        localStorage.setItem("email", "");
        localStorage.setItem("sessionID", "");
        localStorage.setItem("contactID", "");
        localStorage.setItem("loggedIn", "false");
    }
    window.location = "/";
}
