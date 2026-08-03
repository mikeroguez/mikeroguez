import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  GOOGLE_TAG_MANAGER_ID,
  applyCookieConsent,
  getStoredCookieConsent,
  initializeGoogleAnalytics,
  storeCookieConsent,
  trackPageView,
} from '@/utils/analytics';

describe('analytics consent', () => {
  beforeEach(() => {
    resetAnalyticsDom('https://mikeroguez.me/');
  });

  afterEach(() => {
    resetAnalyticsDom('https://mikeroguez.me/');
    vi.unstubAllGlobals();
  });

  it('loads Google Tag Manager with analytics consent denied by default on the root domain', () => {
    initializeGoogleAnalytics();

    const script = document.querySelector<HTMLScriptElement>('#google-tag-manager');
    expect(script?.src).toContain(`id=${GOOGLE_TAG_MANAGER_ID}`);
    expect(window.dataLayer).toContainEqual([
      'consent',
      'default',
      expect.objectContaining({ analytics_storage: 'denied' }),
    ]);
    expect(window.dataLayer).toContainEqual(expect.objectContaining({ event: 'gtm.js' }));
  });

  it('loads Google Tag Manager on owned subdomains', () => {
    resetAnalyticsDom('https://research.mikeroguez.me/publicaciones');

    initializeGoogleAnalytics();

    const script = document.querySelector<HTMLScriptElement>('#google-tag-manager');
    expect(script?.src).toContain(`id=${GOOGLE_TAG_MANAGER_ID}`);
  });

  it('does not load Google Tag Manager outside the production domain', () => {
    resetAnalyticsDom('http://localhost:5173/blog/private-draft');

    initializeGoogleAnalytics();

    expect(document.querySelector('script[src*="googletagmanager.com"]')).toBeNull();
    expect(window.dataLayer).toBeUndefined();
  });

  it('does not load Google Tag Manager on unrelated preview hosts', () => {
    resetAnalyticsDom('https://deploy-preview-123.example.app/blog/private-draft');

    initializeGoogleAnalytics();

    expect(document.querySelector('script[src*="googletagmanager.com"]')).toBeNull();
    expect(window.dataLayer).toBeUndefined();
  });

  it('keeps analytics storage denied when analytics consent is denied', () => {
    applyCookieConsent(false);

    expect(document.querySelector('script[src*="googletagmanager.com"]')).not.toBeNull();
    expect(window.dataLayer).toContainEqual([
      'consent',
      'update',
      expect.objectContaining({ analytics_storage: 'denied' }),
    ]);
    expect(window.dataLayer).not.toContainEqual(expect.objectContaining({ event: 'page_view' }));
  });

  it('does not send page views when only necessary cookies are allowed', () => {
    storeCookieConsent(false);

    trackPageView('/research', 'Research');

    expect(getStoredCookieConsent()?.analytics).toBe(false);
    expect(window.dataLayer).not.toContainEqual(expect.objectContaining({ event: 'page_view' }));
  });

  it('grants analytics storage and sends the current page after analytics consent is granted', () => {
    const preferences = storeCookieConsent(true);

    const script = document.querySelector<HTMLScriptElement>('#google-tag-manager');
    expect(preferences.analytics).toBe(true);
    expect(script?.src).toContain(`id=${GOOGLE_TAG_MANAGER_ID}`);
    expect(window.dataLayer).toContainEqual([
      'consent',
      'update',
      expect.objectContaining({ analytics_storage: 'granted' }),
    ]);
    expect(window.dataLayer).toContainEqual(
      expect.objectContaining({ event: 'page_view', page_path: '/' }),
    );
  });

  it('tracks route page views only after analytics consent is granted', () => {
    expect(getStoredCookieConsent()).toBeUndefined();

    trackPageView('/work', 'Work');
    expect(window.dataLayer).toBeUndefined();

    storeCookieConsent(true);
    trackPageView('/work', 'Work');

    expect(getStoredCookieConsent()?.analytics).toBe(true);
    expect(window.dataLayer).toContainEqual({
      event: 'page_view',
      page_path: '/work',
      page_title: 'Work',
    });
  });

  it('does not send page views from local development even when analytics was accepted', () => {
    resetAnalyticsDom('http://localhost:5173/blog/private-draft');

    storeCookieConsent(true);
    trackPageView('/blog/private-draft', 'Private draft');

    expect(getStoredCookieConsent()?.analytics).toBe(true);
    expect(document.querySelector('script[src*="googletagmanager.com"]')).toBeNull();
    expect(window.dataLayer).toBeUndefined();
  });

  it('does not send page views from unrelated preview hosts even when analytics was accepted', () => {
    resetAnalyticsDom('https://deploy-preview-123.example.app/blog/private-draft');

    storeCookieConsent(true);
    trackPageView('/blog/private-draft', 'Private draft');

    expect(document.querySelector('script[src*="googletagmanager.com"]')).toBeNull();
    expect(window.dataLayer).toBeUndefined();
  });
});

function resetAnalyticsDom(url: string): void {
  vi.stubGlobal('location', new URL(url));
  document.head.innerHTML = '';
  Reflect.deleteProperty(window, 'dataLayer');
  Reflect.deleteProperty(window, 'gtag');
}
