import { renderPetCardAdmin } from "../../ui/admin/display.js";
import { setupFilterControls } from "../../utilities/filter.js";

document.getElementById("add-btn")?.addEventListener("click", () => {
    window.location.href = "/pet/create/";
});

setupFilterControls({
    searchInputId: "searchInput",
    catBtnId: "cats-btn",
    dogBtnId: "dogs-btn",
    otherBtnId: "others-btn",
    allBtnId: "all-btn",
    renderFn: renderPetCardAdmin,
});
