import { createSign } from 'node:crypto';
import { Buffer } from 'node:buffer';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { URLSearchParams } from 'node:url';

const defaultCredentialsPath = '.secrets/google-analytics-service-account.json';
const scopes = ['https://www.googleapis.com/auth/analytics.readonly'];
const tokenUrl = 'https://oauth2.googleapis.com/token';

function base64Url(input) {
  const buffer = Buffer.isBuffer(input) ? input : Buffer.from(input);
  return buffer.toString('base64').replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
}

function parseArgs(argv) {
  const args = { _: [] };

  for (const arg of argv) {
    if (!arg.startsWith('--')) {
      args._.push(arg);
      continue;
    }

    const [key, value = 'true'] = arg.slice(2).split('=');
    args[key] = value;
  }

  return args;
}

function normalizePropertyId(value) {
  const property = value ?? process.env.GA4_PROPERTY_ID;
  if (!property) {
    throw new Error('Missing GA4 property. Set GA4_PROPERTY_ID or pass --property=123456789.');
  }

  return property.replace(/^properties\//, '');
}

function dateRange(args) {
  const days = Number(args.days ?? 28);
  return {
    startDate: args['start-date'] ?? `${days}daysAgo`,
    endDate: args['end-date'] ?? 'today',
  };
}

async function readCredentials(path) {
  const credentialsPath = resolve(path);
  const raw = await readFile(credentialsPath, 'utf8');
  const credentials = JSON.parse(raw);

  if (
    credentials.type !== 'service_account' ||
    !credentials.client_email ||
    !credentials.private_key
  ) {
    throw new Error('The credentials file is not a valid Google service account JSON.');
  }

  return credentials;
}

async function getAccessToken(credentials) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: credentials.client_email,
    scope: scopes.join(' '),
    aud: credentials.token_uri ?? tokenUrl,
    iat: now,
    exp: now + 3600,
  };
  const unsigned = `${base64Url(JSON.stringify(header))}.${base64Url(JSON.stringify(payload))}`;
  const signature = createSign('RSA-SHA256').update(unsigned).sign(credentials.private_key);
  const assertion = `${unsigned}.${base64Url(signature)}`;

  const response = await globalThis.fetch(tokenUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Google auth failed (${response.status}): ${safeGoogleError(body)}`);
  }

  const token = await response.json();
  return token.access_token;
}

async function googleFetch(url, token, init = {}) {
  const response = await globalThis.fetch(url, {
    ...init,
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
      ...init.headers,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Google API request failed (${response.status}): ${safeGoogleError(body)}`);
  }

  return response.json();
}

function safeGoogleError(body) {
  try {
    const parsed = JSON.parse(body);
    const error = parsed.error ?? {};
    const message = String(error.message ?? 'Unknown Google API error')
      .replaceAll(/\bprojects\/\d+\b/g, 'projects/[redacted]')
      .replaceAll(/\bproject=\d+\b/g, 'project=[redacted]')
      .replaceAll(/\b\d{8,}\b/g, '[redacted]');
    const status = error.status ? ` ${error.status}` : '';
    return `${message}${status}`;
  } catch {
    return body
      .replaceAll(/\bprojects\/\d+\b/g, 'projects/[redacted]')
      .replaceAll(/\bproject=\d+\b/g, 'project=[redacted]')
      .replaceAll(/\b\d{8,}\b/g, '[redacted]');
  }
}

function rowValue(row, type, index) {
  const source = type === 'dimension' ? row.dimensionValues : row.metricValues;
  return source?.[index]?.value ?? '';
}

function numberValue(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return value;
  return Math.round(number).toLocaleString('en-US');
}

function percentValue(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return value;
  return `${(number * 100).toFixed(1)}%`;
}

function secondsValue(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return value;
  return `${number.toFixed(1)}s`;
}

function printTable(headers, rows) {
  console.log(`| ${headers.join(' | ')} |`);
  console.log(`| ${headers.map(() => '---').join(' | ')} |`);
  for (const row of rows) {
    console.log(`| ${row.map((cell) => String(cell).replaceAll('|', '\\|')).join(' | ')} |`);
  }
}

async function runReport(token, propertyId, body) {
  return googleFetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    token,
    {
      method: 'POST',
      body: JSON.stringify(body),
    },
  );
}

