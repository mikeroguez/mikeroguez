<template>
  <NotFoundView />
</template>

<script setup lang="ts">
import { definePageMeta, setResponseStatus } from '#imports';

import NotFoundView from '@/views/NotFoundView.vue';
import { setLocaleForRoute } from '@/i18n';
import { usePageSeo } from '@/utils/seo';

definePageMeta({ name: 'not-found' });
setResponseStatus(404);
setLocaleForRoute('es');
usePageSeo('meta.notFoundTitle', 'meta.notFoundDesc', '/404', 'es');
</script>
