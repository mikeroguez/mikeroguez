import type { BlogPost, BlogPostLanguage } from '@/types/blog';

import { blogPosts } from '@/content/generated/blog-posts';

const allPosts = blogPosts;
const isProduction = import.meta.env.MODE === 'production';

function isVisiblePost(post: BlogPost): boolean {
  return post.meta.status === 'published' || (!isProduction && post.meta.status === 'review');
}

export function getPublishedPosts(): BlogPost[] {
  return allPosts.filter(isVisiblePost);
}

export function getPublishedPostsByLanguage(lang: BlogPostLanguage): BlogPost[] {
  return getPublishedPosts().filter((post) => post.meta.lang === lang);
}

export function getPostBySlug(slug: string, lang?: BlogPostLanguage): BlogPost | undefined {
  return allPosts.find(
    (post) => post.slug === slug && (!lang || post.meta.lang === lang) && isVisiblePost(post),
  );
}

export function getPostPath(post: BlogPost): string {
  return `/blog/${post.slug}`;
}

export function getPostTranslation(post: BlogPost, lang: BlogPostLanguage): BlogPost | undefined {
  const translationKey = post.meta.translationKey;
  if (!translationKey) return undefined;
  return allPosts.find(
    (candidate) =>
      isVisiblePost(candidate) &&
      candidate.meta.lang === lang &&
      candidate.meta.translationKey === translationKey,
  );
}

export function getSeriesPosts(post: BlogPost): BlogPost[] {
  if (!post.meta.series) return [];

  return getPublishedPostsByLanguage(post.meta.lang)
    .filter((candidate) => candidate.meta.series === post.meta.series)
    .sort(
      (a, b) =>
        (a.meta.seriesOrder ?? Number.MAX_SAFE_INTEGER) -
          (b.meta.seriesOrder ?? Number.MAX_SAFE_INTEGER) || a.meta.date.localeCompare(b.meta.date),
    );
}

export function getPostByTranslationKey(
  translationKey: string,
  lang: BlogPostLanguage,
): BlogPost | undefined {
  return getPublishedPostsByLanguage(lang).find(
    (post) => post.meta.translationKey === translationKey,
  );
}
