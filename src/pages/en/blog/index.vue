<template>
  <BlogIndexView lang="en" />
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports';

import BlogIndexView from '@/views/BlogIndexView.vue';
import { setLocaleForRoute } from '@/i18n';
import { usePageSeo } from '@/utils/seo';

definePageMeta({ name: 'blog-en' });
setLocaleForRoute('en');
usePageSeo('meta.blogTitle', 'meta.blogDesc', '/en/blog');
</script>
