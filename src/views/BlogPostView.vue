<template>
  <!-- eslint-disable vue/no-v-html -->
  <article v-if="post" class="page blog-post">
    <RouterLink class="text-link" :to="blogIndexPath">{{ t('blogPost.back') }}</RouterLink>
    <p class="eyebrow">{{ t('blogPost.eyebrow') }}</p>
    <h1>{{ post.meta.title }}</h1>
    <p class="post-list__meta">
      <time :datetime="post.meta.date">{{ formatDate(post.meta.date) }}</time>
      <span v-if="post.meta.readingTime" class="post-reading-time">
        {{ t('blog.readingTime', { min: post.meta.readingTime }) }}
      </span>
    </p>
    <p class="post-byline">
      {{ t('blogPost.authorBy') }} <strong>{{ SITE_AUTHOR }}</strong>
    </p>
    <ul v-if="post.meta.tags?.length" class="post-tags" :aria-label="t('blog.tagsHeading')">
      <li v-for="tag in post.meta.tags" :key="tag">
        <span class="post-tag">{{ tag }}</span>
      </li>
    </ul>
    <div class="markdown-body" v-html="post.html" />
    <section
      v-if="relatedPosts.length > 0"
      class="post-related"
      aria-labelledby="related-posts-title"
    >
      <h2 id="related-posts-title" class="post-related__heading">
        {{ t('blog.relatedHeading') }}
      </h2>
      <ul class="post-related__list">
        <li v-for="related in relatedPosts" :key="related.slug">
          <RouterLink class="post-related__link" :to="getPostPath(related)">
            {{ related.meta.title }}
          </RouterLink>
          <p class="post-related__meta">
            <time :datetime="related.meta.date">{{ formatDate(related.meta.date) }}</time>
            <span v-if="related.meta.readingTime" class="post-reading-time">
              {{ t('blog.readingTime', { min: related.meta.readingTime }) }}
            </span>
          </p>
        </li>
      </ul>
    </section>
    <section class="share-tools" aria-labelledby="share-tools-title">
      <h2 id="share-tools-title">{{ t('blogPost.shareHeading') }}</h2>
      <div class="share-tools__actions">
        <button
          v-if="canUseNativeShare"
          class="share-tools__button"
          type="button"
          @click="sharePost"
        >
          {{ t('blogPost.share') }}
        </button>
        <button class="share-tools__button" type="button" @click="copyPostUrl">
          {{ t('blogPost.copyLink') }}
        </button>
        <a
          class="share-tools__button"
          :href="linkedInShareUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
          <span class="visually-hidden">{{ t('a11y.openNewTab') }}</span>
        </a>
        <a
          class="share-tools__button"
          :href="facebookShareUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
          <span class="visually-hidden">{{ t('a11y.openNewTab') }}</span>
        </a>
        <a class="share-tools__button" :href="xShareUrl" target="_blank" rel="noopener noreferrer">
          X
          <span class="visually-hidden">{{ t('a11y.openNewTab') }}</span>
        </a>
      </div>
      <p class="share-tools__status" aria-live="polite">{{ shareStatus }}</p>
    </section>
  </article>

  <NotFoundView v-else />
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

import { locale, setLocaleForRoute, t } from '@/i18n';
import { getPostBySlug, getPostPath, getPublishedPostsByLanguage } from '@/content/blog';
import NotFoundView from '@/views/NotFoundView.vue';
import { absoluteUrl, SITE_AUTHOR, SITE_NAME } from '@/utils/site';
import type { BlogPostLanguage } from '@/types/blog';

const props = defineProps<{
  lang?: BlogPostLanguage;
}>();

const route = useRoute();
const post = computed(() => getPostBySlug(String(route.params.slug), props.lang));
const blogIndexPath = computed(() => (post.value?.meta.lang === 'en' ? '/blog' : '/publicaciones'));
const shareStatus = ref('');

const relatedPosts = computed(() => {
  if (!post.value?.meta.tags?.length) return [];
  const currentTags = new Set(post.value.meta.tags);
  return getPublishedPostsByLanguage(post.value.meta.lang)
    .filter((p) => p.slug !== post.value!.slug && p.meta.tags?.some((t) => currentTags.has(t)))
    .sort(
      (a, b) =>
        (b.meta.tags?.filter((t) => currentTags.has(t)).length ?? 0) -
        (a.meta.tags?.filter((t) => currentTags.has(t)).length ?? 0),
    )
    .slice(0, 2);
});

watchEffect(() => {
  if (post.value) setLocaleForRoute(post.value.meta.lang);
});

const postUrl = computed(() => absoluteUrl(route.path));
const encodedPostUrl = computed(() => encodeURIComponent(postUrl.value));
const encodedPostTitle = computed(() => encodeURIComponent(post.value?.meta.title ?? SITE_NAME));

const linkedInShareUrl = computed(
  () => `https://www.linkedin.com/sharing/share-offsite/?url=${encodedPostUrl.value}`,
);
const facebookShareUrl = computed(
  () => `https://www.facebook.com/sharer/sharer.php?u=${encodedPostUrl.value}`,
);
const xShareUrl = computed(
  () =>
    `https://twitter.com/intent/tweet?url=${encodedPostUrl.value}&text=${encodedPostTitle.value}`,
);

const canUseNativeShare = computed(
  () => typeof window !== 'undefined' && 'share' in window.navigator,
);

function formatDate(date: string) {
  return new Intl.DateTimeFormat(locale.value === 'es' ? 'es-MX' : 'en-US', {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}

async function sharePost() {
  if (typeof window === 'undefined' || !post.value || !canUseNativeShare.value) return;
  try {
    await window.navigator.share({
      title: post.value.meta.title,
      text: post.value.meta.description,
      url: postUrl.value,
    });
    shareStatus.value = t('blogPost.shareReady');
  } catch {
    shareStatus.value = '';
  }
}

async function copyPostUrl() {
  try {
    if (typeof window === 'undefined') return;
    await window.navigator.clipboard.writeText(postUrl.value);
    shareStatus.value = t('blogPost.linkCopied');
  } catch {
    shareStatus.value = postUrl.value;
  }
}
</script>
