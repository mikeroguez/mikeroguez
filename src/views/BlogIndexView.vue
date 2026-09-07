<template>
  <div class="blog-layout">
    <article class="page blog-index">
      <p class="eyebrow">{{ t('blog.eyebrow') }}</p>
      <h1>{{ t('blog.h1') }}</h1>

      <section class="content-section" aria-labelledby="blog-list-title">
        <h2 id="blog-list-title" class="visually-hidden">{{ t('blog.postsHeading') }}</h2>
        <form class="blog-search" role="search" @submit.prevent>
          <label class="blog-search__label" for="blog-search">{{ t('blog.searchLabel') }}</label>
          <input
            id="blog-search"
            v-model="query"
            class="blog-search__input"
            type="search"
            autocomplete="off"
            :placeholder="t('blog.searchPlaceholder')"
            @input="resetVisiblePosts"
          />
        </form>

        <div
          v-if="topics.length > 0"
          class="pub-tabs"
          role="group"
          :aria-label="t('blog.topicFilterHeading')"
        >
          <button
            class="pub-tabs__tab"
            type="button"
            :aria-pressed="!activeTag && !activeTopic"
            @click="clearFilters"
          >
            {{ t('blog.tagsAll') }}
            <span class="pub-tabs__count" aria-hidden="true">{{ posts.length }}</span>
          </button>
          <button
            v-for="topic in topics"
            :key="topic.id"
            class="pub-tabs__tab"
            type="button"
            :aria-pressed="activeTopic === topic.id"
            @click="filterByTopic(topic.id)"
          >
            {{ topic.label }}
            <span class="pub-tabs__count" aria-hidden="true">{{ topic.count }}</span>
          </button>
        </div>

        <p class="post-list__meta" aria-live="polite">
          {{ resultSummary }}
        </p>

        <ol v-if="visiblePosts.length > 0" class="post-list">
          <li v-for="post in visiblePosts" :key="post.slug" class="post-list__item">
            <RouterLink class="post-list__title" :to="getPostPath(post)">
              {{ post.meta.title }}
            </RouterLink>
            <p class="post-list__meta">
              <time :datetime="post.meta.date">{{ formatDate(post.meta.date) }}</time>
              <span v-if="post.meta.readingTime" class="post-reading-time">
                {{ t('blog.readingTime', { min: post.meta.readingTime }) }}
              </span>
            </p>
            <p>{{ post.excerpt }}</p>
            <ul v-if="post.meta.tags?.length" class="post-tags" :aria-label="t('blog.tagsHeading')">
              <li v-for="tag in post.meta.tags" :key="tag">
                <button
                  class="post-tag"
                  type="button"
                  :aria-pressed="activeTag === tag"
                  @click.prevent="filterByTag(tag)"
                >
                  {{ tag }}
                </button>
              </li>
            </ul>
          </li>
        </ol>
        <p v-else-if="posts.length === 0">{{ t('blog.empty') }}</p>
        <template v-else>
          <p>{{ t('blog.emptySearch') }}</p>
          <div class="load-more">
            <button class="load-more__button" type="button" @click="clearSearch">
              {{ t('blog.clearSearch') }}
            </button>
          </div>
        </template>

        <div v-if="hasMorePosts" class="load-more">
          <button
            class="load-more__button"
            type="button"
            :aria-describedby="loadMoreDescriptionId"
            @click="showMorePosts"
          >
            {{ t('blog.showMore', { count: pageSize }) }}
          </button>
          <p :id="loadMoreDescriptionId" class="load-more__status" aria-live="polite">
            {{
              t('blog.showMoreStatus', {
                visible: visiblePosts.length,
                total: filteredPosts.length,
              })
            }}
          </p>
        </div>
      </section>
    </article>

    <aside class="blog-sidebar" aria-labelledby="blog-index-title">
      <h2 id="blog-index-title">{{ t('blog.sidebarHeading') }}</h2>
      <dl v-if="posts.length > 1" class="blog-stats">
        <div>
          <dt>{{ t('blog.statsTotal') }}</dt>
          <dd>{{ posts.length }}</dd>
        </div>
        <div>
          <dt>{{ t('blog.statsVisible') }}</dt>
          <dd>{{ visiblePosts.length }}</dd>
        </div>
      </dl>

      <section aria-labelledby="blog-years-title">
        <h3 id="blog-years-title">{{ t('blog.yearsHeading') }}</h3>
        <ul class="blog-sidebar__list">
          <li v-if="query">
            <button class="blog-sidebar__button" type="button" @click="clearSearch">
              {{ t('blog.viewAll') }} <span aria-hidden="true">×</span>
            </button>
          </li>
          <li v-for="year in years" :key="year.year">
            <button
              class="blog-sidebar__button"
              type="button"
              :aria-pressed="query === year.year"
              @click="filterByYear(year.year)"
            >
              {{ year.year }} <span>{{ year.count }}</span>
            </button>
          </li>
        </ul>
      </section>

      <a class="blog-sidebar__link" :href="rssHref" type="application/rss+xml">
        {{ t('blog.rssLabel') }}
      </a>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';

