<template>
  <div class="blog-layout">
    <article class="page research-index">
      <p class="eyebrow">{{ t('research.eyebrow') }}</p>
      <h1>{{ t('research.h1') }}</h1>
      <p class="lead">{{ t('research.lead') }}</p>

      <section class="content-section" aria-labelledby="research-lines">
        <h2 id="research-lines">{{ t('research.linesHeading') }}</h2>
        <ul class="tag-list tag-list--large">
          <li>{{ t('research.line1') }}</li>
          <li>{{ t('research.line2') }}</li>
          <li>{{ t('research.line3') }}</li>
          <li>{{ t('research.line4') }}</li>
          <li>{{ t('research.line5') }}</li>
          <li>{{ t('research.line6') }}</li>
          <li>{{ t('research.line7') }}</li>
        </ul>
      </section>

      <section class="content-section" aria-labelledby="research-publications">
        <h2 id="research-publications">{{ t('research.publicationsHeading') }}</h2>

        <form class="blog-search" role="search" @submit.prevent>
          <label class="blog-search__label" for="research-search">{{
            t('research.searchLabel')
          }}</label>
          <input
            id="research-search"
            v-model="query"
            class="blog-search__input"
            type="search"
            autocomplete="off"
            :placeholder="t('research.searchPlaceholder')"
            @input="resetVisible"
          />
        </form>

        <p class="post-list__meta" aria-live="polite">{{ resultSummary }}</p>

        <ol v-if="visiblePubs.length > 0" class="publication-list">
          <li v-for="pub in visiblePubs" :key="pub.slug">
            <article>
              <p class="publication-list__year">{{ pub.year }}</p>
              <div>
                <p class="publication-list__meta">{{ typeLabel(pub.type) }}</p>
                <h3>{{ pub.title }}</h3>
                <p>{{ publicationDescription(pub) }}</p>
                <a
                  v-if="pub.doi"
                  :href="`https://doi.org/${pub.doi}`"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  DOI: {{ pub.doi }}
                  <span class="visually-hidden">{{ t('a11y.openNewTab') }}</span>
                </a>
                <a v-else-if="pub.url" :href="pub.url" rel="noopener noreferrer" target="_blank">
                  {{ t('research.viewAll') }}
                  <span class="visually-hidden">{{ t('a11y.openNewTab') }}</span>
                </a>
              </div>
            </article>
          </li>
        </ol>

        <p v-else-if="publications.length === 0">{{ t('research.empty') }}</p>
        <template v-else>
          <p>{{ t('research.emptySearch') }}</p>
          <div class="load-more">
            <button class="load-more__button" type="button" @click="clearSearch">
              {{ t('research.clearSearch') }}
            </button>
          </div>
        </template>

        <div v-if="hasMore" class="load-more">
          <button
            class="load-more__button"
            type="button"
            :aria-describedby="loadMoreStatusId"
            @click="showMore"
          >
            {{ t('research.showMore', { count: pageSize }) }}
          </button>
          <p :id="loadMoreStatusId" class="load-more__status" aria-live="polite">
            {{
              t('research.showMoreStatus', {
                visible: visiblePubs.length,
                total: filteredPubs.length,
              })
            }}
          </p>
        </div>
      </section>
    </article>

    <aside class="blog-sidebar" aria-labelledby="research-sidebar-title">
      <h2 id="research-sidebar-title">{{ t('research.sidebarHeading') }}</h2>

      <dl v-if="publications.length > 0" class="blog-stats">
        <div>
          <dt>{{ t('research.totalLabel') }}</dt>
          <dd>{{ publications.length }}</dd>
        </div>
        <div>
          <dt>{{ t('research.visibleLabel') }}</dt>
          <dd>{{ visiblePubs.length }}</dd>
        </div>
      </dl>

      <section aria-labelledby="research-types-title">
        <h3 id="research-types-title">{{ t('research.typeFilterHeading') }}</h3>
        <ul class="blog-sidebar__list">
          <li v-if="activeType || query">
            <button class="blog-sidebar__button" type="button" @click="clearSearch">
              {{ t('research.viewAll') }} <span aria-hidden="true">×</span>
            </button>
          </li>
          <li v-for="tp in types" :key="tp.type">
            <button
              class="blog-sidebar__button"
              type="button"
              :aria-pressed="activeType === tp.type"
              @click="filterByType(tp.type)"
            >
              {{ typeLabel(tp.type) }} <span>{{ tp.count }}</span>
            </button>
          </li>
        </ul>
      </section>

      <section aria-labelledby="research-profiles-title">
        <h3 id="research-profiles-title">{{ t('research.profilesHeading') }}</h3>
        <ul class="blog-sidebar__list">
          <li>
            <a
              class="blog-sidebar__link"
              href="https://orcid.org/0000-0002-7545-2533"
              rel="noopener noreferrer"
              target="_blank"
            >
              ORCID
              <span class="visually-hidden">{{ t('a11y.openNewTab') }}</span>
            </a>
          </li>
          <li>
            <a
              class="blog-sidebar__link"
              href="https://scholar.google.com/citations?user=LoAMxRIAAAAJ&hl=en"
              rel="noopener noreferrer"
              target="_blank"
            >
              Google Scholar
              <span class="visually-hidden">{{ t('a11y.openNewTab') }}</span>
            </a>
          </li>
        </ul>
      </section>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { locale, t } from '@/i18n';
