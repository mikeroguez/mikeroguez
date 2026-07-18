<template>
  <ResearchView />
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports';

import ResearchView from '@/views/ResearchView.vue';
import { setLocaleForRoute } from '@/i18n';
import { usePageSeo } from '@/utils/seo';

definePageMeta({ name: 'research' });
setLocaleForRoute('es');
usePageSeo('meta.researchTitle', 'meta.researchDesc', '/investigacion', 'es');
</script>
