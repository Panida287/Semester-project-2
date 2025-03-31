import { renderPetCardAdmin } from "../../ui/admin/display.js";
import { setupCreatePet } from "../../ui/admin/create-edit.js";

setupCreatePet();
renderPetCardAdmin();

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", (e) => {
    const value = e.target.value;
    renderPetCardAdmin(value);
});
