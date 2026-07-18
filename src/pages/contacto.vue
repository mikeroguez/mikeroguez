<template>
  <ContactView />
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports';

import ContactView from '@/views/ContactView.vue';
import { setLocaleForRoute } from '@/i18n';
import { usePageSeo } from '@/utils/seo';

definePageMeta({ name: 'contact' });
setLocaleForRoute('es');
usePageSeo('meta.contactTitle', 'meta.contactDesc', '/contacto', 'es');
</script>
