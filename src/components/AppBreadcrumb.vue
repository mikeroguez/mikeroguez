<template>
  <nav v-if="items.length > 1" class="breadcrumb" :aria-label="t('a11y.breadcrumbNav')">
    <ol>
      <li v-for="(item, index) in items" :key="item.to ?? item.label">
        <RouterLink v-if="item.to && index < items.length - 1" :to="item.to">
          {{ item.label }}
        </RouterLink>
        <span v-else aria-current="page">{{ item.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

import { t } from '@/i18n';
import { getPostBySlug } from '@/content/blog';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

const route = useRoute();

const items = computed<BreadcrumbItem[]>(() => {
  if (route.name === 'home') return [];

  if (route.name === 'blog-post') {
    const slug = String(route.params.slug);
    const post = getPostBySlug(slug);
    const isEnglish = post?.meta.lang === 'en';
    return [
      { label: t('breadcrumb.home'), to: '/' },
      { label: t('breadcrumb.blog'), to: isEnglish ? '/en/blog' : '/blog' },
      { label: post?.meta.title ?? t('breadcrumb.publication') },
    ];
  }

  const sectionKey: Record<string, string> = {
    about: 'breadcrumb.about',
    work: 'breadcrumb.work',
    research: 'breadcrumb.research',
    blog: 'breadcrumb.blog',
    'blog-en': 'breadcrumb.blog',
    contact: 'breadcrumb.contact',
    'not-found': 'breadcrumb.notFound',
  };

  const routeName = typeof route.name === 'string' ? route.name : '';
  const label = t(sectionKey[routeName] ?? 'breadcrumb.home');

  return [{ label: t('breadcrumb.home'), to: '/' }, { label }];
});
</script>
