<template>
  <HomeView />
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports';

import HomeView from '@/views/HomeView.vue';
import { usePageSeo } from '@/utils/seo';

definePageMeta({ name: 'home' });
usePageSeo('meta.homeTitle', 'meta.homeDesc', '/');
</script>
