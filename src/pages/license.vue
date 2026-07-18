<template>
  <LicenseView />
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports';

import LicenseView from '@/views/LicenseView.vue';
import { setLocaleForRoute } from '@/i18n';
import { usePageSeo } from '@/utils/seo';

definePageMeta({ name: 'license-en' });
setLocaleForRoute('en');
usePageSeo('meta.licenseTitle', 'meta.licenseDesc', '/license', 'en');
</script>
