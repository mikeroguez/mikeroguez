<template>
  <BlogPostView lang="en" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { definePageMeta } from '#imports';

import BlogPostView from '@/views/BlogPostView.vue';
import { getPostBySlug } from '@/content/blog';
import { setLocale, t } from '@/i18n';
import { useSiteSeo } from '@/utils/seo';

definePageMeta({ name: 'blog-post-en' });
setLocale('en');

const route = useRoute();
const slug = computed(() => String(route.params.slug));
const post = computed(() => getPostBySlug(slug.value, 'en'));

useSiteSeo({
  title: computed(() =>
    post.value ? `${post.value.meta.title} | Mikeroguez` : t('meta.blogPostTitle'),
  ),
  description: computed(() => post.value?.meta.description ?? t('meta.blogPostDesc')),
  path: `/en/blog/${slug.value}`,
  type: 'article',
  imagePath: computed(() => post.value?.meta.image),
});
</script>
