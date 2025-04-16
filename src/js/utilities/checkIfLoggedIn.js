/**
 * Checks if a user is logged in and calls the provided callback with the username if found.
 *
 * @param {Function} callback - A function that receives the logged-in username or null if not logged in.
 */
export function checkIfLoggedIn(callback) {
    const username = localStorage.getItem("petPalUserName");
    
    if (typeof callback === "function") {
        callback(username || null);
    }
}
