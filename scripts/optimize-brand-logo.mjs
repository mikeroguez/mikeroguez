import { readFile, writeFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';

import { optimize } from 'svgo';

const sourcePath = resolve('.local-context/approved/assets/brand-originals/Mikeroguez.svg');
const logoOutputPath = resolve('public/brand/mikeroguez-logo-mask.svg');
const isotypeOutputPath = resolve('public/brand/mikeroguez-isotype-mask.svg');
const isotypeViewBox = '0 0 145 189';

const source = await readFile(sourcePath, 'utf8');

const optimized = optimize(source, {
  path: sourcePath,
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          cleanupIds: true,
          convertPathData: {
            floatPrecision: 1,
          },
        },
      },
    },
    'removeDimensions',
    'removeXMLProcInst',
    'removeDoctype',
  ],
});

if ('error' in optimized) {
  throw new Error(optimized.error);
}

const maskSvg = optimized.data
  .replace(/\sfill="(?:#[0-9a-fA-F]{3,8}|white|black|rgb\([^)]+\))"/g, ' fill="#000"')
  .replace(/<svg\b/, '<svg role="img" aria-label="Mikeroguez"');

const isotypeSvg = maskSvg
  .replace('aria-label="Mikeroguez"', 'aria-label="Isotipo Mikeroguez"')
  .replace(/viewBox="[^"]+"/, `viewBox="${isotypeViewBox}"`)
  .replace(/<svg\b(?![^>]*\boverflow=)/, '<svg overflow="hidden"');

await writeFile(logoOutputPath, `${maskSvg}\n`, 'utf8');
await writeFile(isotypeOutputPath, `${isotypeSvg}\n`, 'utf8');

// Favicon: re-optimize with integer precision — collapses sub-pixel diamond paths,
// dramatically reducing file size. Keep original fill colors (not mask).
const faviconOpt = optimize(source, {
  path: sourcePath,
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          cleanupIds: true,
          convertPathData: { floatPrecision: 0 },
        },
      },
    },
    'removeDimensions',
    'removeXMLProcInst',
    'removeDoctype',
  ],
});

if ('error' in faviconOpt) throw new Error(faviconOpt.error);

let faviconSvg = faviconOpt.data
  .replace(/viewBox="[^"]+"/, `viewBox="${isotypeViewBox}"`)
  .replace('<svg ', '<svg overflow="hidden" aria-hidden="true" ');

// Paper background behind the brand-colored isotype
faviconSvg = faviconSvg.replace(
  /(<svg[^>]*>)/,
  '$1<rect width="145" height="189" fill="#eee8dc"/>',
);

const faviconOutputPath = resolve('public/favicon.svg');
await writeFile(faviconOutputPath, `${faviconSvg}\n`, 'utf8');

console.log(
  `Optimized ${basename(sourcePath)} -> ${basename(logoOutputPath)}, ${basename(isotypeOutputPath)}, ${basename(faviconOutputPath)}`,
);
