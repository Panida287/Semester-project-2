import { renderPetCardAdmin } from "../../ui/admin/display.js";

renderPetCardAdmin();

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", (e) => {
    const value = e.target.value;
    renderPetCardAdmin(value);
});

const createPetBtn = document.getElementById("add-btn");
createPetBtn.addEventListener("click", (e) => {
    window.location.href = "/pet/create/";
})

