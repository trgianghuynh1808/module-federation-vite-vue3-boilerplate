import { createApp } from "vue";

// *INFO: internal modules
import BasePage from "./BasePage.vue";
import router from "./router";
import { pinia } from "./stores";
import { vuetify } from "./theme";

const createRemoteBasePage = () => {
  const app = createApp(BasePage);

  app.use(router);
  app.use(pinia);
  app.use(vuetify);

  return {
    app,
    mount: (el: HTMLElement) => app.mount(el),
    unmount: () => app.unmount(),
    remoteRouter: router,
  };
};

export { createRemoteBasePage, pinia };
