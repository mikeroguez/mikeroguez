<template>
  <BlogIndexView lang="es" />
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports';

import BlogIndexView from '@/views/BlogIndexView.vue';
import { setLocaleForRoute } from '@/i18n';
import { usePageSeo } from '@/utils/seo';

definePageMeta({ name: 'blog' });
setLocaleForRoute('es');
usePageSeo('meta.blogTitle', 'meta.blogDesc', '/publicaciones', 'es');
</script>
