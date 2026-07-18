<template>
  <LicenseView />
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports';

import LicenseView from '@/views/LicenseView.vue';
import { setLocaleForRoute } from '@/i18n';
import { usePageSeo } from '@/utils/seo';

definePageMeta({ name: 'license' });
setLocaleForRoute('es');
usePageSeo('meta.licenseTitle', 'meta.licenseDesc', '/licencia', 'es');
</script>
