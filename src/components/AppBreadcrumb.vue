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

import { locale, t } from '@/i18n';
import { getPostBySlug } from '@/content/blog';
import { localizedPath } from '@/utils/routes';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

const route = useRoute();

const items = computed<BreadcrumbItem[]>(() => {
  if (route.name === 'home' || route.name === 'home-en') return [];

  if (route.name === 'blog-post' || route.name === 'blog-post-en') {
    const slug = String(route.params.slug);
    const post = getPostBySlug(slug);
    const postLocale = post?.meta.lang ?? locale.value;
    return [
      { label: t('breadcrumb.home'), to: localizedPath('/', postLocale) },
      { label: t('breadcrumb.blog'), to: localizedPath('/blog', postLocale) },
      { label: post?.meta.title ?? t('breadcrumb.publication') },
    ];
  }

  const sectionKey: Record<string, string> = {
    about: 'breadcrumb.about',
    work: 'breadcrumb.work',
    research: 'breadcrumb.research',
    blog: 'breadcrumb.blog',
    contact: 'breadcrumb.contact',
    privacy: 'breadcrumb.privacy',
    cookies: 'breadcrumb.cookies',
    license: 'breadcrumb.license',
    'not-found': 'breadcrumb.notFound',
  };

  const routeName = typeof route.name === 'string' ? route.name.replace(/-en$/, '') : '';
  const label = t(sectionKey[routeName] ?? 'breadcrumb.home');

  return [{ label: t('breadcrumb.home'), to: localizedPath('/', locale.value) }, { label }];
});
</script>
