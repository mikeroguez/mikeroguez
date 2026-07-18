<template>
  <HomeView />
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports';

import HomeView from '@/views/HomeView.vue';
import { setLocaleForRoute } from '@/i18n';
import { usePageSeo } from '@/utils/seo';

definePageMeta({ name: 'home-en' });
setLocaleForRoute('en');
usePageSeo('meta.homeTitle', 'meta.homeDesc', '/home', 'en');
</script>
