<template>
  <header class="site-header" @keydown.escape="closeMenu">
    <div class="site-header__inner">
      <RouterLink
        class="site-header__brand"
        to="/"
        :aria-label="t('a11y.homeLink')"
        @click="closeMenu"
      >
        <BrandLogo decorative size="header" />
      </RouterLink>
      <div class="site-header__actions">
        <button
          class="site-header__lang-toggle"
          type="button"
          :lang="nextLocale"
          :aria-label="t('lang.toggleLabel')"
          @click="toggleLocale"
        >
          {{ nextLocaleLabel }}
        </button>
        <button
          class="site-header__menu-button"
          type="button"
          :aria-expanded="isMenuOpen"
          :aria-label="isMenuOpen ? t('a11y.closeMenu') : t('a11y.openMenu')"
          aria-controls="site-navigation"
          @click="toggleMenu"
        >
          <span class="site-header__menu-icon" aria-hidden="true"></span>
          <span class="site-header__menu-label">{{ t('a11y.menuLabel') }}</span>
        </button>
      </div>
      <AppNavigation
        id="site-navigation"
        class="site-header__navigation"
        :class="{ 'site-header__navigation--open': isMenuOpen }"
        @navigate="closeMenu"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';

import { locale, setLocale, t } from '@/i18n';
import type { Locale } from '@/i18n';
import { getPostBySlug, getPostPath, getPostTranslation } from '@/content/blog';
import AppNavigation from '@/components/AppNavigation.vue';
import BrandLogo from '@/components/BrandLogo.vue';

const isMenuOpen = ref(false);
const route = useRoute();
const router = useRouter();
const nextLocale = computed<Locale>(() => (locale.value === 'es' ? 'en' : 'es'));
const nextLocaleLabel = computed(() => nextLocale.value.toUpperCase());

watch(
  () => route.fullPath,
  () => closeMenu(),
);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu() {
  isMenuOpen.value = false;
}

async function toggleLocale() {
  const targetLocale = nextLocale.value;
  setLocale(targetLocale);
  await router.push(localizedPath(targetLocale));
}

function localizedPath(targetLocale: Locale): string {
  const blogPostSlug = getBlogPostSlug(route.path);
  if (blogPostSlug) {
    const post = getPostBySlug(blogPostSlug);
    const translation = post ? getPostTranslation(post, targetLocale) : undefined;
    if (translation) return getPostPath(translation);
  }

  if (route.path === '/blog') return '/blog';

  return route.path;
}

function getBlogPostSlug(path: string): string | undefined {
  const match = path.match(/^\/blog\/([^/]+)\/?$/);
  return match?.[1];
}
</script>
