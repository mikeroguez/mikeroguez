export type BlogPostStatus = 'draft' | 'review' | 'published';
export type BlogPostLanguage = 'es' | 'en';

export interface BlogPostMeta {
  title: string;
  description: string;
  date: string;
  status: BlogPostStatus;
  lang: BlogPostLanguage;
  translationKey?: string;
  image?: string;
}

export interface BlogPost {
  slug: string;
  meta: BlogPostMeta;
  html: string;
  excerpt: string;
  searchText: string;
}
