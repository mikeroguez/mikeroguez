<template>
  <AboutView />
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports';

import AboutView from '@/views/AboutView.vue';
import { usePageSeo } from '@/utils/seo';

definePageMeta({ name: 'about' });
usePageSeo('meta.aboutTitle', 'meta.aboutDesc', '/about');
</script>
