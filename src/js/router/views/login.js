import { onLogin } from "../../ui/auth/login";

const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", () => {
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;

    togglePassword.innerHTML =
        type === "password"
            ? "<i class=\"fas fa-eye\"></i>"
            : "<i class=\"fas fa-eye-slash\"></i>";
});

const form = document.forms.login;

/**
 * Adds a submit event listener to the login form.
 *
 * When the form is submitted, the `onLogin` function is called to handle the login process.
 */
form.addEventListener("submit", onLogin);

