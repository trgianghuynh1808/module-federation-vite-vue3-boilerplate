<template>
  <div>
    <h1>User Page (Core Remote)</h1>
    <p>This is the user page.</p>

    <span>host counter: {{ hostCount }}</span>
  </div>
</template>

<script setup lang="ts">
import { hostEventListener } from '@/event';
import { onMounted, onUnmounted, ref } from 'vue';

const hostCount = ref(0);

const handleHostCountUpdated = (count: number) => {
  hostCount.value = count;
};

onMounted(() => {
  hostEventListener.on('host-counter-incremented', handleHostCountUpdated);
});

onUnmounted(() => {
  hostEventListener.off('host-counter-incremented', handleHostCountUpdated);
});
</script>

<style scoped></style>
