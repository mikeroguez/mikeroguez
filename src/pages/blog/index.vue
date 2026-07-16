<template>
  <BlogIndexView />
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports';

import BlogIndexView from '@/views/BlogIndexView.vue';
import { usePageSeo } from '@/utils/seo';

definePageMeta({ name: 'blog' });
usePageSeo('meta.blogTitle', 'meta.blogDesc', '/blog');
</script>
