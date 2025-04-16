/**
 * Initializes the homepage by rendering the header, footer, and
 * setting up pet filtering functionality for search and category buttons.
 */

import { renderHeader } from '../../ui/header.js';
import { renderFooter } from '../../ui/footer.js';
import { renderPetCard } from '../../ui/pet/display.js';
import { setupFilterControls } from '../../utilities/filter.js';
import { setupFilterButtonState } from '../../utilities/setupFilterButtonState.js';

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
