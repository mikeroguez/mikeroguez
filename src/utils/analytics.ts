export const GOOGLE_TAG_MANAGER_ID = 'GTM-M333ZHPZ';

const CONSENT_STORAGE_KEY = 'mikeroguez_cookie_consent';
const GTM_SCRIPT_ID = 'google-tag-manager';
const GA_COOKIE_PREFIXES = ['_ga', '_gid', '_gat'];

export interface CookieConsentPreferences {
  necessary: true;
  analytics: boolean;
  updatedAt: string;
}

type ConsentValue = 'granted' | 'denied';

interface GoogleConsentState {
  ad_storage: ConsentValue;
  ad_user_data: ConsentValue;
  ad_personalization: ConsentValue;
  analytics_storage: ConsentValue;
}

export function getStoredCookieConsent(): CookieConsentPreferences | undefined {
  if (typeof localStorage === 'undefined') return undefined;

  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) return undefined;

    const parsed = JSON.parse(stored) as Partial<CookieConsentPreferences>;
    if (parsed.necessary !== true || typeof parsed.analytics !== 'boolean') return undefined;

    return {
      necessary: true,
      analytics: parsed.analytics,
      updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : new Date().toISOString(),
    };
  } catch {
    return undefined;
  }
}

export function storeCookieConsent(analytics: boolean): CookieConsentPreferences {
  const preferences = {
    necessary: true,
    analytics,
    updatedAt: new Date().toISOString(),
  } satisfies CookieConsentPreferences;

  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences));
  applyCookieConsent(preferences.analytics);

  return preferences;
}

export function initializeGoogleAnalytics(): void {
  if (typeof window === 'undefined') return;

  initializeGoogleConsent();
  loadGoogleTagManager();
}

export function applyCookieConsent(analytics: boolean): void {
  if (typeof window === 'undefined') return;

  initializeGoogleAnalytics();

  if (analytics) {
    window.gtag('consent', 'update', consentState('granted'));
    trackPageView(currentPagePath(), document.title);
    return;
  }

  window.gtag('consent', 'update', consentState('denied'));
  clearGoogleAnalyticsCookies();
}

export function trackPageView(path: string, title: string): void {
  if (typeof window === 'undefined') return;
  if (!getStoredCookieConsent()?.analytics) return;

  window.dataLayer?.push({
    event: 'page_view',
    page_path: path,
    page_title: title,
  });
}

function initializeGoogleConsent(): void {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };

  window.gtag('consent', 'default', consentState('denied'));
  window.gtag('set', 'ads_data_redaction', true);
}

function loadGoogleTagManager(): void {
  if (document.getElementById(GTM_SCRIPT_ID)) return;

  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
  });

  const script = document.createElement('script');
  script.id = GTM_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GOOGLE_TAG_MANAGER_ID}`;
  document.head.append(script);
}

function consentState(analytics: ConsentValue): GoogleConsentState {
  return {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: analytics,
  };
}

function clearGoogleAnalyticsCookies(): void {
  const hostParts = window.location.hostname.split('.');
  const domains = hostParts.map((_, index) => `.${hostParts.slice(index).join('.')}`);
  const cookieNames = document.cookie
    .split(';')
    .map((cookie) => cookie.trim().split('=')[0] ?? '')
    .filter((name) =>
      GA_COOKIE_PREFIXES.some((prefix) => name === prefix || name.startsWith(`${prefix}_`)),
    );

  for (const name of cookieNames) {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}; SameSite=Lax`;
    }
  }
}

function currentPagePath(): string {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}
