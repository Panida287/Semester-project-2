import {renderFooter} from "../../utilities/footer.js";
import {renderHeader} from "../../utilities/header.js";
import {renderPetCard} from "../../ui/listing/display.js";
import {pets} from "./placeHolderPets.js";

renderHeader();
renderFooter();

const container = document.getElementById("card-container");
pets.data.forEach(pet => {
    const card = renderPetCard(pet);
    container.appendChild(card);
});

