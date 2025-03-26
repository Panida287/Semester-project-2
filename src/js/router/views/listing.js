import { renderHeader } from "../../utilities/header.js";
import { renderFooter } from "../../utilities/footer.js";
import { RenderSpecificPetDetail } from "../../ui/listing/display.js";
import { pets } from "./placeHolderPets.js";


renderHeader();
renderFooter();
const pet = pets.data[0];
RenderSpecificPetDetail(pet);

