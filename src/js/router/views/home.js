import { renderFooter } from "../../utilities/footer.js";
import { renderHeader } from "../../utilities/header.js";
import { renderPetCard } from "../../ui/pet/display.js";
import { setupFilterControls } from "../../utilities/filter.js";
import {setupFilterButtonState} from "../../utilities/setupFilterButtonState.js";
import {mobileNav} from "../../utilities/mobileNav.js";

renderHeader();
renderFooter();
const isMobile = window.innerWidth <= 480;
if (isMobile) {
    mobileNav()
}


setupFilterControls({
    searchInputId: "searchInput",
    catBtnId: "cats-btn",
    dogBtnId: "dogs-btn",
    otherBtnId: "others-btn",
    allBtnId: "all-btn",
    renderFn: renderPetCard,
});

setupFilterButtonState()
