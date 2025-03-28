import {renderFooter} from "../../utilities/footer.js";
import {renderHeader} from "../../utilities/header.js";
import {renderPetCard} from "../../ui/listing/display.js";
import {setLogoutListener} from "../../ui/global/logout.js";

renderHeader();
renderFooter();
renderPetCard()
setLogoutListener();
