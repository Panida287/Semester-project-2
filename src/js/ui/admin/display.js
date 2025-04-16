import {renderPetTemplate} from "../pet/display.js";
import {getPets} from "../../api/pet/read.js";

export async function renderPetCardAdmin(petId = null, searchTerm = "", category = "") {
    const cardContainer = document.getElementById("pet-list");
    const loggedInUser = localStorage.getItem("petPalUserName");

    try {
        const response = await getPets();
        const pets = response.data;

        let userPets = pets.filter(pet => pet.owner?.name === loggedInUser);
        console.log(userPets);
        console.log(loggedInUser);
        console.log(pets);
        
        if (userPets.length === 0 && !searchTerm && (!category || category === "all")) {
            cardContainer.innerHTML = `<h1>You don't have any pets. Click + Add Pet to add new pet!</h1>`;
            return;
        }

        if (searchTerm?.trim()) {
            const lowerSearch = searchTerm.toLowerCase();
            userPets = userPets.filter(pet =>
                pet.name?.toLowerCase().includes(lowerSearch) ||
                pet.breed?.toLowerCase().includes(lowerSearch) ||
                pet.species?.toLowerCase().includes(lowerSearch)
            );
        }

        if (category && category !== "all") {
            if (category === "other") {
                userPets = userPets.filter(pet => {
                    const species = pet.species?.toLowerCase();
                    return species !== "cat" && species !== "dog";
                });
            } else {
                userPets = userPets.filter(
                    pet => pet.species?.toLowerCase() === category.toLowerCase()
                );
            }
        }
        
        if (userPets.length === 0) {
            cardContainer.innerHTML = `<h1>No pets found.</h1>`;
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




