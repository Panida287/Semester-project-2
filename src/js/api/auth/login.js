import { API_AUTH_LOGIN } from "../constants";
import { renderHeaders } from "../headers";

/**
 * Logs in a user by sending credentials to the login API and stores the access token on success.
 *
 * @async
 * @param {Object} userCredentials - User's login credentials.
 * @param {string} userCredentials.email - The user's email address.
 * @param {string} userCredentials.password - The user's password.
 * @returns {Promise<Object|undefined>} Resolves with server response if successful, otherwise undefined.
 */
export async function login({ email, password }) {
    const errorDiv = document.querySelector(".error-msg");
    
    try {
        const response = await fetch(API_AUTH_LOGIN, {
            method: "POST",
            headers: await renderHeaders(),
            body: JSON.stringify({ email, password }),
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            const errorMsg = result.errors?.[0]?.message || "Unknown error occurred.";
            if (errorDiv) errorDiv.textContent = errorMsg;
            return;
        }
        
        if (result.data?.accessToken) {
            localStorage.setItem("accessToken", result.data.accessToken);
            localStorage.setItem("petPalUserName", result.data.name);
        }
        
        return result;
    } catch (error) {
        if (errorDiv) errorDiv.textContent = `${error.message}`;
    }
}
