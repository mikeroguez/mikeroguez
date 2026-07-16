<template>
  <WorkView />
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports';

import WorkView from '@/views/WorkView.vue';
import { usePageSeo } from '@/utils/seo';

definePageMeta({ name: 'work' });
usePageSeo('meta.workTitle', 'meta.workDesc', '/work');
</script>
