export function checkIfLoggedIn(callback) {
    const userName = localStorage.getItem("petPalUserName");

    if (userName) {
        console.log("User is logged in as:", userName);

        if (typeof callback === "function") {
            callback(userName);
        }

        return userName;
    } else {
        console.warn("User not logged in.");
        return null;
    }
}
