import EventBus from "./EventBus";
import EventListener from "./EventListener";

export const eventBus = new EventBus();

export const coreEventListener = new EventListener("core-remote");
