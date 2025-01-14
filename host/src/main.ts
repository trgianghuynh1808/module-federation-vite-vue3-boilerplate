import { createApp } from "vue";

// *INFO: internal moudles
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);

app.mount("#app");
