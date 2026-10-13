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
    <p class="post-ai-disclosure">
      {{ t('blogPost.aiDisclosure') }}
    </p>
    <ul v-if="post.meta.tags?.length" class="post-tags" :aria-label="t('blog.tagsHeading')">
      <li v-for="tag in post.meta.tags" :key="tag">
        <span class="post-tag">{{ tag }}</span>
      </li>
    </ul>
    <div
      class="markdown-body"
      @focusin="showLinkPreview"
      @focusout="hideLinkPreview"
      @pointerover="showLinkPreview"
      @pointerout="hideLinkPreview"
      v-html="post.html"
    />
    <aside
      v-if="linkPreview"
      id="link-preview"
      class="link-preview"
      role="tooltip"
      :style="linkPreviewStyle"
    >
      <p class="link-preview__eyebrow">{{ linkPreview.eyebrow }}</p>
      <strong class="link-preview__title">{{ linkPreview.title }}</strong>
      <p v-if="linkPreview.description" class="link-preview__description">
        {{ linkPreview.description }}
      </p>
      <p class="link-preview__meta">{{ linkPreview.meta }}</p>
    </aside>
    <section
      v-if="seriesPosts.length > 1"
      class="post-related"
      aria-labelledby="series-posts-title"
    >
      <h2 id="series-posts-title" class="post-related__heading">
        {{ t('blogPost.seriesHeading') }}
      </h2>
      <ol class="post-related__list post-series__list">
        <li v-for="seriesPost in seriesPosts" :key="seriesPost.slug">
          <span v-if="seriesPost.slug === post?.slug" aria-current="page">
            {{ seriesPost.meta.title }}
          </span>
          <RouterLink v-else class="post-related__link" :to="getPostPath(seriesPost)">
            {{ seriesPost.meta.title }}
          </RouterLink>
        </li>
      </ol>
    </section>
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
    <section class="post-next" aria-labelledby="post-next-title">
      <h2 id="post-next-title">{{ t('blogPost.nextHeading') }}</h2>
      <div class="pathway-grid pathway-grid--compact">
        <article v-for="item in nextSteps" :key="item.title" class="pathway-card">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <RouterLink :to="item.href">{{ item.link }}</RouterLink>
        </article>
      </div>
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
import {
  getPostBySlug,
  getPostByTranslationKey,
  getPostPath,
  getPublishedPostsByLanguage,
  getSeriesPosts,
} from '@/content/blog';
import NotFoundView from '@/views/NotFoundView.vue';
import { absoluteUrl, SITE_AUTHOR, SITE_NAME } from '@/utils/site';
import { localizedPath } from '@/utils/routes';
import { externalLinkPreviews } from '@/content/external-link-previews';
import type { BlogPostLanguage } from '@/types/blog';

const props = defineProps<{
  lang?: BlogPostLanguage;
}>();

interface LinkPreview {
  eyebrow: string;
  title: string;
  description?: string;
  meta: string;
}

const route = useRoute();
const post = computed(() => getPostBySlug(String(route.params.slug), props.lang));
const blogIndexPath = computed(() => (post.value?.meta.lang === 'en' ? '/blog' : '/publicaciones'));
const shareStatus = ref('');
const linkPreview = ref<LinkPreview>();
const linkPreviewStyle = ref<Record<string, string>>({});
const activePreviewLink = ref<globalThis.HTMLAnchorElement>();
const previousAriaDescription = ref<string | null>(null);
const postLocale = computed(() => post.value?.meta.lang ?? locale.value);
const seriesPosts = computed(() => (post.value ? getSeriesPosts(post.value) : []));
const nextSteps = computed(() => [
  {
    title: t('blogPost.nextResearchTitle'),
    description: t('blogPost.nextResearchDesc'),
    link: t('blogPost.nextResearchLink'),
    href: localizedPath('/research', postLocale.value),
  },
  {
    title: t('blogPost.nextWorkTitle'),
    description: t('blogPost.nextWorkDesc'),
    link: t('blogPost.nextWorkLink'),
    href: localizedPath('/work', postLocale.value),
  },
  {
    title: t('blogPost.nextContactTitle'),
    description: t('blogPost.nextContactDesc'),
    link: t('blogPost.nextContactLink'),
    href: localizedPath('/contact', postLocale.value),
  },
]);

