<template>
  <div>
    <h1>Organization Page (Core Remote)</h1>
    <p>This is the organization page.</p>
    <CounterButton />
    <v-btn size="x-large">{{ t('test') }}</v-btn>
  </div>
</template>

<script setup lang="ts">
import CounterButton from '../components/CounterButton.vue';
import { useLocale } from 'vuetify';

const { t } = useLocale();
</script>

<style scoped></style>
