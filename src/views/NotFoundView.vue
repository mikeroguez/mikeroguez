<template>
  <article class="page page--404">
    <BrandLogo mark="isotype" size="bg" decorative class="page-404__bg" />
    <p class="eyebrow">{{ t('notFound.eyebrow') }}</p>
    <h1>{{ t('notFound.h1') }}</h1>
    <p class="lead">{{ t('notFound.lead') }}</p>
    <RouterLink class="text-link" to="/">{{ t('notFound.back') }}</RouterLink>
  </article>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

import { t } from '@/i18n';
import BrandLogo from '@/components/BrandLogo.vue';
</script>
