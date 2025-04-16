/**
 * Logs out the current user by clearing authentication data and redirecting to the homepage.
 *
 * This function removes the 'accessToken' and 'petPalUserName' from localStorage,
 * effectively ending the user's session. After clearing the data, it redirects
 * the user to the homepage.
 */
export function onLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("petPalUserName");
    window.location.href = "/";
}
