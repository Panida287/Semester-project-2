import {FALLBACK_IMG, FALLBACK_AVATAR} from "../../api/constants.js";
import {getPets} from "../../api/pet/read.js";
import {deletePet} from "../../api/admin/delete.js";
import {updatePet} from "../../api/admin/update.js";

export function renderPetTemplate( pet, mode = "card" ) {
    const templateId = mode === "detail"
        ? "pet-details-template"
        : mode === "admin"
            ? "pet-card-admin"
            : "pet-card-template";

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
        const status = pet.adoptionStatus?.toLowerCase();
        statusEl.classList.remove("bg-blue-500", "bg-yellow-400", "bg-green-500", "text-white", "text-black");

        if (status === "available") {
            statusEl.textContent = "Available";
            statusEl.classList.add("bg-green-500", "text-white");
        } else if (status === "adopted") {
            statusEl.textContent = "Adopted";
            statusEl.classList.add("bg-blue-400", "text-white");
        } else {
            statusEl.textContent = "Pending";
            statusEl.classList.add("bg-yellow-400", "text-black");
        }
    }

    const genderEl = clone.querySelector(".pet-gender");
    if (genderEl) {
        const gender = pet.gender?.toLowerCase();
        genderEl.classList.remove("bg-blue-100", "text-blue-800", "bg-pink-100", "text-pink-800");

        if (gender === "male" || gender === "boy") {
            genderEl.textContent = "Male";
            genderEl.classList.add("bg-blue-100", "text-blue-800");
        } else if (gender === "female" || gender === "girl") {
            genderEl.textContent = "Female";
            genderEl.classList.add("bg-pink-100", "text-pink-800");
        } else {
            genderEl.textContent = pet.gender || "Unknown";
        }
    }

    const ageEl = clone.querySelector(".pet-age");
    if (ageEl) ageEl.textContent = `${pet.age} years`;

    const breedEl = clone.querySelector(".pet-breed");
    if (breedEl) breedEl.textContent = pet.breed;

    const sizeEl = clone.querySelector(".pet-size");
    if (sizeEl) sizeEl.textContent = pet.size;

    const colorEl = clone.querySelector(".pet-color");
    if (colorEl) colorEl.textContent = pet.color;

    const descEl = clone.querySelector(".pet-description");
    if (descEl) descEl.textContent = pet.description;

    const locationEl = clone.querySelector(".pet-location");
    if (locationEl) locationEl.textContent = pet.location;

    const detailsBtn = clone.querySelector(".pet-details-btn");
    if (detailsBtn) {
        detailsBtn.addEventListener("click", () => {
            window.location.href = `/pet/?id=${pet.id}`;
        });
    }

    if (mode === "detail") {
        clone.querySelector(".pet-meta").textContent = `${pet.breed} • ${pet.gender} • ${pet.age} years old`;

        const avatar = clone.querySelector(".owner-avatar");
        if (avatar) {
            avatar.src = pet.owner?.avatar?.url || FALLBACK_AVATAR;
            avatar.alt = pet.owner?.avatar?.alt || pet.owner?.name || "Owner";
            avatar.onerror = () => (avatar.src = FALLBACK_AVATAR);
        }

        clone.querySelector(".owner-name").textContent = pet.owner?.name;
        clone.querySelector(".owner-email").textContent = pet.owner?.email;

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

    } else if (mode === "admin") {
        const editBtn = clone.querySelector(".edit-btn");
        if (editBtn) {
            editBtn.addEventListener("click", () => {
                window.location.href = `/pet/edit/?id=${pet.id}`;

            });
        }

        const deleteBtn = clone.querySelector(".delete-btn");
        if (deleteBtn) {
            deleteBtn.addEventListener("click", async () => {
                const confirmDelete = confirm(`Delete ${pet.name}?`);
                if (!confirmDelete) return;

                try {
                    await deletePet(pet.id);
                    const card = document.getElementById(`pet-${pet.id}`);
                    if (card) card.remove();
                    alert(`${pet.name} deleted successfully!`);
                    window.location.reload();
                } catch (error) {
                    console.error("Failed to delete:", error.message);
                    alert(`Failed to delete pet: ${error.message}`);
                }
            });
        }

        const statusBtn = clone.querySelector(".status-btn");
        const statusMenu = clone.querySelector(".status-menu");
        const statusOptions = clone.querySelectorAll(".status-option");

        if (statusBtn && statusMenu && statusOptions.length > 0) {
            statusBtn.addEventListener("click", () => {
                statusMenu.classList.toggle("hidden");
            });

            document.addEventListener("click", ( e ) => {
                if (!statusBtn.contains(e.target) && !statusMenu.contains(e.target)) {
                    statusMenu.classList.add("hidden");
                }
            });

            statusOptions.forEach(option => {
                option.addEventListener("click", async () => {
                    const newStatus = option.dataset.value;
                    if (newStatus === pet.adoptionStatus?.toLowerCase()) return;

                    const confirmed = confirm(`Change status to "${newStatus}" for ${pet.name}?`);
                    if (!confirmed) return;

                    try {
                        await updatePet({
                            id: pet.id,
                            adoptionStatus: newStatus,
                        });

                        alert(`Status updated to "${newStatus}"`);
                        window.location.reload();
                    } catch (error) {
                        alert("Failed to update status: " + error.message);
                    }
                });
            });
        }
    }
    return clone;
}

export async function renderPetCard( petId = null, searchTerm = "", category = "" ) {
    const cardContainer = document.getElementById("pet-card-container");
    const detailContainer = document.getElementById("pet-details");

    try {
        if (petId) {
            const response = await getPets(petId);
            const pet = response.data;

            if (!pet) {
                detailContainer.innerHTML = "<h1>Pet not found</h1>";
                return;
            }

            detailContainer.innerHTML = "";
            const detailCard = renderPetTemplate(pet, "detail");
            detailContainer.appendChild(detailCard);
        } else {
            const response = await getPets();
            let pets = response.data;

            if (!pets) {
                cardContainer.innerHTML = `<h1>No pet found</h1>`;
                return;
            }

            if (searchTerm.trim()) {
                const lowerSearch = searchTerm.toLowerCase();
                pets = pets.filter(pet =>
                    pet.name?.toLowerCase().includes(lowerSearch) ||
                    pet.breed?.toLowerCase().includes(lowerSearch) ||
                    pet.species?.toLowerCase().includes(lowerSearch),
                );
            }

            if (category && category !== "all") {
                if (category === "other") {
                    pets = pets.filter(pet => {
                        const species = pet.species?.toLowerCase();
                        return species !== "cat" && species !== "dog";
                    });
                } else {
                    pets = pets.filter(pet =>
                        pet.species?.toLowerCase() === category.toLowerCase(),
                    );
                }
            }

            if (pets.length === 0) {
                cardContainer.innerHTML = `<h1>No pets match your filter.</h1>`;
                return;
            }

            cardContainer.innerHTML = "";
            pets.forEach(pet => {
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








