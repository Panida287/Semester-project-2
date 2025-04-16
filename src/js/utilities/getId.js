/**
 * Extracts a query parameter value from the current URL.
 *
 * @param {string} petId - The name of the query parameter to retrieve (e.g., "id").
 * @returns {string|null} The value of the parameter, or null if not found.
 */
export function getIdFromUrl(petId) {
    const params = new URLSearchParams(window.location.search);
    return params.get(petId);
}
