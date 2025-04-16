import { renderFooter } from '../../ui/footer.js';
import { renderHeader } from '../../ui/header.js';
import {renderPetCard} from "../../ui/pet/display.js";
import {setupFilterControls} from "../../utilities/filter.js";
import {setupFilterButtonState} from "../../utilities/setupFilterButtonState.js";

renderHeader();
renderFooter();

setupFilterControls({
    searchInputId: "searchInput",
    catBtnId: "cats-btn",
    dogBtnId: "dogs-btn",
    otherBtnId: "others-btn",
    allBtnId: "all-btn",
    renderFn: renderPetCard,
});

setupFilterButtonState();