async function listProperties(token) {
  const data = await googleFetch(
    'https://analyticsadmin.googleapis.com/v1beta/accountSummaries',
    token,
  );
  const rows = [];

  for (const account of data.accountSummaries ?? []) {
    for (const property of account.propertySummaries ?? []) {
      rows.push([
        account.displayName ?? '(sin nombre)',
        property.property?.replace('properties/', '') ?? '',
        property.displayName ?? '(sin nombre)',
      ]);
    }
  }

  if (rows.length === 0) {
    console.log('No GA4 properties are visible to this service account.');
    return;
  }

  printTable(['Account', 'Property ID', 'Property'], rows);
}

async function topPages(token, propertyId, args) {
  const limit = Number(args.limit ?? 20);
  const report = await runReport(token, propertyId, {
    dateRanges: [dateRange(args)],
    dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
    metrics: [
      { name: 'screenPageViews' },
      { name: 'activeUsers' },
      { name: 'engagementRate' },
      { name: 'averageSessionDuration' },
    ],
    orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
    limit,
  });

  const rows = (report.rows ?? []).map((row) => [
    rowValue(row, 'dimension', 0),
    rowValue(row, 'dimension', 1),
    numberValue(rowValue(row, 'metric', 0)),
    numberValue(rowValue(row, 'metric', 1)),
    percentValue(rowValue(row, 'metric', 2)),
    secondsValue(rowValue(row, 'metric', 3)),
  ]);

  printTable(['Path', 'Title', 'Views', 'Users', 'Engagement', 'Avg session'], rows);
}

async function traffic(token, propertyId, args) {
  const limit = Number(args.limit ?? 20);
  const report = await runReport(token, propertyId, {
    dateRanges: [dateRange(args)],
    dimensions: [{ name: 'sessionSourceMedium' }],
    metrics: [{ name: 'sessions' }, { name: 'activeUsers' }, { name: 'engagementRate' }],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    limit,
  });

  const rows = (report.rows ?? []).map((row) => [
    rowValue(row, 'dimension', 0),
    numberValue(rowValue(row, 'metric', 0)),
    numberValue(rowValue(row, 'metric', 1)),
    percentValue(rowValue(row, 'metric', 2)),
  ]);

  printTable(['Source / medium', 'Sessions', 'Users', 'Engagement'], rows);
}

async function blogPages(token, propertyId, args) {
  const limit = Number(args.limit ?? 20);
  const report = await runReport(token, propertyId, {
    dateRanges: [dateRange(args)],
    dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
    metrics: [
      { name: 'screenPageViews' },
      { name: 'activeUsers' },
      { name: 'engagementRate' },
      { name: 'averageSessionDuration' },
    ],
    dimensionFilter: {
      filter: {
        fieldName: 'pagePath',
        stringFilter: { matchType: 'BEGINS_WITH', value: '/blog' },
      },
    },
    orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
    limit,
  });

  const rows = (report.rows ?? []).map((row) => [
    rowValue(row, 'dimension', 0),
    rowValue(row, 'dimension', 1),
    numberValue(rowValue(row, 'metric', 0)),
    numberValue(rowValue(row, 'metric', 1)),
    percentValue(rowValue(row, 'metric', 2)),
    secondsValue(rowValue(row, 'metric', 3)),
  ]);

  printTable(['Path', 'Title', 'Views', 'Users', 'Engagement', 'Avg session'], rows);
}

function printHelp() {
  console.log(`Usage:
  npm run analytics:properties
  GA4_PROPERTY_ID=123456789 npm run analytics:pages -- --days=90
  GA4_PROPERTY_ID=123456789 npm run analytics:traffic -- --start-date=2026-07-01 --end-date=today
  GA4_PROPERTY_ID=123456789 npm run analytics:blog -- --limit=10

Options:
  --credentials=.secrets/google-analytics-service-account.json
  --property=123456789
  --days=28
  --start-date=YYYY-MM-DD
  --end-date=YYYY-MM-DD
  --limit=20`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const command = args._[0] ?? 'help';

  if (command === 'help') {
    printHelp();
    return;
  }

  const credentialsPath =
    args.credentials ?? process.env.GOOGLE_APPLICATION_CREDENTIALS ?? defaultCredentialsPath;
  const credentials = await readCredentials(credentialsPath);
  const token = await getAccessToken(credentials);

  if (command === 'auth') {
    console.log('Google Analytics credentials loaded and access token acquired.');
  } else if (command === 'properties') {
    await listProperties(token);
  } else if (command === 'pages') {
    await topPages(token, normalizePropertyId(args.property), args);
  } else if (command === 'traffic') {
    await traffic(token, normalizePropertyId(args.property), args);
  } else if (command === 'blog') {
    await blogPages(token, normalizePropertyId(args.property), args);
  } else {
    printHelp();
    process.exitCode = 1;
  }
}

try {
  await main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
