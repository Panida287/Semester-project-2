/**
 * Fallback image URL for user avatars.
 * Used when a user does not provide a custom avatar.
 * @type {string}
 */
export const FALLBACK_AVATAR = "../assets/images/avatar-fallback.jpg";

/**
 * Fallback image URL for pets.
 * Used when a pet does not have an image provided.
 * @type {string}
 */
export const FALLBACK_IMG = "../assets/images/fallback-image.png";

/**
 * API key used for authorization with the Noroff API.
 * @type {string}
 */
export const API_KEY = "0876d63b-6108-4b3f-a47b-398537cdec93";

/**
 * Base URL for the Noroff API.
 * @type {string}
 */
export const API_BASE = "https://v2.api.noroff.dev";

/**
 * Endpoint for managing pets.
 * @type {string}
 */
export const API_PETS = `${API_BASE}/pets`;

/**
 * Base URL for authentication endpoints.
 * @type {string}
 */
export const API_AUTH = `${API_BASE}/auth`;

/**
 * Endpoint for user login.
 * @type {string}
 */
export const API_AUTH_LOGIN = `${API_AUTH}/login`;

/**
 * Endpoint for user registration.
 * @type {string}
 */
export const API_AUTH_REGISTER = `${API_AUTH}/register`;
