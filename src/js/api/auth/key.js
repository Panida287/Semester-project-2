/**
 * Retrieves the access token from localStorage.
 *
 * @returns {string|null} The access token if it exists, otherwise null.
 */
export async function getKey() {
    const accessToken = localStorage.getItem('accessToken');
    
    if (!accessToken) {
        console.error("Access token not found.");
        return null;
    }
    
    return accessToken;
}