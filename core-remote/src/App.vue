<template>
  <h1>Hello Core Remote!</h1>
  <nav>
    <ul>
      <li>
        <RouterLink to="/users">Go to Users</RouterLink>
      </li>
      <li>
        <RouterLink to="/organizations">Go to Organizations</RouterLink>
      </li>
    </ul>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>
