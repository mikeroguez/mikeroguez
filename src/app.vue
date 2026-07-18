<template>
  <SkipLink />
  <DefaultLayout>
    <NuxtPage />
  </DefaultLayout>
  <CookieConsentBanner />
</template>

<script setup lang="ts">
import { onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import CookieConsentBanner from '@/components/CookieConsentBanner.vue';
import SkipLink from '@/components/SkipLink.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { getPostBySlug } from '@/content/blog';
import { detectNavigatorLocale, hasStoredLocalePreference, setLocaleForRoute } from '@/i18n';
import { localizedPath, pathLocale } from '@/utils/routes';

const route = useRoute();
const router = useRouter();

onMounted(() => {
  if (!hasStoredLocalePreference() && route.path === '/' && detectNavigatorLocale() === 'en') {
    void router.replace(localizedPath('/', 'en'));
  }
});

watchEffect(() => {
  const routeLocale = pathLocale(route.path);
  if (routeLocale) setLocaleForRoute(routeLocale);

  const match = route.path.match(/^\/blog\/([^/]+)\/?$/);
  const slug = match?.[1];
  if (!slug) return;

  const post = getPostBySlug(slug);
  if (post) setLocaleForRoute(post.meta.lang);
});
</script>
