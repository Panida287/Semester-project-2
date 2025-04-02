import {renderPetCardAdmin} from "../../ui/admin/display.js";
import {setupFilterControls} from "../../utilities/filter.js";
import {setLogoutListener} from "../../ui/global/logout.js";
import {authGuard} from "../../utilities/authGaurd.js";

authGuard(authGuard);
setLogoutListener();

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

setupFilterButtonState();

function setupFilterButtonState() {
    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => {
                b.classList.remove("bg-indigo-600", "text-white");
                b.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
            });
            btn.classList.add("bg-indigo-600", "text-white");
            btn.classList.remove("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
        });
    });
}
