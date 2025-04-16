import { onLogout } from "../auth/logout";
import { showConfirmModal } from '../../utilities/modal.js';

/**
 * Attaches click listeners to all elements with the `logout-btn` class.
 * Uses a confirmation modal instead of `confirm()`.
 */
export function setLogoutListener() {
    const logoutButtons = document.querySelectorAll(".logout-btn");
    
    logoutButtons.forEach(button => {
        button.addEventListener("click", async () => {
            const confirmed = await showConfirmModal("Are you sure you want to log out?");
            if (confirmed) {
                onLogout();
            }
        });
    });
}

