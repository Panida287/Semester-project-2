import { renderFooter } from "../../utilities/footer.js";
import { renderHeader } from "../../utilities/header.js";
import { renderPetCard } from "../../ui/pet/display.js";
import { setLogoutListener } from "../../ui/global/logout.js";
import { setupFilterControls } from "../../utilities/filter.js";

renderHeader();
renderFooter();
setLogoutListener();

setupFilterControls({
    searchInputId: "searchInput",
    catBtnId: "cats-btn",
    dogBtnId: "dogs-btn",
    otherBtnId: "others-btn",
    allBtnId: "all-btn",
    renderFn: renderPetCard,
});
