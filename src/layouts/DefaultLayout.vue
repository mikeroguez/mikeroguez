<template>
  <div class="site-shell">
    <AppHeader />
    <main id="main-content" class="site-main" tabindex="-1">
      <AppBreadcrumb />
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppBreadcrumb from '@/components/AppBreadcrumb.vue';
import AppFooter from '@/components/AppFooter.vue';
import AppHeader from '@/components/AppHeader.vue';
</script>
