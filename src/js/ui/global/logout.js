import {onLogout} from "../auth/logout";

/**
 * Adds click event listeners to all logout buttons.
 *
 * When a logout button is clicked, this function prompts the user for confirmation.
 * If the user confirms, it calls the `onLogout` function to log the user out.
 */
export function setLogoutListener() {
    const logoutButtons = document.querySelectorAll(".logout-btn");

    logoutButtons.forEach(button => {
        button.addEventListener("click", () => {
            const confirmation = window.confirm("Are you sure you want to log out?");
            if (confirmation) {
                onLogout();
            }
        });
    });
}
