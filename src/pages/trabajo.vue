<template>
  <WorkView />
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports';

import WorkView from '@/views/WorkView.vue';
import { setLocaleForRoute } from '@/i18n';
import { usePageSeo } from '@/utils/seo';

definePageMeta({ name: 'work' });
setLocaleForRoute('es');
usePageSeo('meta.workTitle', 'meta.workDesc', '/trabajo', 'es');
</script>
