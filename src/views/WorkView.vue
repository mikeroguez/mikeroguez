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
        <article v-for="project in projects" :key="project.title" class="project-card">
          <div class="project-card__mark" aria-hidden="true">
            <img
              v-if="project.logo"
              class="project-card__logo"
              :src="project.logo"
              alt=""
              loading="lazy"
              decoding="async"
            />
            <span v-else class="project-card__monogram">{{ project.monogram }}</span>
          </div>
          <div class="project-card__body">
            <p class="project-card__type">{{ project.type }}</p>
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            <ul class="tag-list" :aria-label="project.tagsLabel">
              <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
            </ul>
          </div>
          <nav class="project-card__actions" :aria-label="project.linksLabel">
            <a v-if="project.href" :href="project.href">
              {{ t('work.projectVisit', { name: project.title }) }}
            </a>
            <RouterLink v-if="project.to" :to="project.to">
              {{ t('work.projectResearch') }}
            </RouterLink>
          </nav>
        </article>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

import { t } from '@/i18n';

interface ProjectItem {
  title: string;
  type: string;
  description: string;
  tagsLabel: string;
  tags: string[];
  linksLabel: string;
  logo?: string;
  monogram?: string;
  href?: string;
  to?: string;
}

const projects = computed<ProjectItem[]>(() => [
  {
    title: t('work.evpraxisTitle'),
    type: t('work.evpraxisType'),
    description: t('work.evpraxisDesc'),
    tagsLabel: t('work.evpraxisTagsLabel'),
    tags: [t('work.evpraxisTag1'), t('work.evpraxisTag2'), t('work.evpraxisTag3')],
    linksLabel: t('work.projectLinksLabel', { name: t('work.evpraxisTitle') }),
    logo: '/projects/evpraxis-logo.png',
    href: 'https://evpraxis.ucol.mx/',
  },
  {
    title: t('work.rediTitle'),
    type: t('work.rediType'),
    description: t('work.rediDesc'),
    tagsLabel: t('work.rediTagsLabel'),
    tags: [t('work.rediTag1'), t('work.rediTag2'), t('work.rediTag3')],
    linksLabel: t('work.projectLinksLabel', { name: t('work.rediTitle') }),
    logo: '/projects/redi-logo.png',
    href: 'https://redi.ucol.mx/',
  },
  {
    title: t('work.encantoTitle'),
    type: t('work.encantoType'),
    description: t('work.encantoDesc'),
    tagsLabel: t('work.encantoTagsLabel'),
    tags: [t('work.encantoTag1'), t('work.encantoTag2'), t('work.encantoTag3')],
    linksLabel: t('work.projectLinksLabel', { name: t('work.encantoTitle') }),
    monogram: 'EE',
    to: '/research',
  },
]);
</script>
