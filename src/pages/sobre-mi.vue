<template>
  <AboutView />
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports';

import AboutView from '@/views/AboutView.vue';
import { setLocaleForRoute } from '@/i18n';
import { usePageSeo } from '@/utils/seo';

definePageMeta({ name: 'about' });
setLocaleForRoute('es');
usePageSeo('meta.aboutTitle', 'meta.aboutDesc', '/sobre-mi', 'es');
</script>
