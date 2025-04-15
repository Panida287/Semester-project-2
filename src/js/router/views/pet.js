import {renderHeader} from "../../ui/header.js";
import {renderFooter} from "../../ui/footer.js";
import {renderPetCard} from "../../ui/pet/display.js";
import {getIdFromUrl} from "../../utilities/getId.js";

renderHeader();
renderFooter();

const petId = getIdFromUrl("id");
renderPetCard(petId)


