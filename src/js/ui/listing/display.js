import {FALLBACK_IMG} from "../../api/constants.js";

export function renderPetCard( data ) {
    const template = document.getElementById("pet-card-template");
    const clone = template.content.cloneNode(true);
    const img = clone.querySelector("img");
    img.src = data.image?.url || FALLBACK_IMG;
    img.alt = data.image?.alt || data.name;
    img.onerror = () => {
        img.src = FALLBACK_IMG;
    };
    const statusBadge = clone.querySelector(".adoptionStatus");
    statusBadge.textContent = data.adoptionStatus;
    clone.querySelector("img").alt = data.name.alt || data.name;
    clone.querySelector(".pet-name").textContent = data.name;
    clone.querySelector(".pet-age").textContent = data.age;
    clone.querySelector(".pet-breed").textContent = data.breed;
    clone.querySelector(".pet-location").textContent = data.location;

    return clone;
}

export function RenderSpecificPetDetail(pet) {
    const container = document.getElementById("pet-details");

    container.innerHTML = "";

    const isMobile = window.innerWidth <= 480;
    const templateId = isMobile
        ? "pet-details-template-mobile"
        : "pet-details-template-desktop";


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
        clone.querySelector(".pet-size").textContent = pet.size || "–";
    }

    if (clone.querySelector(".pet-color")) {
        clone.querySelector(".pet-color").textContent = pet.color || "–";
    }

    if (clone.querySelector(".pet-description")) {
        clone.querySelector(".pet-description").textContent = pet.description;
    }

    if (clone.querySelector(".pet-trained")) {
        clone.querySelector(".pet-trained").textContent = "Yes";
    }

    if (clone.querySelector(".pet-adoptionStatus")) {
        clone.querySelector(".pet-adoptionStatus").textContent = pet.adoptionStatus || "–";
    }

    if (clone.querySelector(".pet-good-with")) {
        clone.querySelector(".pet-good-with").textContent = "Family";
    }

    if (clone.querySelector(".pet-location")) {
        clone.querySelector(".pet-location").textContent = pet.location || "Unknown";
    }

    if (clone.querySelector(".pet-fee")) {
        clone.querySelector(".pet-fee").textContent = "500kr";
    }

    if (clone.querySelector(".shelter-avatar")) {
        clone.querySelector(".shelter-avatar").src = pet.owner?.avatar?.url || "fallback-avatar.jpg";
        clone.querySelector(".shelter-avatar").alt = pet.owner?.avatar?.alt || pet.owner?.name;
    }

    if (clone.querySelector(".shelter-name")) {
        clone.querySelector(".shelter-name").textContent = pet.owner?.name || "Unknown";
    }

    if (clone.querySelector(".shelter-location")) {
        clone.querySelector(".shelter-location").textContent = pet.location;
    }

    if (clone.querySelector(".pet-health")) {
        clone.querySelector(".pet-health").textContent = "Vaccinated";
    }



    container.appendChild(clone);
}


