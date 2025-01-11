import { createPinia } from "pinia";
import { createApp } from "vue";
// window.useStore
import "./stores/counter";
import App from "./App.vue";

const app = createApp(App);
app.use(createPinia());
app.mount("#app");
