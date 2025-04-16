import { onLogout } from "../auth/logout";

/**
 * Attaches click listeners to all elements with the `logout-btn` class.
 *
 * When clicked, the user is prompted to confirm logout. If confirmed,
 * the `onLogout` function is called to clear user session and redirect.
 */
export function setLogoutListener() {
    const logoutButtons = document.querySelectorAll(".logout-btn");
    
    logoutButtons.forEach(button => {
        button.addEventListener("click", () => {
            const confirmed = confirm("Are you sure you want to log out?");
            if (confirmed) {
                onLogout();
            }
        });
    });
}
