/**
 * Initializes the pet detail page by rendering header, footer,
 * and loading the specific pet data using the ID from the URL.
 */

import { renderHeader } from "../../ui/header.js";
import { renderFooter } from "../../ui/footer.js";
import { renderPetCard } from "../../ui/pet/display.js";
import { getIdFromUrl } from "../../utilities/getId.js";

renderHeader();
renderFooter();

const petId = getIdFromUrl("id");
renderPetCard(petId);
