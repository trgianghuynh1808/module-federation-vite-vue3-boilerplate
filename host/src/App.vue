<template>
  <div class="host">
    <div class="app-container">
      <aside class="sidebar">
        <nav>
          <ul>
            <li><router-link to="/coreRemote/users">Users</router-link></li>
            <li>
              <router-link to="/coreRemote/organizations"
                >Organizations</router-link
              >
            </li>
            <li>
              <router-link to="/fleetRemote/vehicles">Vehicles</router-link>
            </li>
            <li>
              <router-link to="/fleetRemote/about">Vehicles about</router-link>
            </li>
          </ul>
        </nav>
        <HostCounter />
        <RemoteCounter />
      </aside>
      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import { RouterLink, RouterView, useRouter } from "vue-router";

import HostCounter from "./components/HostCounter.vue";
import RemoteCounter from "./components/RemoteCounter.vue";

const router = useRouter();

onMounted(() => {
  // Ensure we have a default route
  if (router.currentRoute.value.path === "/") {
    router.push("/coreRemote/users");
  }
});

watch(
  () => router.currentRoute.value,
  (to) => {
    console.log("Route changed to", to);
  }
);
</script>

<style scoped>
.host .card {
  background: #3178c6;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  margin: 20px 20px 20px 20px;
  width: 250px;
  padding: 20px;
  text-align: center;
  color: white;
  float: left;
}

.host .title {
  margin-top: 10px;
  font-size: 25px;
}

.host svg {
  width: 100px;
  height: 100px;
}

.host path {
  fill: #f6b352;
}

.app-container {
  display: flex;
  min-height: 100vh;
}
.sidebar {
  width: 250px;
  background: #f3f4f6;
  padding: 20px;
}
.content {
  flex: 1;
  padding: 20px;
}
nav ul {
  list-style: none;
  padding: 0;
}
nav ul li {
  margin-bottom: 10px;
}
nav ul li a {
  text-decoration: none;
  color: #374151;
  padding: 8px 12px;
  display: block;
  border-radius: 6px;
}
nav ul li a.router-link-active {
  background: #e5e7eb;
  color: #000;
}
</style>
