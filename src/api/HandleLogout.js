export default function HandleLogout() {
    localStorage.setItem("email", "");
    localStorage.setItem("sessionID", "");
    localStorage.setItem("contactID", "");
    localStorage.setItem("loggedIn", "false");

    sessionStorage.setItem("upcomingTrips", []);
}
