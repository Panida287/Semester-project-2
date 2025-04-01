import { loggedInHeaders } from "../headers.js";
import { API_PETS } from "../constants.js";

export async function updatePet({ id, ...fieldsToUpdate }) {
    const headers = await loggedInHeaders();

    try {
        const response = await fetch(`${API_PETS}/${id}`, {
            method: "PUT",
            headers,
            body: JSON.stringify(fieldsToUpdate),
        });

        const data = await response.json();

        if (!response.ok) {
            const errorMsg = data.errors?.[0]?.message || "Unknown error occurred.";
            throw new Error(errorMsg);
        }

        return data;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}
