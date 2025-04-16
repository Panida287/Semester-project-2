import { login } from "../../api/auth/login.js";

/**
 * Handles the login form submission by preventing default form behavior,
 * retrieving email and password, and calling the API to log the user in.
 *
 * If the login is successful, the user is redirected to the homepage.
 *
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} Redirects the user to the homepage on success or does nothing if login fails.
 */
export async function onLogin(event) {
    event.preventDefault();
    
    const formData = {
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value.trim(),
    };
    
    const result = await login(formData);
    
    if (result?.data) {
        window.location.href = "/";
    }
}
