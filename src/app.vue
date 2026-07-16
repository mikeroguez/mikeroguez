<template>
  <SkipLink />
  <DefaultLayout>
    <NuxtPage />
  </DefaultLayout>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { watchEffect } from 'vue';

import SkipLink from '@/components/SkipLink.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { hasStoredLocale, localeFromPath, setLocaleForRoute } from '@/i18n';

const route = useRoute();

watchEffect(() => {
  if (!hasStoredLocale()) {
    setLocaleForRoute(localeFromPath(route.path));
  }
});
</script>
