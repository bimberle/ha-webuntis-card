import { HAWebUntisCard } from "./custom-element/ha-webuntis-card";
import { printVersion } from "./utils";

// Registering card
customElements.define("ha-webuntis-card", HAWebUntisCard);

printVersion();