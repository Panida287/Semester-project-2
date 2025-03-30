// setupCreatePet.js
import { setupPreview } from "../../utilities/preview.js";
import { createPet } from "../../api/admin/create.js";
import { toggleContainer } from "../../utilities/toggleContainer.js";

export async function onCreate(event) {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const speciesInput = document.getElementById("species");
    const breedInput = document.getElementById("breed");
    const genderInput = document.querySelector("input[name='gender']:checked");
    const sizeInput = document.getElementById("size");
    const ageInput = document.getElementById("age");
    const colorInput = document.getElementById("color");
    const descriptionInput = document.getElementById("description");
    const locationInput = document.getElementById("location");
    const imageUrlInput = document.getElementById("image-url");
    const imageAltInput = document.getElementById("image-alt");
    const errorDiv = document.querySelector(".error-div");
    const form = document.getElementById("add-pet-form");


    const image = {
        url: imageUrlInput?.value.trim(),
        alt: imageAltInput?.value.trim()
    };

    try {
        await createPet({
            name: nameInput.value.trim(),
            species: speciesInput.value.trim(),
            breed: breedInput.value.trim(),
            gender: genderInput?.value || "unknown",
            size: sizeInput.value.trim(),
            age: Number(ageInput.value),
            color: colorInput.value.trim(),
            description: descriptionInput.value.trim(),
            location: locationInput.value.trim(),
            image: image,
        });

        errorDiv.textContent = "";
        alert("Pet has been created successfully!");
        form.reset();
        window.location.reload();
    } catch (error) {
        console.error("Create pet error:", error);
        errorDiv.textContent = error.message || "An unexpected error occurred.";
    }
}


export async function setupCreatePet() {
    const addPetBtn = document.getElementById("add-btn");
    const addPetContainer = document.querySelector(".add-pet-form");
    const cancelBtns = document.querySelectorAll(".cancel-btn");
    const form = document.getElementById("add-pet-form");
    const imageUrlInput = document.getElementById("image-url");
    const previewImage = document.getElementById("image-preview");

    if (imageUrlInput && previewImage) {
        setupPreview(imageUrlInput, previewImage);
    }

    addPetBtn?.addEventListener("click", () => {
        toggleContainer(addPetContainer, true);
    });

    cancelBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            toggleContainer(addPetContainer, false);
            form?.reset();
        });
    });

    form?.addEventListener("submit", onCreate);
}