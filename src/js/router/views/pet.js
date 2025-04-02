import {renderHeader} from "../../utilities/header.js";
import {renderFooter} from "../../utilities/footer.js";
import {renderPetCard} from "../../ui/pet/display.js";
import {getIdFromUrl} from "../../utilities/getId.js";
import {mobileNav} from "../../utilities/mobileNav.js";

renderHeader();
renderFooter();
mobileNav();

const petId = getIdFromUrl("id");
renderPetCard(petId)


