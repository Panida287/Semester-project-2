import { loggedInHeaders } from "../headers.js";
import { API_PETS } from "../constants.js";

/**
 * Deletes a pet by its ID.
 *
 * @async
 * @param {string} id - The ID of the pet to delete.
 * @returns {Promise<void>} Resolves if deletion is successful.
 * @throws {Error} If the deletion request fails or the server returns an error.
 */
export async function deletePet(id) {
    const myHeaders = await loggedInHeaders();
    
    try {
        const response = await fetch(`${API_PETS}/${id}`, {
            method: "DELETE",
            headers: myHeaders,
        });
        
        if (!response.ok) {
            let message = "Failed to delete pet.";
            const contentType = response.headers.get("content-type");
            
            if (contentType?.includes("application/json")) {
                const errorData = await response.json();
                message = errorData.message || message;
            }
            
            throw new Error(message);
        }
    } catch (error) {
        throw new Error(error.message || "An unexpected error occurred while deleting the pet.");
    }
}
