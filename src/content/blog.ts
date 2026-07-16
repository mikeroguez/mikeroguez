import type { BlogPost, BlogPostLanguage } from '@/types/blog';

import { blogPosts } from '@/content/generated/blog-posts';

const allPosts = blogPosts;

export function getPublishedPosts(): BlogPost[] {
  return allPosts.filter((post) => post.meta.status === 'published');
}

export function getPublishedPostsByLanguage(lang: BlogPostLanguage): BlogPost[] {
  return getPublishedPosts().filter((post) => post.meta.lang === lang);
}

export function getPostBySlug(slug: string, lang: BlogPostLanguage = 'es'): BlogPost | undefined {
  return allPosts.find(
    (post) => post.slug === slug && post.meta.lang === lang && post.meta.status === 'published',
  );
}

export function getPostPath(post: BlogPost): string {
  return post.meta.lang === 'en' ? `/en/blog/${post.slug}` : `/blog/${post.slug}`;
}

export function getPostTranslation(post: BlogPost, lang: BlogPostLanguage): BlogPost | undefined {
  const translationKey = post.meta.translationKey;
  if (!translationKey) return undefined;
  return allPosts.find(
    (candidate) =>
      candidate.meta.status === 'published' &&
      candidate.meta.lang === lang &&
      candidate.meta.translationKey === translationKey,
  );
}
