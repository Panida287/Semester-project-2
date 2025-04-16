import { register } from "../../api/auth/register.js";

/**
 * Handles the registration form submission.
 *
 * Prevents default submission, gathers input data, and calls the `register` API function.
 * Displays a success modal on success, or an error message on failure (handled inside `register.js`).
 *
 * @async
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>}
 */
export async function onRegister(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById("userName").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        repeatPassword: document.getElementById("repeat-password").value,
        avatar: document.getElementById("avatar")?.value || null,
    };
    
    await register(formData);
}
