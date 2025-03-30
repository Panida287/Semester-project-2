import { renderPetTemplate } from "../listing/display.js";
import { getListings } from "../../api/listing/read.js";

export async function renderPetCardAdmin() {
    const cardContainer = document.getElementById("pet-list");
    const loggedInUser = localStorage.getItem("userName");

    try {
        const response = await getListings();
        const pets = response.data;

        if (!pets || !loggedInUser) {
            cardContainer.innerHTML = `<h1>No pet found</h1>`;
            return;
        }

        const userPets = pets.filter(pet => pet.owner?.name === loggedInUser);

        if (userPets.length === 0) {
            cardContainer.innerHTML = `<h1>You haven't listed any pets yet.</h1>`;
            return;
        }

        userPets.forEach(pet => {
            const card = renderPetTemplate(pet, "admin");
            cardContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Fetch failed:", error);
        cardContainer.innerHTML = `<h1>${error.message}</h1>`;
    }
}
