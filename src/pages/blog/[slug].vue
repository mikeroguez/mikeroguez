<template>
  <BlogPostView />
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { definePageMeta, useHead, useSeoMeta } from '#imports';

import BlogPostView from '@/views/BlogPostView.vue';
import { getPostBySlug } from '@/content/blog';
import { setLocaleForRoute, t } from '@/i18n';
import { useSiteSeo } from '@/utils/seo';
import { absoluteUrl, SITE_AUTHOR, SITE_URL } from '@/utils/site';

definePageMeta({ name: 'blog-post' });

const AUTHOR_URL = SITE_URL;

const route = useRoute();
const slug = computed(() => String(route.params.slug));
const post = computed(() => getPostBySlug(slug.value));

watchEffect(() => {
  if (post.value) setLocaleForRoute(post.value.meta.lang);
});

useSiteSeo({
  title: computed(() =>
    post.value ? `${post.value.meta.title} | Mikeroguez` : t('meta.blogPostTitle'),
  ),
  description: computed(() => post.value?.meta.description ?? t('meta.blogPostDesc')),
  path: `/blog/${slug.value}`,
  type: 'article',
  imagePath: computed(() => post.value?.meta.image),
});

useSeoMeta({
  articlePublishedTime: computed(() => post.value?.meta.date),
  articleAuthor: [AUTHOR_URL],
  articleTag: computed(() => post.value?.meta.tags),
});

useHead(
  computed(() => ({
    script: post.value
      ? [
          {
            type: 'application/ld+json',
            children: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: post.value.meta.title,
              description: post.value.meta.description,
              datePublished: post.value.meta.date,
              inLanguage: post.value.meta.lang === 'es' ? 'es-MX' : 'en',
              url: absoluteUrl(`/blog/${post.value.slug}`),
              author: {
                '@type': 'Person',
                name: SITE_AUTHOR,
                url: AUTHOR_URL,
              },
              ...(post.value.meta.tags?.length
                ? { keywords: post.value.meta.tags.join(', ') }
                : {}),
            }),
          },
        ]
      : [],
  })),
);
</script>
