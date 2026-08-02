<template>
  <article class="page page--wide">
    <header class="page-hero">
      <div class="page-hero__title">
        <p class="eyebrow">{{ t('home.eyebrow') }}</p>
        <h1>{{ t('home.h1') }}</h1>
      </div>
      <div class="page-hero__text">
        <p class="lead">{{ t('home.lead') }}</p>
        <p class="intro">{{ t('home.intro') }}</p>

        <ul class="action-list" :aria-label="t('home.sectionsLabel')">
          <li>
            <RouterLink :to="localizedPath('/research', locale)">{{
              t('nav.research')
            }}</RouterLink>
          </li>
          <li>
            <RouterLink :to="localizedPath('/work', locale)">{{ t('nav.work') }}</RouterLink>
          </li>
          <li>
            <RouterLink :to="localizedPath('/blog', locale)">{{ t('nav.blog') }}</RouterLink>
          </li>
        </ul>
      </div>
    </header>

    <section class="content-section" aria-labelledby="home-focus">
      <h2 id="home-focus">{{ t('home.focusHeading') }}</h2>
      <div class="feature-grid">
        <section>
          <h3>{{ t('home.focusHciTitle') }}</h3>
          <p>{{ t('home.focusHciDesc') }}</p>
        </section>
        <section>
          <h3>{{ t('home.focusEduTitle') }}</h3>
          <p>{{ t('home.focusEduDesc') }}</p>
        </section>
        <section>
          <h3>{{ t('home.focusAiTitle') }}</h3>
          <p>{{ t('home.focusAiDesc') }}</p>
        </section>
      </div>
    </section>

    <section class="content-section" aria-labelledby="home-pathways">
      <h2 id="home-pathways">{{ t('home.pathwaysHeading') }}</h2>
      <div class="pathway-grid">
        <article v-for="pathway in pathways" :key="pathway.title" class="pathway-card">
          <h3>{{ pathway.title }}</h3>
          <p>{{ pathway.description }}</p>
          <RouterLink :to="pathway.href">{{ pathway.link }}</RouterLink>
        </article>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

import { locale, t } from '@/i18n';
import { localizedPath } from '@/utils/routes';

const pathways = computed(() => [
  {
    title: t('home.pathwayResearchTitle'),
    description: t('home.pathwayResearchDesc'),
    link: t('home.pathwayResearchLink'),
    href: localizedPath('/research', locale.value),
  },
  {
    title: t('home.pathwayWorkTitle'),
    description: t('home.pathwayWorkDesc'),
    link: t('home.pathwayWorkLink'),
    href: localizedPath('/work', locale.value),
  },
  {
    title: t('home.pathwayBlogTitle'),
    description: t('home.pathwayBlogDesc'),
    link: t('home.pathwayBlogLink'),
    href: localizedPath('/blog', locale.value),
  },
  {
    title: t('home.pathwayContactTitle'),
    description: t('home.pathwayContactDesc'),
    link: t('home.pathwayContactLink'),
    href: localizedPath('/contact', locale.value),
  },
]);
</script>
