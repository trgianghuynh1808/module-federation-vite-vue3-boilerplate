import { createPinia } from "pinia";

// *INFO: internal modules
import { useCoreCounterStore } from "./counter";

const pinia = createPinia();

export { pinia, useCoreCounterStore };
