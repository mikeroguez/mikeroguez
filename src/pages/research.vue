<template>
  <ResearchView />
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports';

import ResearchView from '@/views/ResearchView.vue';
import { usePageSeo } from '@/utils/seo';

definePageMeta({ name: 'research' });
usePageSeo('meta.researchTitle', 'meta.researchDesc', '/research');
</script>
