import type { BlogPost } from '@/types/blog';

import { blogPosts } from '@/content/generated/blog-posts';

const allPosts = blogPosts;

export function getPublishedPosts(): BlogPost[] {
  return allPosts.filter((post) => post.meta.status === 'published');
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((post) => post.slug === slug && post.meta.status === 'published');
}
