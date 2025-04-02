import {onLogin} from "../../ui/auth/login";
import {setupPasswordToggles} from "../../utilities/togglePasswordVisibility.js";

setupPasswordToggles();

const form = document.forms.login;

form.addEventListener("submit", onLogin);

