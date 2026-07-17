<template>
  <SkipLink />
  <DefaultLayout>
    <NuxtPage />
  </DefaultLayout>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';

import SkipLink from '@/components/SkipLink.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { getPostBySlug } from '@/content/blog';
import { setLocaleForRoute } from '@/i18n';

const route = useRoute();

watchEffect(() => {
  const match = route.path.match(/^\/blog\/([^/]+)\/?$/);
  const slug = match?.[1];
  if (!slug) return;

  const post = getPostBySlug(slug);
  if (post) setLocaleForRoute(post.meta.lang);
});
</script>
