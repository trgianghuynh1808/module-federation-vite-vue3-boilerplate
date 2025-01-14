import { eventBus } from "@/event";
import { defineStore } from "pinia";

export const useCoreCounterStore = defineStore("coreCounterStore", {
  state: () => ({ count: 0 }),
  getters: {
    getCount(): number {
      return this.count;
    },
  },
  actions: {
    increment() {
      this.count++;

      eventBus.emit("remote-counter-incremented", this.count);
    },

    set(count: number) {
      this.count = count;
    },
  },
});
