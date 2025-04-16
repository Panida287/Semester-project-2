/**
 * Initializes the registration page:
 * - Enables password visibility toggles
 * - Sets up image preview for avatar URL input
 * - Attaches registration handler on form submit
 */

import { setupPasswordToggles } from "../../utilities/togglePasswordVisibility.js";
import { onRegister } from "../../ui/auth/register.js";
import { setupPreview } from "../../utilities/preview.js";

setupPasswordToggles();

const form = document.forms.register;
form.addEventListener("submit", onRegister);

const imageUrlInput = document.getElementById("avatar");
const imagePreview = document.getElementById("image-preview");

if (imageUrlInput && imagePreview) {
    setupPreview(imageUrlInput, imagePreview);
}
