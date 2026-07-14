<template>
  <div class="blog-layout">
    <article class="page blog-index">
      <p class="eyebrow">Blog</p>
      <h1>Publicaciones</h1>
      <p class="lead">
        Textos, notas y ensayos publicos. Cada entrada debe pasar por revision editorial, evidencia
        y privacidad antes de publicarse.
      </p>

      <section class="content-section" aria-labelledby="blog-list-title">
        <h2 id="blog-list-title">Entradas publicadas</h2>
        <form class="blog-search" role="search" @submit.prevent>
          <label class="blog-search__label" for="blog-search">Buscar publicaciones</label>
          <input
            id="blog-search"
            v-model="query"
            class="blog-search__input"
            type="search"
            autocomplete="off"
            placeholder="Buscar por tema, titulo o palabra"
            @input="resetVisiblePosts"
          />
        </form>
        <p class="post-list__meta" aria-live="polite">
          {{ resultSummary }}
        </p>

        <ol v-if="visiblePosts.length > 0" class="post-list">
          <li v-for="post in visiblePosts" :key="post.slug" class="post-list__item">
            <RouterLink class="post-list__title" :to="`/blog/${post.slug}`">
              {{ post.meta.title }}
            </RouterLink>
            <p class="post-list__meta">
              <time :datetime="post.meta.date">{{ formatDate(post.meta.date) }}</time>
            </p>
            <p>{{ post.excerpt }}</p>
          </li>
        </ol>
        <p v-else-if="posts.length === 0">Contenido en preparacion.</p>
        <p v-else>No hay publicaciones que coincidan con la busqueda.</p>

        <div v-if="hasMorePosts" class="load-more">
          <button
            class="load-more__button"
            type="button"
            :aria-describedby="loadMoreDescriptionId"
            @click="showMorePosts"
          >
            Mostrar 6 mas
          </button>
          <p :id="loadMoreDescriptionId" class="load-more__status" aria-live="polite">
            Se muestran {{ visiblePosts.length }} de {{ filteredPosts.length }} entradas.
          </p>
        </div>
      </section>
    </article>

    <aside class="blog-sidebar" aria-labelledby="blog-index-title">
      <h2 id="blog-index-title">Indice</h2>
      <dl class="blog-stats">
        <div>
          <dt>Publicadas</dt>
          <dd>{{ posts.length }}</dd>
        </div>
        <div>
          <dt>Mostradas</dt>
          <dd>{{ visiblePosts.length }} de {{ filteredPosts.length }}</dd>
        </div>
      </dl>

      <section aria-labelledby="blog-years-title">
        <h3 id="blog-years-title">Años</h3>
        <ul class="blog-sidebar__list">
          <li v-for="year in years" :key="year.year">
            <button class="blog-sidebar__button" type="button" @click="filterByYear(year.year)">
              {{ year.year }} <span>{{ year.count }}</span>
            </button>
          </li>
        </ul>
      </section>

      <a class="blog-sidebar__link" href="/feed.xml" type="application/rss+xml"> RSS </a>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';

import { getPublishedPosts } from '@/content/blog';

const pageSize = 6;
const posts = getPublishedPosts();
const query = ref('');
const visibleCount = ref(pageSize);
const loadMoreDescriptionId = 'blog-load-more-status';

const normalizedQuery = computed(() => normalizeSearchText(query.value));

const filteredPosts = computed(() => {
  if (!normalizedQuery.value) {
    return posts;
  }

  return posts.filter((post) => post.searchText.includes(normalizedQuery.value));
});

const visiblePosts = computed(() => filteredPosts.value.slice(0, visibleCount.value));

const hasMorePosts = computed(() => visiblePosts.value.length < filteredPosts.value.length);

const years = computed(() => {
  const counts = new Map<string, number>();
  for (const post of posts) {
    const year = post.meta.date.slice(0, 4);
    counts.set(year, (counts.get(year) ?? 0) + 1);
  }

  return Array.from(counts.entries()).map(([year, count]) => ({ year, count }));
});

const resultSummary = computed(() => {
  const count = filteredPosts.value.length;
  if (!normalizedQuery.value) {
    return `${posts.length} ${posts.length === 1 ? 'entrada publicada' : 'entradas publicadas'}.`;
  }

  return `${count} ${count === 1 ? 'resultado' : 'resultados'} para "${query.value}".`;
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

function showMorePosts() {
  visibleCount.value += pageSize;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}
</script>
