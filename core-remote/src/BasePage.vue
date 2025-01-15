<template>
  <main>
    <component :is="currentComponent" />
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// *INFO: internal modules
import { routes } from './router';

const route = useRoute();
const currentComponent = ref(null);

const updateComponent = async (): Promise<void> => {
  const matched = routes.find(r => r.path === route.path);
  if (matched?.component) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const component = matched?.component as (() => Promise<any>) | any;

    currentComponent.value =
      component && typeof component === 'function'
        ? await component()
        : matched.component;
  }
};

onMounted(updateComponent);

watch(() => route.path, updateComponent);
</script>
