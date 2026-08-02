export type BlogPostStatus = 'draft' | 'review' | 'published';
export type BlogPostLanguage = 'es' | 'en';

export interface BlogPostMeta {
  title: string;
  seoTitle?: string;
  description: string;
  date: string;
  updated?: string;
  status: BlogPostStatus;
  lang: BlogPostLanguage;
  translationKey?: string;
  image?: string;
  tags?: string[];
  keywords?: string[];
  readingTime?: number;
}

export interface BlogPost {
  slug: string;
  meta: BlogPostMeta;
  html: string;
  excerpt: string;
  searchText: string;
}
