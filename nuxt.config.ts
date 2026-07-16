import { readFileSync } from 'node:fs';

import { defineNuxtConfig } from 'nuxt/config';

import type { BlogPost } from './src/types/blog';
import { blogPosts } from './src/content/generated/blog-posts';

const packageJson = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf8'),
) as {
  version: string;
};

const staticRoutes = ['/', '/about', '/work', '/research', '/blog', '/contact', '/en/blog'];
const blogRoutes = blogPosts
  .filter((post) => post.meta.status === 'published')
  .map((post: BlogPost) =>
    post.meta.lang === 'en' ? `/en/blog/${post.slug}` : `/blog/${post.slug}`,
  );

export default defineNuxtConfig({
  compatibilityDate: '2026-07-15',
  ssr: true,
  srcDir: 'src/',
  css: [
    '@/assets/styles/reset.css',
    '@/assets/styles/tokens.css',
    '@/assets/styles/base.css',
    '@/assets/styles/utilities.css',
  ],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [{ name: 'theme-color', content: '#102a43' }],
      link: [{ rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    },
  },
  vite: {
    define: {
      'import.meta.env.VITE_APP_VERSION': JSON.stringify(packageJson.version),
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [...staticRoutes, ...blogRoutes],
    },
  },
});
