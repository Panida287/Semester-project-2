import {FALLBACK_IMG, FALLBACK_AVATAR} from "../../api/constants.js";
import {getListings} from "../../api/listing/read.js";

export function renderPetTemplate(pet, mode = "card") {
    const templateId = mode === "detail" ? "pet-details-template" : "pet-card-template";
    const template = document.getElementById(templateId);
    const clone = template.content.cloneNode(true);

    const img = clone.querySelector("img");
    if (img) {
        img.src = pet.image?.url || FALLBACK_IMG;
        img.alt = pet.image?.alt || pet.name;
        img.onerror = () => (img.src = FALLBACK_IMG);
    }

    clone.querySelectorAll(".pet-name").forEach(el => el.textContent = pet.name);

    const statusEl = clone.querySelector(".pet-adoptionStatus");
    if (statusEl) {
        const status = pet.adoptionStatus?.toLowerCase() || "contact shelter";
        statusEl.textContent = pet.adoptionStatus || "Contact shelter";

        statusEl.classList.remove("bg-blue-500", "bg-yellow-400", "bg-green-500", "text-white", "text-black");
        if (status === "adopted") {
            statusEl.classList.add("bg-blue-500", "text-white");
        } else if (status === "available") {
            statusEl.classList.add("bg-green-500", "text-white");
        } else {
            statusEl.classList.add("bg-yellow-400", "text-black");
        }
    }

    if (mode === "card") {
        clone.querySelector(".pet-age").textContent = `${pet.age} years`;
        clone.querySelector(".pet-breed").textContent = pet.breed;
        clone.querySelector(".pet-location").textContent = pet.location;

        const detailsBtn = clone.querySelector(".pet-details-btn");
        if (detailsBtn) {
            detailsBtn.addEventListener("click", () => {
                const petId = pet.id;
                if (petId) {
                    window.location.href = `/listing/?id=${petId}`;
                }
            });
        }

    } else if (mode === "detail") {
        const meta = clone.querySelector(".pet-meta");
        if (meta) {
            meta.textContent = `${pet.breed} • ${pet.gender} • ${pet.age} years old`;
        }

        if (clone.querySelector(".pet-age")) clone.querySelector(".pet-age").textContent = `${pet.age} years`;
        if (clone.querySelector(".pet-gender")) clone.querySelector(".pet-gender").textContent = pet.gender;
        if (clone.querySelector(".pet-breed")) clone.querySelector(".pet-breed").textContent = pet.breed;
        if (clone.querySelector(".pet-size")) clone.querySelector(".pet-size").textContent = pet.size;
        if (clone.querySelector(".pet-color")) clone.querySelector(".pet-color").textContent = pet.color;
        if (clone.querySelector(".pet-description")) clone.querySelector(".pet-description").textContent = pet.description;

        const avatarImg = clone.querySelector(".owner-avatar");
        if (avatarImg) {
            avatarImg.src = pet.owner?.avatar?.url || FALLBACK_AVATAR;
            avatarImg.alt = pet.owner?.avatar?.alt || pet.owner?.name;
            avatarImg.onerror = () => (avatarImg.src = FALLBACK_AVATAR);
        }

        if (clone.querySelector(".owner-name")) clone.querySelector(".owner-name").textContent = pet.owner?.name;
        if (clone.querySelector(".owner-email")) clone.querySelector(".owner-email").textContent = pet.owner?.email;

        const bioEl = clone.querySelector(".owner-bio");
        if (bioEl) {
            const bio = pet.owner?.bio;
            const isMissing = !bio || bio.toLowerCase() === "string";
            bioEl.textContent = isMissing ? "No bio available" : bio;
            bioEl.classList.toggle("italic", isMissing);
            bioEl.classList.toggle("text-gray-500", isMissing);
            bioEl.classList.toggle("font-light", isMissing);
        }

        const shareBtn = clone.querySelector(".share-btn");
        if (shareBtn) {
            shareBtn.addEventListener("click", async () => {
                try {
                    await navigator.clipboard.writeText(window.location.href);
                    shareBtn.textContent = "Link copied!";
                    shareBtn.classList.add("text-green-600", "text-sm");

                    setTimeout(() => {
                        shareBtn.innerHTML = `<i class="fa-solid fa-share-from-square"></i>`;
                        shareBtn.classList.remove("text-green-600", "text-sm");
                    }, 2000);
                } catch (err) {
                    console.error("Failed to copy link: ", err);
                    shareBtn.textContent = "Failed to copy";
                }
            });
        }
    }

    return clone;
}

export async function renderPetCard(petId = null) {
    const cardContainer = document.getElementById("pet-card-container");
    const detailContainer = document.getElementById("pet-details");

    try {
        if (petId) {
            const response = await getListings(petId);
            const pet = response.data;

            if (!pet) {
                detailContainer.innerHTML = "<h1>Pet not found</h1>";
                return;
            }

            detailContainer.innerHTML = "";
            const detailCard = renderPetTemplate(pet, "detail");
            detailContainer.appendChild(detailCard);
        } else {
            const response = await getListings();
            const petList = response.data;

            cardContainer.innerHTML = petList.length === 0
                ? `<h1>No pets found</h1>`
                : "";

            petList.forEach(pet => {
                const card = renderPetTemplate(pet, "card");
                cardContainer.appendChild(card);
            });
        }
    } catch (error) {
        console.error("Fetch failed:", error);
        const fallbackMessage = `<h1>Failed to Load. Please try again later</h1>`;

        if (petId) {
            detailContainer.innerHTML = fallbackMessage;
        } else {
            cardContainer.innerHTML = fallbackMessage;
        }
    }
}