const relatedPosts = computed(() => {
  if (!post.value) return [];
  const currentTags = new Set(post.value.meta.tags ?? []);
  const seriesKeys = new Set(
    seriesPosts.value.map((seriesPost) => seriesPost.meta.translationKey).filter(Boolean),
  );
  const explicitRelated = (post.value.meta.related ?? [])
    .map((translationKey) => getPostByTranslationKey(translationKey, post.value!.meta.lang))
    .filter((candidate): candidate is NonNullable<typeof candidate> => Boolean(candidate));
  const explicitKeys = new Set(explicitRelated.map((candidate) => candidate.meta.translationKey));
  const tagRelated = currentTags.size
    ? getPublishedPostsByLanguage(post.value.meta.lang)
        .filter(
          (p) =>
            p.slug !== post.value!.slug &&
            !seriesKeys.has(p.meta.translationKey) &&
            !explicitKeys.has(p.meta.translationKey) &&
            p.meta.tags?.some((t) => currentTags.has(t)),
        )
        .sort(
          (a, b) =>
            (b.meta.tags?.filter((t) => currentTags.has(t)).length ?? 0) -
              (a.meta.tags?.filter((t) => currentTags.has(t)).length ?? 0) ||
            b.meta.date.localeCompare(a.meta.date),
        )
        .slice(0, Math.max(0, 2 - explicitRelated.length))
    : [];

  return [...explicitRelated, ...tagRelated].slice(0, 2);
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

function linkFromEvent(
  event: globalThis.FocusEvent | globalThis.PointerEvent,
): globalThis.HTMLAnchorElement | undefined {
  if (!(event.target instanceof globalThis.Element)) return undefined;
  return event.target.closest('a') ?? undefined;
}

function getLinkPreview(link: globalThis.HTMLAnchorElement): LinkPreview | undefined {
  const url = new globalThis.URL(link.href);

  if (url.origin === window.location.origin) {
    const slug = url.pathname.match(/^\/blog\/([^/]+)$/)?.[1];
    const linkedPost = slug ? getPostBySlug(slug) : undefined;
    if (!linkedPost) return undefined;

    return {
      eyebrow: t('blogPost.internalPreview'),
      title: linkedPost.meta.title,
      description: linkedPost.meta.description,
      meta: `${formatDate(linkedPost.meta.date)} · ${t('blog.readingTime', {
        min: linkedPost.meta.readingTime ?? 1,
      })}`,
    };
  }

  const configuredPreview = externalLinkPreviews[url.href.replace(/\/$/, '')];
  return {
    eyebrow: configuredPreview
      ? t('blogPost.verifiedExternalPreview')
      : t('blogPost.externalPreview'),
    title: configuredPreview?.title ?? url.hostname,
    meta: configuredPreview?.meta ?? url.hostname,
  };
}

function positionLinkPreview(link: globalThis.HTMLAnchorElement) {
  const rect = link.getBoundingClientRect();
  const maxLeft = Math.max(12, window.innerWidth - 344);
  const estimatedHeight = 180;
  const top =
    rect.bottom + 8 + estimatedHeight > window.innerHeight
      ? Math.max(12, rect.top - estimatedHeight - 8)
      : rect.bottom + 8;
  linkPreviewStyle.value = {
    left: `${Math.min(Math.max(12, rect.left), maxLeft)}px`,
    top: `${top}px`,
  };
}

function showLinkPreview(event: globalThis.FocusEvent | globalThis.PointerEvent) {
  if ('pointerType' in event && event.pointerType === 'touch') return;
  const link = linkFromEvent(event);
  if (!link || link === activePreviewLink.value) return;

  const preview = getLinkPreview(link);
  if (!preview) return;

  hideLinkPreview();
  activePreviewLink.value = link;
  previousAriaDescription.value = link.getAttribute('aria-describedby');
  activePreviewLink.value.setAttribute('aria-describedby', 'link-preview');
  linkPreview.value = preview;
  positionLinkPreview(link);
}

function hideLinkPreview(event?: globalThis.FocusEvent | globalThis.PointerEvent) {
  const nextTarget = event?.relatedTarget;
  if (nextTarget instanceof globalThis.Node && activePreviewLink.value?.contains(nextTarget)) {
    return;
  }

  if (activePreviewLink.value) {
    if (previousAriaDescription.value === null) {
      activePreviewLink.value.removeAttribute('aria-describedby');
    } else {
      activePreviewLink.value.setAttribute('aria-describedby', previousAriaDescription.value);
    }
  }
  activePreviewLink.value = undefined;
  previousAriaDescription.value = null;
  linkPreview.value = undefined;
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