import { locale, t } from '@/i18n';
import { getPostPath, getPublishedPostsByLanguage } from '@/content/blog';
import type { BlogPostLanguage } from '@/types/blog';

const props = defineProps<{
  lang?: BlogPostLanguage;
}>();

const pageSize = 6;
const activeLang = computed(() => props.lang ?? locale.value);
const rssHref = computed(() => (activeLang.value === 'en' ? '/feed-en.xml' : '/feed.xml'));
const posts = computed(() => getPublishedPostsByLanguage(activeLang.value));
const query = ref('');
const activeTag = ref<string | null>(null);
const activeTopic = ref<BlogTopicId | null>(null);
const visibleCount = ref(pageSize);
const loadMoreDescriptionId = 'blog-load-more-status';

type BlogTopicId = 'learning-analytics' | 'ai-education' | 'game-design' | 'interaction-design';

const topicDefinitions: ReadonlyArray<{
  id: BlogTopicId;
  labelKey: string;
  matchingTags: string[];
}> = [
  {
    id: 'learning-analytics',
    labelKey: 'blog.topicLearningAnalytics',
    matchingTags: ['analítica de aprendizaje', 'learning analytics'],
  },
  {
    id: 'ai-education',
    labelKey: 'blog.topicAiEducation',
    matchingTags: [
      'inteligencia artificial',
      'ia generativa',
      'artificial intelligence',
      'generative ai',
    ],
  },
  {
    id: 'game-design',
    labelKey: 'blog.topicGameDesign',
    matchingTags: ['diseño de videojuegos', 'game design'],
  },
  {
    id: 'interaction-design',
    labelKey: 'blog.topicInteractionDesign',
    matchingTags: [
      'interacción humano-computadora',
      'human-computer interaction',
      'experiencia de usuario',
      'user experience',
    ],
  },
];

const normalizedQuery = computed(() => normalizeSearchText(query.value));

const topics = computed(() =>
  topicDefinitions
    .map((topic) => ({
      ...topic,
      label: t(topic.labelKey),
      count: posts.value.filter((post) => postMatchesTopic(post, topic.id)).length,
    }))
    .filter((topic) => topic.count > 0),
);

const filteredPosts = computed(() => {
  let result = posts.value;
  if (activeTopic.value)
    result = result.filter((post) => postMatchesTopic(post, activeTopic.value!));
  if (activeTag.value) result = result.filter((p) => p.meta.tags?.includes(activeTag.value!));
  if (normalizedQuery.value)
    result = result.filter((p) => p.searchText.includes(normalizedQuery.value));
  return result;
});

const visiblePosts = computed(() => filteredPosts.value.slice(0, visibleCount.value));
const hasMorePosts = computed(() => visiblePosts.value.length < filteredPosts.value.length);

const years = computed(() => {
  const counts = new Map<string, number>();
  for (const post of posts.value) {
    const year = post.meta.date.slice(0, 4);
    counts.set(year, (counts.get(year) ?? 0) + 1);
  }
  return Array.from(counts.entries()).map(([year, count]) => ({ year, count }));
});

const resultSummary = computed(() => {
  const count = filteredPosts.value.length;
  if (!normalizedQuery.value) {
    return count === 1 ? t('blog.totalOne') : t('blog.totalMany', { count });
  }
  return count === 1
    ? t('blog.resultQueryOne', { query: query.value })
    : t('blog.resultQueryMany', { count, query: query.value });
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

function resetVisiblePosts() {
  visibleCount.value = pageSize;
}

function filterByYear(year: string) {
  query.value = year;
  resetVisiblePosts();
}

function filterByTag(tag: string) {
  activeTopic.value = null;
  activeTag.value = activeTag.value === tag ? null : tag;
  resetVisiblePosts();
}

function filterByTopic(topic: BlogTopicId) {
  activeTag.value = null;
  activeTopic.value = activeTopic.value === topic ? null : topic;
  resetVisiblePosts();
}

function clearFilters() {
  activeTag.value = null;
  activeTopic.value = null;
  resetVisiblePosts();
}

function clearSearch() {
  query.value = '';
  clearFilters();
}

function showMorePosts() {
  visibleCount.value += pageSize;
}

function postMatchesTopic(post: (typeof posts.value)[number], topicId: BlogTopicId): boolean {
  const topic = topicDefinitions.find((definition) => definition.id === topicId);
  if (!topic) return false;
  const tags = new Set((post.meta.tags ?? []).map((tag) => tag.toLocaleLowerCase()));
  return topic.matchingTags.some((tag) => tags.has(tag));
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat(activeLang.value === 'es' ? 'es-MX' : 'en-US', {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}
</script>
