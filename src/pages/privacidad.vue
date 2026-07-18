<template>
  <PrivacyView />
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports';

import PrivacyView from '@/views/PrivacyView.vue';
import { setLocaleForRoute } from '@/i18n';
import { usePageSeo } from '@/utils/seo';

definePageMeta({ name: 'privacy' });
setLocaleForRoute('es');
usePageSeo('meta.privacyTitle', 'meta.privacyDesc', '/privacidad', 'es');
</script>
