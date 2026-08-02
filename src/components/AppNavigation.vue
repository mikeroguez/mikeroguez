<template>
  <nav :aria-label="t('a11y.mainNav')">
    <ul class="nav-list">
      <li v-for="item in navigationItems" :key="item.to">
        <RouterLink
          :to="item.to"
          class="nav-link"
          :class="{ 'nav-link--active': isActiveNavigationItem(item) }"
          :aria-current="isActiveNavigationItem(item) ? 'page' : undefined"
          @click="$emit('navigate')"
        >
          {{ item.label }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

import { locale, t } from '@/i18n';
import { localizedPath } from '@/utils/routes';

defineEmits<{
  navigate: [];
}>();

type NavigationItem = {
  key: 'home' | 'about' | 'work' | 'research' | 'blog' | 'contact';
  to: string;
  label: string;
};

const route = useRoute();

const navigationItems = computed<NavigationItem[]>(() => [
  { key: 'home', to: localizedPath('/', locale.value), label: t('nav.home') },
  { key: 'about', to: localizedPath('/about', locale.value), label: t('nav.about') },
  { key: 'work', to: localizedPath('/work', locale.value), label: t('nav.work') },
  { key: 'research', to: localizedPath('/research', locale.value), label: t('nav.research') },
  { key: 'blog', to: localizedPath('/blog', locale.value), label: t('nav.blog') },
  { key: 'contact', to: localizedPath('/contact', locale.value), label: t('nav.contact') },
]);

function isActiveNavigationItem(item: NavigationItem): boolean {
  const currentPath = normalizePath(route.path);
  const itemPath = normalizePath(item.to);

  if (item.key === 'blog') {
    return (
      currentPath === '/blog' ||
      currentPath === '/publicaciones' ||
      currentPath.startsWith('/blog/')
    );
  }

  return currentPath === itemPath;
}

function normalizePath(path: string): string {
  if (path === '/') return path;
  return path.replace(/\/+$/, '');
}
</script>
