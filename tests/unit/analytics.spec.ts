import { afterEach, beforeEach, describe, expect, it } from 'vitest';

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
    document.head.innerHTML = '';
    Reflect.deleteProperty(window, 'dataLayer');
    Reflect.deleteProperty(window, 'gtag');
  });

  afterEach(() => {
    document.head.innerHTML = '';
    Reflect.deleteProperty(window, 'dataLayer');
    Reflect.deleteProperty(window, 'gtag');
  });

  it('loads Google Tag Manager with analytics consent denied by default', () => {
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

  it('keeps analytics storage denied when analytics consent is denied', () => {
    applyCookieConsent(false);

    expect(document.querySelector('script[src*="googletagmanager.com"]')).not.toBeNull();
    expect(window.dataLayer).toContainEqual([
      'consent',
      'update',
      expect.objectContaining({ analytics_storage: 'denied' }),
    ]);
  });

  it('grants analytics storage after analytics consent is granted', () => {
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

  it('stores analytics preference and tracks page views only with consent', () => {
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
});
