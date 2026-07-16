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
            <RouterLink to="/research">{{ t('nav.research') }}</RouterLink>
          </li>
          <li>
            <RouterLink to="/work">{{ t('nav.work') }}</RouterLink>
          </li>
          <li>
            <RouterLink to="/blog">{{ t('nav.blog') }}</RouterLink>
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
  </article>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

import { t } from '@/i18n';
</script>
