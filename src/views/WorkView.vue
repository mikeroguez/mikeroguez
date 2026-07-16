<template>
  <article class="page page--wide">
    <p class="eyebrow">{{ t('work.eyebrow') }}</p>
    <h1>{{ t('work.h1') }}</h1>
    <p class="lead">{{ t('work.lead') }}</p>

    <section class="content-section" aria-labelledby="work-areas">
      <h2 id="work-areas">{{ t('work.areasHeading') }}</h2>
      <div class="feature-grid">
        <section>
          <h3>{{ t('work.areaEduTitle') }}</h3>
          <p>{{ t('work.areaEduDesc') }}</p>
        </section>
        <section>
          <h3>{{ t('work.areaHciTitle') }}</h3>
          <p>{{ t('work.areaHciDesc') }}</p>
        </section>
        <section>
          <h3>{{ t('work.areaGamesTitle') }}</h3>
          <p>{{ t('work.areaGamesDesc') }}</p>
        </section>
      </div>
    </section>

    <section class="content-section" aria-labelledby="work-projects">
      <h2 id="work-projects">{{ t('work.projectsHeading') }}</h2>
      <div class="project-grid">
        <article class="project-card">
          <p class="project-card__type">{{ t('work.evpraxisType') }}</p>
          <div class="project-card__body">
            <h3>{{ t('work.evpraxisTitle') }}</h3>
            <p>{{ t('work.evpraxisDesc') }}</p>
            <ul class="tag-list" :aria-label="t('work.evpraxisTagsLabel')">
              <li>{{ locale === 'es' ? 'Tecnología educativa' : 'EdTech' }}</li>
              <li>UX</li>
              <li>{{ t('work.evpraxisType') }}</li>
            </ul>
          </div>
        </article>

        <article class="project-card">
          <p class="project-card__type">{{ t('work.rediType') }}</p>
          <div class="project-card__body">
            <h3>{{ t('work.rediTitle') }}</h3>
            <p>{{ t('work.rediDesc') }}</p>
            <ul class="tag-list" :aria-label="t('work.rediTagsLabel')">
              <li>{{ locale === 'es' ? 'Repositorio' : 'Repository' }}</li>
              <li>{{ locale === 'es' ? 'Metadatos' : 'Metadata' }}</li>
              <li>{{ locale === 'es' ? 'Docencia' : 'Teaching' }}</li>
            </ul>
          </div>
        </article>

        <article class="project-card">
          <p class="project-card__type">{{ t('work.encantoType') }}</p>
          <div class="project-card__body">
            <h3>{{ t('work.encantoTitle') }}</h3>
            <p>{{ t('work.encantoDesc') }}</p>
            <ul class="tag-list" :aria-label="t('work.encantoTagsLabel')">
              <li>{{ locale === 'es' ? 'Juegos serios' : 'Serious games' }}</li>
              <li>HCI</li>
              <li>{{ locale === 'es' ? 'Educación' : 'Education' }}</li>
            </ul>
          </div>
        </article>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import { locale, t } from '@/i18n';
</script>
