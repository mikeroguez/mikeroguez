<template>
  <BlogPostView />
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { definePageMeta, useHead, useSeoMeta } from '#imports';

import BlogPostView from '@/views/BlogPostView.vue';
import { getPostBySlug, getPostTranslation } from '@/content/blog';
import { setLocaleForRoute, t } from '@/i18n';
import { useSiteSeo } from '@/utils/seo';
import { absoluteUrl, SITE_AUTHOR, SITE_URL } from '@/utils/site';

definePageMeta({ name: 'blog-post' });

const AUTHOR_URL = SITE_URL;

const route = useRoute();
const slug = computed(() => String(route.params.slug));
const post = computed(() => getPostBySlug(slug.value));
const spanishPost = computed(() =>
  post.value?.meta.lang === 'es'
    ? post.value
    : post.value
      ? getPostTranslation(post.value, 'es')
      : undefined,
);
const englishPost = computed(() =>
  post.value?.meta.lang === 'en'
    ? post.value
    : post.value
      ? getPostTranslation(post.value, 'en')
      : undefined,
);
const alternatePaths = computed(() =>
  post.value
    ? {
        es: spanishPost.value ? `/blog/${spanishPost.value.slug}` : `/blog/${post.value.slug}`,
        en: englishPost.value ? `/blog/${englishPost.value.slug}` : `/blog/${post.value.slug}`,
      }
    : undefined,
);
const seoTitle = computed(() => post.value?.meta.seoTitle ?? post.value?.meta.title);
const postKeywords = computed(() => post.value?.meta.keywords ?? post.value?.meta.tags ?? []);
const postKeywordText = computed(() => postKeywords.value.join(', '));

watchEffect(() => {
  if (post.value) setLocaleForRoute(post.value.meta.lang);
});

useSiteSeo({
  title: computed(() => (post.value ? `${seoTitle.value} | Mikeroguez` : t('meta.blogPostTitle'))),
  description: computed(() => post.value?.meta.description ?? t('meta.blogPostDesc')),
  path: `/blog/${slug.value}`,
  lang: computed(() => post.value?.meta.lang),
  alternatePaths,
  type: 'article',
  imagePath: computed(() => post.value?.meta.image),
});

useSeoMeta({
  articlePublishedTime: computed(() => post.value?.meta.date),
  articleModifiedTime: computed(() => post.value?.meta.updated ?? post.value?.meta.date),
  articleAuthor: [AUTHOR_URL],
  articleTag: computed(() => post.value?.meta.tags),
  keywords: postKeywordText,
});

useHead(
  computed(() => ({
    script: post.value
      ? [
          {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: post.value.meta.title,
              name: seoTitle.value,
              description: post.value.meta.description,
              datePublished: post.value.meta.date,
              dateModified: post.value.meta.updated ?? post.value.meta.date,
              inLanguage: post.value.meta.lang === 'es' ? 'es-MX' : 'en',
              url: absoluteUrl(`/blog/${post.value.slug}`),
              mainEntityOfPage: absoluteUrl(`/blog/${post.value.slug}`),
              author: {
                '@type': 'Person',
                name: SITE_AUTHOR,
                url: AUTHOR_URL,
              },
              ...(postKeywords.value.length ? { keywords: postKeywords.value.join(', ') } : {}),
            }),
          },
        ]
      : [],
  })),
);
</script>
