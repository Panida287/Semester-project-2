/**
 * Initializes the pet creation page, handles form submission,
 * image preview, cancel button, and authorization guard.
 */

import { createPet } from "../../api/pet/create.js";
import { setupPreview } from "../../utilities/preview.js";
import { authGuard } from "../../utilities/authGuard.js";
import { renderFooter } from "../../ui/footer.js";
import { showInfoModal } from "../../utilities/modal.js";
import { setLogoutListener } from '../../ui/global/logout.js';

authGuard();
renderFooter();
setLogoutListener();

const form = document.getElementById("create-form");
const imageUrlInput = document.getElementById("image-url");
const imagePreview = document.getElementById("image-preview");
const errorDiv = document.querySelector(".error-div");
const cancelBtn = document.querySelector(".cancel-btn");

form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById("name").value.trim(),
        species: document.getElementById("species").value.trim(),
        breed: document.getElementById("breed").value.trim(),
        gender: document.querySelector("input[name='gender']:checked")?.value || "unknown",
        size: document.getElementById("size").value.trim(),
        age: Number(document.getElementById("age").value),
        color: document.getElementById("color").value.trim(),
        description: document.getElementById("description").value.trim(),
        location: document.getElementById("location").value.trim(),
        adoptionStatus: "available",
        image: {
            url: document.getElementById("image-url").value.trim(),
            alt: document.getElementById("image-alt").value.trim(),
        },
    };
    
    try {
        const response = await createPet(formData);
        const newPet = response.data;
        
        showInfoModal("Pet has been created successfully!", () => {
            window.location.href = `/pet/?id=${newPet.id}`;
        });
    } catch (error) {
        errorDiv.textContent = error.message.includes("Image is not accessible")
            ? "Image is not accessible, please double check the image address."
            : error.message || "Something went wrong. Please try again.";
    }
});

cancelBtn?.addEventListener("click", () => {
    window.location.href = "/admin/";
});

if (imageUrlInput && imagePreview) {
    setupPreview(imageUrlInput, imagePreview);
}



