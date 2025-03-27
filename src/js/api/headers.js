import {API_KEY} from "./constants.js";

export function renderHeaders() {
    const headers = new Headers();

    if (API_KEY) {
        headers.append("X-Noroff-API-Key", API_KEY);
        headers.append("Content-Type", "application/json");
    }

    return headers;
}
