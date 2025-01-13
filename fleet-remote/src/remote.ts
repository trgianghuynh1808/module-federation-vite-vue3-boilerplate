import { createApp } from "vue";

// *INFO: internal modules
import BasePage from "./BasePage.vue";
import router from "./router";

const createRemoteBasePage = () => {
  const app = createApp(BasePage);

  app.use(router);

  return {
    app,
    mount: (el: HTMLElement) => app.mount(el),
    unmount: () => app.unmount(),
    remoteRouter: router,
  };
};

export { createRemoteBasePage };
