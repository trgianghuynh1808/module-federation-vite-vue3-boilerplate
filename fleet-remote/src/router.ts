import { createRouter, createWebHistory } from "vue-router";

// *INFO: internal modules
import AboutPage from "./pages/AboutPage.vue";
import VehiclePage from "./pages/VehiclePage.vue";

export const routes = [
  {
    path: "/vehicles",
    name: "Vehicles",
    component: VehiclePage,
  },
  {
    path: "/about",
    name: "About",
    component: AboutPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
