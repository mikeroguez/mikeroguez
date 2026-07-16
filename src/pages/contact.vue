<template>
  <ContactView />
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports';

import ContactView from '@/views/ContactView.vue';
import { usePageSeo } from '@/utils/seo';

definePageMeta({ name: 'contact' });
usePageSeo('meta.contactTitle', 'meta.contactDesc', '/contact');
</script>
