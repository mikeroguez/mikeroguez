import { execFile } from 'node:child_process';
import { readdir, readFile, stat } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const failures = [];

const textExtensions = new Set([
  '.css',
  '.html',
  '.js',
  '.json',
  '.md',
  '.mjs',
  '.ts',
  '.vue',
  '.xml',
  '.yml',
  '.yaml',
  '.txt',
]);

const ignoredDirs = new Set([
  '.git',
  'node_modules',
  'dist',
  '.nuxt',
  '.output',
  'coverage',
  '.local-context',
  '.npm-cache',
  '.npm-logs',
]);
const publicServedDirs = ['src', 'public'];
const secretPatterns = [
  { name: 'GitHub token', pattern: /gh[pousr]_[A-Za-z0-9_]{20,}/ },
  { name: 'AWS access key', pattern: /AKIA[0-9A-Z]{16}/ },
  { name: 'private key block', pattern: /-----BEGIN (RSA |EC |OPENSSH |DSA |)?PRIVATE KEY-----/ },
  {
    name: 'generic secret assignment',
    pattern: /\b(?:password|passwd|secret|api[_-]?key|token)\s*=\s*["'][^"']{8,}["']/i,
  },
];
const localPathPattern = /(?:\/Users\/|\/home\/|C:\\Users\\)/i;

function addFailure(message) {
  failures.push(message);
}

async function git(args) {
  return execFileAsync('git', args, { cwd: process.cwd() });
}

async function walk(dir, files = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return files;
  }

  for (const entry of entries) {
    const path = join(dir, entry.name);
    const rel = relative(process.cwd(), path);
    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) {
        await walk(path, files);
      }
      continue;
    }

    if (entry.isFile()) {
      files.push(rel);
    }
  }

  return files;
}

const gitignore = await readFile('.gitignore', 'utf8').catch(() => '');

if (!/(^|\n)\.local-context\/(\n|$)/.test(gitignore)) {
  addFailure('.local-context/ must remain ignored in .gitignore.');
}

if (!/(^|\n)\.env(\n|$)/.test(gitignore) || !/(^|\n)\.env\.\*(\n|$)/.test(gitignore)) {
  addFailure('.env and .env.* must remain ignored in .gitignore.');
}

if (!/(^|\n)!\.env\.example(\n|$)/.test(gitignore)) {
  addFailure('.env.example must remain explicitly allowed in .gitignore.');
}

const tracked = (await git(['ls-files'])).stdout.split('\n').filter(Boolean);

for (const file of tracked) {
  if (/\.(pem|key|p12)$/i.test(file)) {
    addFailure(`Tracked key or certificate file is not allowed: ${file}`);
  }

  if (/^\.env(?:\.|$)/.test(file) && file !== '.env.example') {
    addFailure(`Real environment file must not be tracked: ${file}`);
  }
}

const files = await walk(process.cwd());

for (const file of files) {
  const fileStat = await stat(file).catch(() => undefined);
  if (!fileStat?.isFile() || !textExtensions.has(extname(file))) {
    continue;
  }

  const content = await readFile(file, 'utf8').catch(() => '');

  if (publicServedDirs.some((dir) => file === dir || file.startsWith(`${dir}/`))) {
    if (content.includes('.local-context/')) {
      addFailure(`Public served file references .local-context/: ${file}`);
    }
  }

  if (localPathPattern.test(content)) {
    addFailure(`Local filesystem path detected in ${file}`);
  }

  for (const { name, pattern } of secretPatterns) {
    if (pattern.test(content)) {
      addFailure(`${name} pattern detected in ${file}`);
    }
  }
}

if (failures.length > 0) {
  console.error('Public safety check failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  console.error('This script is a guardrail and does not replace human review.');
  process.exit(1);
}

console.log('Public safety check passed. Human review is still required.');
