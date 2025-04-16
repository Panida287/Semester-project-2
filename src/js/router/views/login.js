/**
 * Initializes the login page by setting up password visibility toggles
 * and attaching the login submission handler.
 */

import { onLogin } from "../../ui/auth/login.js";
import { setupPasswordToggles } from "../../utilities/togglePasswordVisibility.js";

setupPasswordToggles();

const form = document.forms.login;
form.addEventListener("submit", onLogin);
