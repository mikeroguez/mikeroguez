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

import { t } from '@/i18n';

defineEmits<{
  navigate: [];
}>();

const navigationItems = computed(() => [
  { to: '/', label: t('nav.home') },
  { to: '/about', label: t('nav.about') },
  { to: '/work', label: t('nav.work') },
  { to: '/research', label: t('nav.research') },
  { to: '/blog', label: t('nav.blog') },
  { to: '/contact', label: t('nav.contact') },
]);
</script>
