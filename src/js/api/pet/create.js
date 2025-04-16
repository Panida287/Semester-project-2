import {loggedInHeaders} from "../headers.js";
import {API_PETS} from "../constants.js";

export async function createPet({ name, species, breed, gender, age, size, color, description, location, image }) {
    const myHeaders = await loggedInHeaders();

    try {
        const response = await fetch(API_PETS, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({
                name,
                species,
                breed,
                age,
                gender,
                size,
                color,
                description,
                location,
                image,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Full error response:", data);
            const errorMsg = data.errors?.[0]?.message || "Unknown error occurred.";
            throw new Error(errorMsg);
        }
        
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}

