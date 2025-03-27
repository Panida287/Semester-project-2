import {FALLBACK_IMG, FALLBACK_AVATAR} from "../../api/constants.js";
import {getListings} from "../../api/listing/read.js";

export function petCard(data) {
    const template = document.getElementById("pet-card-template");
    const clone = template.content.cloneNode(true);

    const img = clone.querySelector("img");
    img.src = data.image?.url || FALLBACK_IMG;
    img.alt = data.image?.alt || data.name;
    img.onerror = () => {
        img.src = FALLBACK_IMG;
    };

    const statusBadge = clone.querySelector(".adoptionStatus");
    statusBadge.textContent = data.adoptionStatus || "Available";

    clone.querySelector(".pet-name").textContent = data.name;
    clone.querySelector(".pet-age").textContent = `${data.age} years`;
    clone.querySelector(".pet-breed").textContent = data.breed;
    clone.querySelector(".pet-location").textContent = data.location;

    const detailsBtn = clone.querySelector(".pet-details-btn");
    if (detailsBtn) {
        detailsBtn.addEventListener("click", () => {
            const petId = data.id;
            if (petId) {
                window.location.href = `/listing/${petId}`;
            } else {
                console.error("No pets ID found");
            }
        })
    }

    return clone;
}


export async function renderPetCard(pets = null) {
    const container = document.getElementById("pet-card-container");
    container.innerHTML = "";

    try {
        const response = pets ? { data: pets } : await getListings();
        const petList = response.data;

        if (!petList || petList.length === 0) {
            container.innerHTML = `<h1>No pets found</h1>`;
            return;
        }

        petList.forEach(pet => {
            const card = petCard(pet);
            container.appendChild(card);
        });

    } catch (error) {
        console.error("Fetch failed:", error);
        container.innerHTML = `<h1>Failed to Load. Please try again later</h1>`;
    }
}

export function RenderSpecificPetDetail(pet) {
    const container = document.getElementById("pet-details");

    container.innerHTML = "";

    const templateId = "pet-details-template";


    const template = document.getElementById(templateId);
    const clone = template.content.cloneNode(true);

    const nameEls = clone.querySelectorAll(".pet-name");
    nameEls.forEach(el => el.textContent = pet.name);

    clone.querySelector("img").src = pet.image?.url || "fallback.jpg";
    clone.querySelector("img").alt = pet.image?.alt || pet.name;

    const meta = clone.querySelector(".pet-meta");
    if (meta) {
        meta.textContent = `${pet.breed} • ${pet.gender} • ${pet.age} years old`;
    }

    if (clone.querySelector(".pet-age")) {
        clone.querySelector(".pet-age").textContent = `${pet.age} years`;
    }

    if (clone.querySelector(".pet-gender")) {
        clone.querySelector(".pet-gender").textContent = pet.gender;
    }

    if (clone.querySelector(".pet-breed")) {
        clone.querySelector(".pet-breed").textContent = pet.breed;
    }

    if (clone.querySelector(".pet-size")) {
        clone.querySelector(".pet-size").textContent = pet.size;
    }

    if (clone.querySelector(".pet-color")) {
        clone.querySelector(".pet-color").textContent = pet.color;
    }

    if (clone.querySelector(".pet-description")) {
        clone.querySelector(".pet-description").textContent = pet.description;
    }

    if (clone.querySelector(".pet-adoptionStatus")) {
        clone.querySelector(".pet-adoptionStatus").textContent = pet.adoptionStatus;
    }

    if (clone.querySelector(".pet-location")) {
        clone.querySelector(".pet-location").textContent = pet.location;
    }

    const avatarImg = clone.querySelector(".owner-avatar");
    avatarImg.src = pet.owner?.image?.url || FALLBACK_AVATAR;
    avatarImg.alt = pet.owner?.image?.alt || pet.owner?.name;
    avatarImg.onerror = () => {
        avatarImg.src = FALLBACK_AVATAR;
    };

    if (clone.querySelector(".owner-name")) {
        clone.querySelector(".owner-name").textContent = pet.owner?.name;
    }

    if (clone.querySelector(".owner-email")) {
        clone.querySelector(".owner-email").textContent = pet.owner?.email;
    }

    if (clone.querySelector(".owner-bio")) {
        clone.querySelector(".owner-bio").textContent = pet.owner?.bio;
    }

    container.appendChild(clone);
}


