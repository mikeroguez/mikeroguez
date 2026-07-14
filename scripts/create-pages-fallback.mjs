import { copyFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const distDir = resolve('dist');
const indexPath = resolve(distDir, 'index.html');
const fallbackPath = resolve(distDir, '404.html');
const cnamePath = resolve(distDir, 'CNAME');

async function assertFile(path, message) {
  try {
    const fileStat = await stat(path);
    if (!fileStat.isFile()) {
      throw new Error(message);
    }
  } catch {
    throw new Error(message);
  }
}

await assertFile(indexPath, 'dist/index.html was not found. Run the Vite build first.');
await copyFile(indexPath, fallbackPath);
await assertFile(fallbackPath, 'Failed to create dist/404.html for GitHub Pages SPA fallback.');
await assertFile(
  cnamePath,
  'dist/CNAME was not found. Confirm public/CNAME is included in the build.',
);

console.log('GitHub Pages fallback created at dist/404.html.');
