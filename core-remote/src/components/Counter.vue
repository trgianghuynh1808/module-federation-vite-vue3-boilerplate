<script setup lang="ts">
import { hostEventListener } from "@/event";
import { storeToRefs } from "pinia";
import { onMounted, onUnmounted } from "vue";
import { useCoreCounterStore } from "../stores";
const store = useCoreCounterStore();

const { count } = storeToRefs(store);

const handleCountUpdated = (currentCount: number) => {
  store.set(currentCount);
};

onMounted(() => {
  hostEventListener.on("remote-counter-incremented", handleCountUpdated);
});

onUnmounted(() => {
  hostEventListener.off("remote-counter-incremented", handleCountUpdated);
});
</script>

<template>
  <button
    style="
      border: 0 solid #e2e8f0;
      margin-top: 10px;
      background-color: rgb(246, 179, 82);
      border-radius: 0.25rem;
      font-weight: 700;
      padding: 0.5rem 1rem 0.5rem 1rem;
      color: rgb(24, 24, 24);
    "
    @click="store.increment"
  >
    Remote counter: {{ count }}
  </button>
</template>

<style scoped />
