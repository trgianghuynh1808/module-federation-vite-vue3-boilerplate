<template>
  <button class="counter" @click="increment">
    Remote counter: {{ count }}
  </button>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

// *INFO: internal modules
import { eventBus, coreEventListener } from "../event/";

const count = ref(0);

const increment = () => {
  count.value++;

  eventBus.emit("remote-counter-incremented", count.value);
};

const handleHostCountUpdated = (currentCount: number) => {
  count.value = currentCount;
};

onMounted(() => {
  coreEventListener.on("remote-counter-incremented", handleHostCountUpdated);
});

onUnmounted(() => {
  coreEventListener.off("remote-counter-incremented", handleHostCountUpdated);
});
</script>

<style scoped>
.counter {
  border: 0 solid #e2e8f0;
  margin-top: 10px;
  background-color: rgb(246, 179, 82);
  border-radius: 0.25rem;
  font-weight: 700;
  padding: 0.5rem 1rem 0.5rem 1rem;
  color: rgb(24, 24, 24);
}
</style>
