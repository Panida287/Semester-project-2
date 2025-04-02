import {renderPetCardAdmin} from "../../ui/admin/display.js";
import {setupFilterControls} from "../../utilities/filter.js";
import {setLogoutListener} from "../../ui/global/logout.js";
import {authGuard} from "../../utilities/authGaurd.js";
import {setupFilterButtonState} from "../../utilities/setupFilterButtonState.js";
import {renderFooter} from "../../utilities/footer.js";
import {mobileNav} from "../../utilities/mobileNav.js";

authGuard(authGuard);
renderFooter()
setLogoutListener();

const isMobile = window.innerWidth <= 480;
if (isMobile) {
    mobileNav()
}

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



