import { readFile, writeFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';

import { optimize } from 'svgo';

const sourcePath = resolve('.local-context/approved/assets/brand-originals/Mikeroguez.svg');
const outputPath = resolve('public/brand/mikeroguez-logo-mask.svg');

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

await writeFile(outputPath, `${maskSvg}\n`, 'utf8');

console.log(`Optimized ${basename(sourcePath)} -> ${basename(outputPath)}`);
