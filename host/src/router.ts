import { createRouter, createWebHistory } from "vue-router";

// *INFO: internal modules
import RemoteWrapper from "./RemoteWrapper.vue";

const oldRoutes = [
  {
    path: "/users",
    name: "Users",
    component: RemoteWrapper,
    props: { remoteName: "coreRemote" },
  },
  {
    path: "/organizations",
    name: "Organizations",
    component: RemoteWrapper,
    props: { remoteName: "coreRemote" },
  },
  {
    path: "/vehicles",
    name: "Vehicles",
    component: RemoteWrapper,
    props: { remoteName: "fleetRemote" },
  },
  {
    path: "/about",
    name: "About",
    component: RemoteWrapper,
    props: { remoteName: "fleetRemote" },
  },
];

const routes = [
  {
    path: "/coreRemote/:pathMatch(.*)*",
    name: "CoreRemote",
    component: RemoteWrapper,
    props: { remoteName: "coreRemote" },
  },
  {
    path: "/fleetRemote/:pathMatch(.*)*",
    name: "FleetRemote",
    component: RemoteWrapper,
    props: { remoteName: "fleetRemote" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
