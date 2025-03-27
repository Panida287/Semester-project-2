import { renderHeaders } from "../headers.js";
import { getIdFromUrl } from "../../utilities/getId.js";
import { API_PETS } from "../constants.js";

export async function getListings(petId = null) {
    const myHeaders = renderHeaders();
    const ID = getIdFromUrl(petId);

    const endpoint = ID ? `${API_PETS}/${ID}` : API_PETS;

    try {
        const response = await fetch(endpoint, {
            method: "GET",
            headers: myHeaders,
        });

        if (!response.ok) {
            const errorData = await response.json();
            const error = errorData.errors?.[0];
            const message = error?.message || "Unknown error";
            throw new Error(`Error: ${message}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch failed:", error);
        throw error;
    }
}
