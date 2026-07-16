<template>
  <SkipLink />
  <DefaultLayout>
    <RouterView />
  </DefaultLayout>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';

import { locale, t } from '@/i18n';
import SkipLink from '@/components/SkipLink.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

const route = useRoute();

watch(locale, () => {
  const titleKey = typeof route.meta.titleKey === 'string' ? route.meta.titleKey : 'meta.homeTitle';
  const descKey = typeof route.meta.descKey === 'string' ? route.meta.descKey : 'meta.homeDesc';
  document.title = t(titleKey);
  document.querySelector('meta[name="description"]')?.setAttribute('content', t(descKey));
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', t(titleKey));
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', t(descKey));
});
</script>
