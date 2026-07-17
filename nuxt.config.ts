import { exec } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { defineNuxtConfig } from 'nuxt/config';

import type { BlogPost } from './src/types/blog';
import { blogPosts } from './src/content/generated/blog-posts';

const packageJson = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf8'),
) as {
  version: string;
};

const staticRoutes = ['/', '/about', '/work', '/research', '/blog', '/contact'];
const blogRoutes = blogPosts
  .filter((post) => post.meta.status === 'published')
  .map((post: BlogPost) => `/blog/${post.slug}`);

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
    plugins: [
      {
        name: 'blog-content-watcher',
        configureServer(server) {
          const postsDir = resolve('src/content/posts');
          const pubsDir = resolve('src/content/publications');
          server.watcher.add(postsDir);
          server.watcher.add(pubsDir);
          const handle = (file: string) => {
            if (!file.endsWith('.md')) return;
            if (file.startsWith(postsDir)) {
              exec('node scripts/generate-blog-content.mjs', (err) => {
                if (err) console.error('[blog-watcher] Error:', err.message);
              });
            } else if (file.startsWith(pubsDir)) {
              exec('node scripts/generate-research-content.mjs', (err) => {
                if (err) console.error('[research-watcher] Error:', err.message);
              });
            }
          };
          server.watcher.on('change', handle);
          server.watcher.on('add', handle);
          server.watcher.on('unlink', handle);
        },
      },
    ],
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [...staticRoutes, ...blogRoutes],
    },
  },
});
