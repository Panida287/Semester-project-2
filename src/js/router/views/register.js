import {setupPasswordToggles} from "../../utilities/togglePasswordVisibility.js";
import {onRegister} from "../../ui/auth/register.js";

setupPasswordToggles()


const form = document.forms.register;
/**
 * Adds a submit event listener to the registration form.
 *
 * When the form is submitted, the `onRegister` function is called to handle the registration process.
 */
form.addEventListener("submit", onRegister);