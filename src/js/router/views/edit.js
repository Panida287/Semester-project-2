import { getPets } from "../../api/pet/read.js";
import { updatePet } from "../../api/pet/update.js";
import { setupPreview } from "../../utilities/preview.js";
import { getIdFromUrl } from "../../utilities/getId.js";

const form = document.getElementById("add-edit-form");
const imageUrlInput = document.getElementById("image-url");
const imagePreview = document.getElementById("image-preview");
const errorDiv = document.querySelector(".error-div");
const cancelBtn = document.querySelector(".cancel-btn");

let editingPetId = null;
let currentPet = null;

function populatePetForm(pet) {
    document.getElementById("name").value = pet.name || "";
    document.getElementById("species").value = pet.species || "";
    document.getElementById("breed").value = pet.breed || "";
    document.getElementById("age").value = pet.age || "";
    document.querySelector(`input[name="gender"][value="${pet.gender?.toLowerCase()}"]`)?.click();
    document.getElementById("size").value = pet.size || "";
    document.getElementById("color").value = pet.color || "";
    document.getElementById("description").value = pet.description || "";
    document.getElementById("location").value = pet.location || "";
    document.getElementById("image-url").value = pet.image?.url || "";
    document.getElementById("image-alt").value = pet.image?.alt || "";

    const preview = document.getElementById("image-preview");
    if (preview) {
        preview.src = pet.image?.url || "";
        preview.alt = pet.image?.alt || "";
        preview.classList.remove("hidden");
    }
}

async function initEditPage() {
    const id = getIdFromUrl("id");
    editingPetId = id;

    try {
        const response = await getPets(id);
        currentPet = response.data;
        if (!currentPet) throw new Error("Pet not found");

        populatePetForm(currentPet);
    } catch (error) {
        console.error("Failed to load pet:", error);
        errorDiv.textContent = error.message || "Failed to load pet data.";
    }
}

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
        image: {
            url: document.getElementById("image-url").value.trim(),
            alt: document.getElementById("image-alt").value.trim(),
        },
    };

    try {
        await updatePet({ ...formData, id: editingPetId });
        alert("Pet updated successfully!");
        window.location.href = `/pet/?id=${editingPetId}`;
    } catch (error) {
        console.error("Update failed:", error);
        errorDiv.textContent = error.message || "Failed to update pet.";
    }
});

cancelBtn?.addEventListener("click", () => {
    window.location.href = "/admin/";
});

if (imageUrlInput && imagePreview) {
    setupPreview(imageUrlInput, imagePreview);
}

initEditPage();
