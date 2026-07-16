import { afterEach, beforeEach } from 'vitest';

import { setLocale } from '@/i18n';

Object.defineProperty(window, 'scrollTo', {
  value: () => undefined,
  writable: true,
});

beforeEach(() => {
  window.localStorage.clear();
  setLocale('es');
});

afterEach(() => {
  document.title = 'Mikeroguez';
});
