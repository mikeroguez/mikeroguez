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
import { localeFromPath, setLocale } from '@/i18n';

const route = useRoute();

watchEffect(() => {
  setLocale(localeFromPath(route.path));
});
</script>
