<template>
  <div>
    <h1>Organization Page (Core Remote)</h1>
    <p>This is the organization page.</p>
    <Counter />
    <v-btn size="x-large">{{ t("test") }}</v-btn>
  </div>
</template>

<script setup lang="ts">
import Counter from "../components/Counter.vue";
import { useLocale } from "vuetify";

const { t } = useLocale();
</script>

<style scoped></style>
