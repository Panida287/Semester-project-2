import {renderFooter} from "../../utilities/footer.js";
import {renderHeader} from "../../utilities/header.js";
import {renderPetCard} from "../../ui/pet/display.js";
import {setLogoutListener} from "../../ui/global/logout.js";

renderHeader();
renderFooter();
renderPetCard()
setLogoutListener();

let currentSearch = "";
let currentCategory = "";

const searchInput = document.getElementById("searchInput");
const catBtn = document.getElementById("cats-btn");
const dogBtn = document.getElementById("dogs-btn");
const otherBtn = document.getElementById("others-btn");
const allBtn = document.getElementById("all-btn");

function applyFilters() {
    renderPetCard(null, currentSearch, currentCategory);
}

searchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value.trim();
    applyFilters();
});

catBtn.addEventListener("click", () => {
    currentCategory = "cat";
    applyFilters();
});

dogBtn.addEventListener("click", () => {
    currentCategory = "dog";
    applyFilters();
});

otherBtn.addEventListener("click", () => {
    currentCategory = "other";
    applyFilters();
});

allBtn.addEventListener("click", () => {
    currentCategory = "";
    applyFilters();
});

applyFilters();

