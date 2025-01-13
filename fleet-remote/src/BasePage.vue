<template>
  <main>
    <component :is="currentComponent" />
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

// *INFO: internal modules
import { routes } from "./router";

const route = useRoute();
const currentComponent = ref(null);

const updateComponent = async (): Promise<void> => {
  const matched = routes.find((r) => r.path === route.path);
  if (matched?.component) {
    const component = matched?.component as (() => Promise<any>) | any;

    currentComponent.value = (await (component &&
      typeof component === "function"))
      ? component()
      : matched.component;
  }
};

onMounted(updateComponent);

watch(() => route.path, updateComponent);
</script>
