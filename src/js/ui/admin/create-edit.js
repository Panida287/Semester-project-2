import {setupPreview} from "../../utilities/preview.js";
import {createPet} from "../../api/admin/create.js";
import {updatePet} from "../../api/admin/update.js";
import {toggleContainer} from "../../utilities/toggleContainer.js";

let editingPetId = null;

export function setEditForm( pet ) {
    editingPetId = pet.id;

    document.getElementById("overlay").classList.remove("hidden");
    document.querySelector("#add-pet-form h2").textContent = "Edit Pet";

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

export async function handlePetFormSubmit( event ) {
    event.preventDefault();

    const errorDiv = document.querySelector(".error-div");
    const form = document.getElementById("add-pet-form");

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
        if (editingPetId) {
            await updatePet({
                ...formData,
                id: editingPetId,
            });
            alert("Pet updated successfully.");
        } else {
            await createPet(formData);
            alert("Pet has been created successfully!");
        }

        form.reset();
        document.getElementById("overlay").classList.add("hidden");
        document.querySelector("#add-pet-form h2").textContent = "Add New Pet";
        document.getElementById("image-preview").classList.add("hidden");
        editingPetId = null;
        errorDiv.textContent = "";

        window.location.reload();
    } catch (error) {
        console.error("Pet form error:", error);
        errorDiv.textContent = error.message || "An unexpected error occurred.";
    }
}

export function setupCreatePet() {
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
        form?.reset();
        previewImage?.classList.add("hidden");
        document.querySelector("#add-pet-form h2").textContent = "Add New Pet";
        editingPetId = null;
    });

    cancelBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            toggleContainer(addPetContainer, false);
            form?.reset();
            previewImage?.classList.add("hidden");
            document.querySelector("#add-pet-form h2").textContent = "Add New Pet";
            editingPetId = null;
        });
    });

    form?.addEventListener("submit", handlePetFormSubmit);
}