import { getPublishedPublications } from '@/content/research';
import type { PublicationType } from '@/types/research';

const pageSize = 8;
const publications = getPublishedPublications();
const query = ref('');
const activeType = ref<PublicationType | null>(null);
const visibleCount = ref(pageSize);
const loadMoreStatusId = 'research-load-more-status';

const typeKeys: Record<PublicationType, string> = {
  journal: 'research.typeJournal',
  conference: 'research.typeConference',
  chapter: 'research.typeChapter',
  thesis: 'research.typeThesis',
  report: 'research.typeReport',
};

function typeLabel(type: PublicationType | string): string {
  return t(typeKeys[type as PublicationType] ?? type);
}

function publicationDescription(pub: (typeof publications)[number]): string {
  if (locale.value === 'en' && pub.descriptionEn) return pub.descriptionEn;
  return pub.description;
}

const normalizedQuery = computed(() => normalizeSearchText(query.value));

const filteredPubs = computed(() => {
  let result = publications;
  if (activeType.value) result = result.filter((p) => p.type === activeType.value);
  if (normalizedQuery.value)
    result = result.filter((p) => p.searchText.includes(normalizedQuery.value));
  return result;
});

const visiblePubs = computed(() => filteredPubs.value.slice(0, visibleCount.value));
const hasMore = computed(() => visiblePubs.value.length < filteredPubs.value.length);

const types = computed(() => {
  const counts = new Map<PublicationType, number>();
  for (const pub of publications) counts.set(pub.type, (counts.get(pub.type) ?? 0) + 1);
  return Array.from(counts.entries()).map(([type, count]) => ({ type, count }));
});

const resultSummary = computed(() => {
  const count = filteredPubs.value.length;
  const total = publications.length;
  if (!normalizedQuery.value && !activeType.value) {
    return total === 1 ? t('research.totalOne') : t('research.totalMany', { count: total });
  }
  return count === 1 ? t('research.resultOne') : t('research.resultMany', { count });
});

function normalizeSearchText(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function resetVisible() {
  visibleCount.value = pageSize;
}

function filterByType(type: PublicationType) {
  activeType.value = activeType.value === type ? null : type;
  query.value = '';
  resetVisible();
}

function clearSearch() {
  query.value = '';
  activeType.value = null;
  resetVisible();
}

function showMore() {
  visibleCount.value += pageSize;
}
</script>
