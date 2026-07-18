<template>
  <nav :aria-label="t('a11y.mainNav')">
    <ul class="nav-list">
      <li v-for="item in navigationItems" :key="item.to">
        <RouterLink :to="item.to" class="nav-link" @click="$emit('navigate')">
          {{ item.label }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

import { locale, t } from '@/i18n';
import { localizedPath } from '@/utils/routes';

defineEmits<{
  navigate: [];
}>();

const navigationItems = computed(() => [
  { to: localizedPath('/', locale.value), label: t('nav.home') },
  { to: localizedPath('/about', locale.value), label: t('nav.about') },
  { to: localizedPath('/work', locale.value), label: t('nav.work') },
  { to: localizedPath('/research', locale.value), label: t('nav.research') },
  { to: localizedPath('/blog', locale.value), label: t('nav.blog') },
  { to: localizedPath('/contact', locale.value), label: t('nav.contact') },
]);
</script>
