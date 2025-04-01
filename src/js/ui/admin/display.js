import {renderPetTemplate} from "../pet/display.js";
import {getPets} from "../../api/pet/read.js";

export async function renderPetCardAdmin( searchTerm = "" ) {
    const cardContainer = document.getElementById("pet-list");
    const loggedInUser = localStorage.getItem("userName");

    try {
        const response = await getPets();
        const pets = response.data;

        if (!pets || !loggedInUser) {
            cardContainer.innerHTML = `<h1>No pet found</h1>`;
            return;
        }

        let userPets = pets.filter(pet => pet.owner?.name === loggedInUser);

        if (searchTerm.trim()) {
            const lowerSearch = searchTerm.toLowerCase();
            userPets = userPets.filter(pet =>
                pet.name?.toLowerCase().includes(lowerSearch) ||
                pet.breed?.toLowerCase().includes(lowerSearch) ||
                pet.species?.toLowerCase().includes(lowerSearch),
            );
        }

        if (userPets.length === 0) {
            cardContainer.innerHTML = `<h1>No pets match your search.</h1>`;
            return;
        }

        cardContainer.innerHTML = "";
        userPets.forEach(pet => {
            const card = renderPetTemplate(pet, "admin");
            cardContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Fetch failed:", error);
        cardContainer.innerHTML = `<h1>${error.message}</h1>`;
    }
}

