import "./styles.ts";
import { createApp } from "vue";

// *INFO: internal modules
import App from "./App.vue";
import router from "./router";
import { pinia } from "./stores";
import { vuetify } from "./theme";

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(vuetify);

app.mount("#app");
