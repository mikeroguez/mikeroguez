import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { basename, join, resolve } from 'node:path';

import prettier from 'prettier';

const publicationsDir = resolve('src/content/publications');
const outputDir = resolve('src/content/generated');
const outputPath = join(outputDir, 'research-publications.ts');

const validTypes = new Set(['journal', 'conference', 'chapter', 'thesis', 'report']);
const validStatuses = new Set(['draft', 'published']);

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

function parsePublication(source, filename) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`${filename} is missing frontmatter.`);

  const [, frontmatter, body] = match;
  const values = new Map();

  for (const line of frontmatter.split('\n')) {
    const sep = line.indexOf(':');
    if (sep === -1) continue;
    values.set(line.slice(0, sep).trim(), parseFrontmatterValue(line.slice(sep + 1)));
  }

  const type = values.get('type') ?? 'journal';
  if (!validTypes.has(type)) throw new Error(`${filename} has invalid type: ${type}`);

  const status = values.get('status') ?? 'draft';
  if (!validStatuses.has(status)) throw new Error(`${filename} has invalid status: ${status}`);

  const title = values.get('title') ?? 'Untitled';
  const year = values.get('year') ?? '0000';
  const venue = values.get('venue');
  const doi = values.get('doi');
  const url = values.get('url');
  const citation = values.get('citation');
  const descriptionEn = values.get('descriptionEn');
  const description = body.trim().replace(/\n+/g, ' ');

  return {
    title,
    year,
    type,
    ...(venue ? { venue } : {}),
    ...(doi ? { doi } : {}),
    ...(url ? { url } : {}),
    ...(citation ? { citation } : {}),
    description,
    ...(descriptionEn ? { descriptionEn } : {}),
    status,
    searchText: normalizeSearchText(
      [title, description, descriptionEn ?? '', year, venue ?? '', doi ?? ''].join(' '),
    ),
  };
}

const files = (await readdir(publicationsDir))
  .filter((f) => f.endsWith('.md') && f !== 'README.md')
  .sort();

const publications = [];

for (const file of files) {
  const source = await readFile(join(publicationsDir, file), 'utf8');
  const parsed = parsePublication(source, file);
  publications.push({ slug: basename(file, '.md'), ...parsed });
}

publications.sort((a, b) => b.year.localeCompare(a.year) || a.title.localeCompare(b.title));

const output = await prettier.format(
  `import type { Publication } from '@/types/research';

export const researchPublications = ${JSON.stringify(publications, null, 2)} satisfies Publication[];
`,
  { parser: 'typescript', printWidth: 100, singleQuote: true, semi: true, trailingComma: 'all' },
);

await mkdir(outputDir, { recursive: true });
await writeFile(outputPath, output, 'utf8');

console.log(`Generated ${publications.length} publication(s).`);
