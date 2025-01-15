import { createRouter, createWebHistory } from 'vue-router';

// *INFO: internal modules
import UserPage from './pages/UserPage.vue';
import OrganizationPage from './pages/OrganizationPage.vue';

export const routes = [
  {
    path: '/users',
    name: 'Users',
    component: UserPage,
  },
  {
    path: '/organizations',
    name: 'Organizations',
    component: OrganizationPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
