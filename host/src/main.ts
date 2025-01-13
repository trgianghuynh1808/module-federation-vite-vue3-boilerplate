import { createPinia } from "pinia";
import { createApp } from "vue";

// *INFO: internal moudles
import App from "./App.vue";
import router from "./router";
import "./stores/counter";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
