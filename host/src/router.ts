import { createRouter, createWebHistory } from "vue-router";

// *INFO: internal modules
import RemoteWrapper from "./RemoteWrapper.vue";

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
