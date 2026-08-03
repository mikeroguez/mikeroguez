import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { basename, join, resolve } from 'node:path';

import MarkdownIt from 'markdown-it';
import prettier from 'prettier';

const postsDir = resolve('src/content/posts');
const outputDir = resolve('src/content/generated');
const outputPath = join(outputDir, 'blog-posts.ts');
const publicDir = resolve('public');
const feedPath = join(publicDir, 'feed.xml');
const feedEnPath = join(publicDir, 'feed-en.xml');
const sitemapPath = join(publicDir, 'sitemap.xml');
const siteUrl = 'https://mikeroguez.me';
const siteTitle = 'Mikeroguez';
const feedConfig = {
  es: {
    path: '/feed.xml',
    description:
      'Sitio personal de Mikeroguez. Investigación, educación, diseño y desarrollo de software.',
    language: 'es-MX',
  },
  en: {
    path: '/feed-en.xml',
    description:
      'Personal site of Mikeroguez. Research, education, design and software development.',
    language: 'en',
  },
};
const validStatuses = new Set(['draft', 'review', 'published']);
const validLanguages = new Set(['es', 'en']);
const includeReviewPosts = process.env.BLOG_INCLUDE_REVIEW !== 'false';

const markdown = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
});

markdown.core.ruler.after('inline', 'image_caption_figures', (state) => {
  const tokens = state.tokens;

  for (let index = 0; index < tokens.length - 5; index += 1) {
    const imageParagraphOpen = tokens[index];
    const imageInline = tokens[index + 1];
    const imageParagraphClose = tokens[index + 2];
    const captionParagraphOpen = tokens[index + 3];
    const captionInline = tokens[index + 4];
    const captionParagraphClose = tokens[index + 5];
    const imageChildren = imageInline.children ?? [];
    const captionChildren = captionInline.children ?? [];
    const hasSingleImage =
      imageParagraphOpen.type === 'paragraph_open' &&
      imageInline.type === 'inline' &&
      imageParagraphClose.type === 'paragraph_close' &&
      imageChildren.length === 1 &&
      imageChildren[0].type === 'image';
    const hasEmphasisCaption =
      captionParagraphOpen.type === 'paragraph_open' &&
      captionInline.type === 'inline' &&
      captionParagraphClose.type === 'paragraph_close' &&
      captionChildren[0]?.type === 'em_open' &&
      captionChildren.at(-1)?.type === 'em_close';

    if (!hasSingleImage || !hasEmphasisCaption) continue;

    const figureOpen = new state.Token('figure_open', 'figure', 1);
    const figureClose = new state.Token('figure_close', 'figure', -1);
    const figcaptionOpen = new state.Token('figcaption_open', 'figcaption', 1);
    const figcaptionClose = new state.Token('figcaption_close', 'figcaption', -1);
    const figureImage = new state.Token('inline', '', 0);
    const captionText = new state.Token('inline', '', 0);

    figureImage.children = imageChildren;
    captionText.children = captionChildren.slice(1, -1);

    tokens.splice(
      index,
      6,
      figureOpen,
      figureImage,
      figcaptionOpen,
      captionText,
      figcaptionClose,
      figureClose,
    );
  }
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
  const seoTitle = values.get('seoTitle');
  const date = values.get('date') ?? '1970-01-01';
  const updated = values.get('updated');
  const translationKey = values.get('translationKey');
  const image = values.get('image');
  const tagsRaw = values.get('tags');
  const tags = tagsRaw
    ? tagsRaw
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    : [];
  const keywordsRaw = values.get('keywords');
  const keywords = keywordsRaw
    ? keywordsRaw
        .split(',')
        .map((keyword) => keyword.trim())
        .filter(Boolean)
    : [];
  const bodyText = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/[#>*_[\]()!-]/g, ' ');
  const wordCount = bodyText.trim().split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return {
    meta: {
      title,
      ...(seoTitle ? { seoTitle } : {}),
      description,
      date,
      ...(updated ? { updated } : {}),
      status,
      lang,
      ...(translationKey ? { translationKey } : {}),
      ...(image ? { image } : {}),
      ...(tags.length ? { tags } : {}),
      ...(keywords.length ? { keywords } : {}),
      readingTime,
    },
    html: markdown.render(body.trim()),
    excerpt: description,
    searchText: normalizeSearchText(
      `${title} ${seoTitle ?? ''} ${description} ${date} ${tags.join(' ')} ${keywords.join(
        ' ',
      )} ${bodyText}`,
    ),
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

function postPath(post) {
  return `/blog/${post.slug}`;
}

function toRssDate(date) {
  return new Date(`${date}T00:00:00Z`).toUTCString();
}

function createRssFeed(posts, lang) {
  const config = feedConfig[lang];
  const publishedPosts = posts.filter(
    (post) => post.meta.status === 'published' && post.meta.lang === lang,
  );
  const lastBuildDate = publishedPosts[0]?.meta.date
    ? toRssDate(publishedPosts[0].meta.date)
    : new Date().toUTCString();

  const items = publishedPosts
    .map((post) => {
      const url = absoluteUrl(postPath(post));
      const categories = (post.meta.tags ?? [])
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join('\n');
      return `    <item>
      <title>${escapeXml(post.meta.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <description>${escapeXml(post.meta.description)}</description>
      <pubDate>${escapeXml(toRssDate(post.meta.date))}</pubDate>
      <author>maro@ucol.mx (Miguel Ángel Rodríguez Ortiz)</author>
${categories}
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteTitle)}</title>
    <link>${escapeXml(siteUrl)}</link>
    <description>${escapeXml(config.description)}</description>
    <language>${escapeXml(config.language)}</language>
    <lastBuildDate>${escapeXml(lastBuildDate)}</lastBuildDate>
    <atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="${escapeXml(
      absoluteUrl(config.path),
    )}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
}

function createSitemap(posts) {
  const staticRoutes = [
    '/',
    '/sobre-mi',
    '/trabajo',
    '/investigacion',
    '/publicaciones',
    '/contacto',
    '/privacidad',
    '/aviso-de-cookies',
    '/licencia',
    '/home',
    '/about',
    '/work',
    '/research',
    '/blog',
    '/contact',
    '/privacy',
    '/cookies',
    '/license',
  ];
  const staticUrls = staticRoutes.map(
    (pathname) => `  <url><loc>${escapeXml(absoluteUrl(pathname))}</loc></url>`,
  );
  const postUrls = posts
    .filter((post) => post.meta.status === 'published')
    .map(
      (post) => `  <url>
    <loc>${escapeXml(absoluteUrl(postPath(post)))}</loc>
    <lastmod>${escapeXml(post.meta.updated ?? post.meta.date)}</lastmod>
    <changefreq>monthly</changefreq>
  </url>`,
    );

  const urls = [...staticUrls, ...postUrls].join('\n');

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
const slugs = new Set();

for (const file of files) {
  const source = await readFile(join(postsDir, file), 'utf8');
  const parsed = parseMarkdownPost(source, file);
  const slug = basename(file, '.md');
  if (slugs.has(slug)) {
    throw new Error(`${file} duplicates an existing blog slug.`);
  }
  slugs.add(slug);
  posts.push({
    slug,
    ...parsed,
  });
}

posts.sort((a, b) => b.meta.date.localeCompare(a.meta.date));
const outputPosts = includeReviewPosts
  ? posts
  : posts.filter((post) => post.meta.status === 'published');

const output = await prettier.format(
  `import type { BlogPost } from '@/types/blog';

export const blogPosts: BlogPost[] = ${JSON.stringify(outputPosts, null, 2)};
`,
  { parser: 'typescript', printWidth: 100, singleQuote: true, semi: true, trailingComma: 'all' },
);

await mkdir(outputDir, { recursive: true });
await writeFile(outputPath, output, 'utf8');
await writeFile(feedPath, createRssFeed(posts, 'es'), 'utf8');
await writeFile(feedEnPath, createRssFeed(posts, 'en'), 'utf8');
await writeFile(sitemapPath, createSitemap(posts), 'utf8');

console.log(`Generated ${posts.length} blog post(s), RSS feed, and sitemap.`);
