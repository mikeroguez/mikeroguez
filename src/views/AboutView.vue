<template>
  <article class="page">
    <div class="about-intro">
      <div class="about-intro__text">
        <p class="eyebrow">{{ t('about.eyebrow') }}</p>
        <h1>{{ t('about.h1') }}</h1>
        <p class="lead">{{ t('about.lead') }}</p>
        <p>{{ t('about.bio1') }}</p>
        <p>{{ t('about.bio2') }}</p>
        <p>{{ t('about.bio3') }}</p>
        <p v-if="t('about.bio4')">{{ t('about.bio4') }}</p>
      </div>
      <div class="about-intro__media">
        <picture>
          <source srcset="/images/mike-roguez.webp" type="image/webp" />
          <img
            src="/images/mike-roguez.jpg"
            :alt="t('about.photoAlt')"
            width="640"
            height="640"
            class="about-intro__photo"
          />
        </picture>
      </div>
    </div>

    <section class="content-section" aria-labelledby="about-lines">
      <h2 id="about-lines">{{ t('about.linesHeading') }}</h2>
      <ul class="clean-list">
        <li>{{ t('about.line1') }}</li>
        <li>{{ t('about.line2') }}</li>
        <li>{{ t('about.line3') }}</li>
        <li>{{ t('about.line4') }}</li>
      </ul>

      <ul class="action-list" :aria-label="t('about.ctaLabel')">
        <li>
          <RouterLink :to="localizedPath('/research', locale)">{{
            t('about.ctaResearch')
          }}</RouterLink>
        </li>
        <li>
          <RouterLink :to="localizedPath('/work', locale)">{{ t('about.ctaWork') }}</RouterLink>
        </li>
      </ul>
    </section>
  </article>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

import { locale, t } from '@/i18n';
import { localizedPath } from '@/utils/routes';
</script>
