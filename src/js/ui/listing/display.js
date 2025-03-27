import {FALLBACK_IMG, FALLBACK_AVATAR} from "../../api/constants.js";
import {getListings} from "../../api/listing/read.js";

export function petCard(pet) {
    const template = document.getElementById("pet-card-template");
    const clone = template.content.cloneNode(true);

    const img = clone.querySelector("img");
    img.src = pet.image?.url || FALLBACK_IMG;
    img.alt = pet.image?.alt || pet.name;
    img.onerror = () => {
        img.src = FALLBACK_IMG;
    };

    clone.querySelector(".pet-name").textContent = pet.name;

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

    clone.querySelector(".pet-age").textContent = `${pet.age} years`;
    clone.querySelector(".pet-breed").textContent = pet.breed;
    clone.querySelector(".pet-location").textContent = pet.location;

    const detailsBtn = clone.querySelector(".pet-details-btn");
    if (detailsBtn) {
        detailsBtn.addEventListener("click", () => {
            const petId = pet.id;
            if (petId) {
                window.location.href = `/listing/?id=${petId}`;
            } else {
                console.error("No pet ID found");
            }
        });
    }

    return clone;
}



export function petDetailCard(pet) {
    const container = document.getElementById("pet-details");
    container.innerHTML = "";

    const templateId = "pet-details-template";
    const template = document.getElementById(templateId);
    const clone = template.content.cloneNode(true);

    const nameEls = clone.querySelectorAll(".pet-name");
    nameEls.forEach(el => el.textContent = pet.name);

    const img = clone.querySelector("img");
    img.src = pet.image?.url || FALLBACK_IMG;
    img.alt = pet.image?.alt || pet.name;
    img.onerror = () => {
        img.src = FALLBACK_IMG;
    };

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

    if (clone.querySelector(".pet-location")) {
        clone.querySelector(".pet-location").textContent = pet.location;
    }

    const avatarImg = clone.querySelector(".owner-avatar");
    avatarImg.src = pet.owner?.avatar?.url || FALLBACK_AVATAR;
    avatarImg.alt = pet.owner?.avatar?.alt || pet.owner?.name;
    avatarImg.onerror = () => {
        avatarImg.src = FALLBACK_AVATAR;
    };

    if (clone.querySelector(".owner-name")) {
        clone.querySelector(".owner-name").textContent = pet.owner?.name;
    }

    if (clone.querySelector(".owner-email")) {
        clone.querySelector(".owner-email").textContent = pet.owner?.email;
    }

    const bioEl = clone.querySelector(".owner-bio");
    if (bioEl) {
        const bio = pet.owner?.bio;
        const isMissing = !bio || bio.toLowerCase() === "string";

        bioEl.textContent = isMissing ? "No bio available" : bio;
        bioEl.classList.remove("italic", "text-gray-500", "font-light");

        if (isMissing) {
            bioEl.classList.add("italic", "text-gray-500", "font-light");
        }
    }

    const shareBtn = clone.querySelector(".share-btn");
    if (shareBtn) {
        shareBtn.addEventListener("click", async () => {
            try {
                const shareUrl = window.location.href;
                await navigator.clipboard.writeText(shareUrl);

                shareBtn.textContent = "Link copied!";
                shareBtn.classList.add("text-green-600");
                shareBtn.classList.add("text-sm");

                setTimeout(() => {
                    shareBtn.innerHTML = `<i class="fa-solid fa-share-from-square"></i>`;
                    shareBtn.classList.remove("text-green-600");
                    shareBtn.classList.remove("text-sm");
                }, 2000);
            } catch (err) {
                console.error("Failed to copy link: ", err);
                shareBtn.textContent = "Failed to copy";
            }
        });
    }



    container.appendChild(clone);
}


export async function renderPetCard(petId = null) {
    const cardContainer = document.getElementById("pet-card-container");
    const detailContainer = document.getElementById("pet-details");

    try {
        if (petId) {
            const response = await getListings(petId);
            const pet = response.data;
            console.log("Fetched pet:", pet);

            if (!pet) {
                detailContainer.innerHTML = "<h1>Pet not found</h1>";
                return;
            }

            detailContainer.innerHTML = "";
            petDetailCard(pet);
        } else {
            const response = await getListings();
            const petList = response.data;

            if (!petList || petList.length === 0) {
                cardContainer.innerHTML = `<h1>No pets found</h1>`;
                return;
            }

            cardContainer.innerHTML = "";

            petList.forEach(pet => {
                const card = petCard(pet);
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





