import { loggedInHeaders } from "../headers";
import {API_PETS} from "../constants.js";

/**
 * Deletes a pet by its ID.
 *
 * @async
 * @param {string} id - The ID of the pet to delete.
 * @returns {Promise<void | Object>} Resolves with no content if deletion is successful, or optional response data.
 * @throws {Error} Throws an error if the deletion request fails.
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
            if (contentType && contentType.includes("application/json")) {
                const errorData = await response.json();
                message = errorData.message || message;
            }
            throw new Error(message);
        }

    } catch (error) {
        throw new Error(error.message || "An unexpected error occurred while deleting the pet.");
    }
}
