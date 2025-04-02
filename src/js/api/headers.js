import {API_KEY} from "./constants.js";
import {getKey} from "./auth/key.js";

export function renderHeaders() {
    const headers = new Headers();

    if (API_KEY) {
        headers.append("X-Noroff-API-Key", API_KEY);
        headers.append("Content-Type", "application/json");
    }

    return headers;
}

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
