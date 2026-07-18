<template>
  <CookiesView />
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports';

import CookiesView from '@/views/CookiesView.vue';
import { setLocaleForRoute } from '@/i18n';
import { usePageSeo } from '@/utils/seo';

definePageMeta({ name: 'cookies' });
setLocaleForRoute('es');
usePageSeo('meta.cookiesTitle', 'meta.cookiesDesc', '/aviso-de-cookies', 'es');
</script>
