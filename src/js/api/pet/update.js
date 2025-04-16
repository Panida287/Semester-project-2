import { loggedInHeaders } from "../headers.js";
import { API_PETS } from "../constants.js";

/**
 * Updates a pet's details by sending a PUT request to the API.
 *
 * @async
 * @param {Object} updateData - Data to update the pet.
 * @param {string} updateData.id - The ID of the pet to update.
 * @param {...any} updateData.fieldsToUpdate - Other fields to update (name, breed, etc.).
 * @returns {Promise<Object>} The updated pet data from the server.
 * @throws {Error} If the update request fails or the server returns an error.
 */
export async function updatePet({ id, ...fieldsToUpdate }) {
    const headers = await loggedInHeaders();
    
    try {
        const response = await fetch(`${API_PETS}/${id}`, {
            method: "PUT",
            headers,
            body: JSON.stringify(fieldsToUpdate),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            const errorMsg = data.errors?.[0]?.message || "Unknown error occurred.";
            throw new Error(errorMsg);
        }
        
        return data;
    } catch (error) {
        throw new Error(error.message || "An error occurred while updating the pet.");
    }
}
