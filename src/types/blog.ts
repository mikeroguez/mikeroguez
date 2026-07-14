export type BlogPostStatus = 'draft' | 'review' | 'published';

export interface BlogPostMeta {
  title: string;
  description: string;
  date: string;
  status: BlogPostStatus;
}

export interface BlogPost {
  slug: string;
  meta: BlogPostMeta;
  html: string;
  excerpt: string;
  searchText: string;
}
