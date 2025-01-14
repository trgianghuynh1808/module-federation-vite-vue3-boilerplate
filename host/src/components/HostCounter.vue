<template>
  <button class="counter" @click="increment">Host counter: {{ count }}</button>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

// *INFO: internal modules
import { eventBus } from "../event";

const count = ref(0);
const route = useRoute();

const increment = () => {
  count.value++;

  eventBus.emit("host-counter-incremented", count.value);
};

watch(
  () => route.path,
  () => {
    count.value = 0;
  }
);
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
