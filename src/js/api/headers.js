import { API_KEY } from "./constants.js";
import { getKey } from "./auth/key.js";

/**
 * Generates basic headers for unauthenticated API requests.
 *
 * @returns {Headers} A Headers object with API key and content type.
 */
export function renderHeaders() {
    const headers = new Headers();
    
    if (API_KEY) {
        headers.append("X-Noroff-API-Key", API_KEY);
        headers.append("Content-Type", "application/json");
    }
    
    return headers;
}

/**
 * Generates headers for authenticated API requests.
 *
 * @async
 * @returns {Promise<Headers>} A Headers object with API key, content type, and auth token.
 */
export async function loggedInHeaders() {
    const token = await getKey();
    const headers = new Headers();
    
    if (API_KEY) {
        headers.append("X-Noroff-API-Key", API_KEY);
        headers.append("Content-Type", "application/json");
    }
    
    if (token) {
        headers.append("Authorization", `Bearer ${token}`);
    }
    
    return headers;
}
