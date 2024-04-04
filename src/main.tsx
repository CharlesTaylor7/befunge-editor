import Alpine from "alpinejs";
import { initialPrograms, initialExecutionState } from "@/utilities/defaultState";

window.Alpine = Alpine;

Alpine.store('execution', initialExecutionState);
Alpine.store('activeProgramIndex', 0);

Alpine.start();
