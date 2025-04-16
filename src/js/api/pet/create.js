import { loggedInHeaders } from "../headers.js";
import { API_PETS } from "../constants.js";

/**
 * Creates a new pet by sending a POST request to the API with the provided pet data.
 *
 * @async
 * @param {Object} petData - The pet details to create a new entry.
 * @param {string} petData.name - Name of the pet.
 * @param {string} petData.species - Species of the pet (e.g., Dog, Cat).
 * @param {string} petData.breed - Breed of the pet.
 * @param {string} petData.gender - Gender of the pet.
 * @param {number} petData.age - Age of the pet in years.
 * @param {string} petData.size - Size category (e.g., Small, Medium, Large).
 * @param {string} petData.color - Color of the pet.
 * @param {string} petData.description - Description of the pet.
 * @param {string} petData.location - Pet's location.
 * @param {{url: string, alt: string}} petData.image - Object containing image URL and alt text.
 * @returns {Promise<Object>} The created pet data from the API.
 * @throws {Error} If the request fails or returns an error.
 */

export async function createPet({
    name,
    species,
    breed,
    gender,
    age,
    size,
    color,
    description,
    location,
    image,
}) {
    const myHeaders = await loggedInHeaders();
    
    try {
        const response = await fetch(API_PETS, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({
                name,
                species,
                breed,
                age,
                gender,
                size,
                color,
                description,
                location,
                image,
            }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            const errorMsg = data.errors?.[0]?.message || "Unknown error occurred.";
            throw new Error(errorMsg);
        }
        
        return data;
    } catch (error) {
        throw error;
    }
}
