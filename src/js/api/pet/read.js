import { renderHeaders } from "../headers.js";
import { API_PETS } from "../constants.js";

/**
 * Fetches pet data from the API.
 *
 * @async
 * @param {Object} [options] - Options for fetching pets.
 * @param {string} [options.petId=null] - Optional ID to fetch a specific pet.
 * @param {number} [options.limit] - Optional limit for pagination.
 * @param {number} [options.page=1] - Page number for paginated results.
 * @returns {Promise<Object>} Resolves with pet data or a specific pet object.
 * @throws {Error} If the fetch request fails or the server returns an error.
 */
export async function getPets({ petId = null, limit, page = 1 } = {}) {
    const myHeaders = renderHeaders();
    
    const endpoint = petId
        ? `${API_PETS}/${petId}`
        : limit !== undefined
            ? `${API_PETS}?limit=${limit}&page=${page}`
            : API_PETS;
    
    try {
        const response = await fetch(endpoint, {
            method: "GET",
            headers: myHeaders,
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            const message = errorData.errors?.[0]?.message || "Unknown error";
            throw new Error(`Error: ${message}`);
        }
        
        return await response.json();
    } catch (error) {
        throw new Error(error.message || "An error occurred while fetching pet data.");
    }
}
