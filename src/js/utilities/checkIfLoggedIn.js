export function checkIfLoggedIn(callback) {
    const username = localStorage.getItem("petPalUserName");

    if (username && typeof callback === "function") {
        callback(username);
    } else {
        if (typeof callback === "function") {
            callback(null);
        }
    }
}
