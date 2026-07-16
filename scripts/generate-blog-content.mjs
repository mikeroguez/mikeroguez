import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { basename, join, resolve } from 'node:path';

import MarkdownIt from 'markdown-it';
import prettier from 'prettier';

const postsDir = resolve('src/content/posts');
const outputDir = resolve('src/content/generated');
const outputPath = join(outputDir, 'blog-posts.ts');
const publicDir = resolve('public');
const feedPath = join(publicDir, 'feed.xml');
const sitemapPath = join(publicDir, 'sitemap.xml');
const siteUrl = 'https://mikeroguez.me';
const siteTitle = 'Mikeroguez';
const siteDescription =
  'Sitio personal de Mikeroguez. Investigación, educación, diseño y desarrollo de software.';
const validStatuses = new Set(['draft', 'review', 'published']);
const validLanguages = new Set(['es', 'en']);

const markdown = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
});

function normalizeSearchText(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseFrontmatterValue(value) {
  return value.trim().replace(/^["']|["']$/g, '');
}

function parseMarkdownPost(source, filename) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (!match) {
    throw new Error(`${filename} is missing frontmatter.`);
  }

  const [, frontmatter, body] = match;
  const values = new Map();

  for (const line of frontmatter.split('\n')) {
    const separatorIndex = line.indexOf(':');
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1);
    values.set(key, parseFrontmatterValue(value));
  }

  const status = values.get('status') ?? 'draft';
  if (!validStatuses.has(status)) {
    throw new Error(`${filename} has invalid status: ${status}`);
  }

  const lang = values.get('lang') ?? 'es';
  if (!validLanguages.has(lang)) {
    throw new Error(`${filename} has invalid lang: ${lang}`);
  }

  const description = values.get('description') ?? 'Entrada sin descripcion.';

  const title = values.get('title') ?? 'Untitled';
  const date = values.get('date') ?? '1970-01-01';
  const translationKey = values.get('translationKey');
  const image = values.get('image');
  const bodyText = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/[#>*_[\]()!-]/g, ' ');

  return {
    meta: {
      title,
      description,
      date,
      status,
      lang,
      ...(translationKey ? { translationKey } : {}),
      ...(image ? { image } : {}),
    },
    html: markdown.render(body.trim()),
    excerpt: description,
    searchText: normalizeSearchText(`${title} ${description} ${date} ${bodyText}`),
  };
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function absoluteUrl(pathname) {
  return new globalThis.URL(pathname, siteUrl).toString();
}

function toRssDate(date) {
  return new Date(`${date}T00:00:00Z`).toUTCString();
}

function createRssFeed(posts) {
  const publishedPosts = posts.filter(
    (post) => post.meta.status === 'published' && post.meta.lang === 'es',
  );
  const lastBuildDate = publishedPosts[0]?.meta.date
    ? toRssDate(publishedPosts[0].meta.date)
    : new Date().toUTCString();

  const items = publishedPosts
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}`);
      return `    <item>
      <title>${escapeXml(post.meta.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <description>${escapeXml(post.meta.description)}</description>
      <pubDate>${escapeXml(toRssDate(post.meta.date))}</pubDate>
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteTitle)}</title>
    <link>${escapeXml(siteUrl)}</link>
    <description>${escapeXml(siteDescription)}</description>
    <language>es-MX</language>
    <lastBuildDate>${escapeXml(lastBuildDate)}</lastBuildDate>
    <atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="${escapeXml(
      absoluteUrl('/feed.xml'),
    )}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
}

function createSitemap(posts) {
  const staticRoutes = ['/', '/about', '/work', '/research', '/blog', '/contact', '/en/blog'];
  const publishedRoutes = posts
    .filter((post) => post.meta.status === 'published')
    .map((post) => (post.meta.lang === 'en' ? `/en/blog/${post.slug}` : `/blog/${post.slug}`));

  const urls = [...staticRoutes, ...publishedRoutes]
    .map((pathname) => `  <url><loc>${escapeXml(absoluteUrl(pathname))}</loc></url>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

const files = (await readdir(postsDir))
  .filter((file) => file.endsWith('.md') && file !== 'README.md')
  .sort();

const posts = [];

for (const file of files) {
  const source = await readFile(join(postsDir, file), 'utf8');
  const parsed = parseMarkdownPost(source, file);
  posts.push({
    slug: basename(file, '.md'),
    ...parsed,
  });
}

posts.sort((a, b) => b.meta.date.localeCompare(a.meta.date));

const output = await prettier.format(
  `import type { BlogPost } from '@/types/blog';

export const blogPosts = ${JSON.stringify(posts, null, 2)} satisfies BlogPost[];
`,
  { parser: 'typescript', printWidth: 100, singleQuote: true, semi: true, trailingComma: 'all' },
);

await mkdir(outputDir, { recursive: true });
await writeFile(outputPath, output, 'utf8');
await writeFile(feedPath, createRssFeed(posts), 'utf8');
await writeFile(sitemapPath, createSitemap(posts), 'utf8');

console.log(`Generated ${posts.length} blog post(s), RSS feed, and sitemap.`);
