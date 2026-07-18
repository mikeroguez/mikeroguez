import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';

import CookieConsentBanner from '@/components/CookieConsentBanner.vue';
import { setLocale } from '@/i18n';
import router from '@/router';

describe('CookieConsentBanner', () => {
  async function mountBanner(path = '/') {
    await router.push(path);
    await router.isReady();

    return mount(CookieConsentBanner, {
      global: {
        plugins: [router],
      },
    });
  }

  it('uses the currently selected language', async () => {
    setLocale('en');
    const wrapper = await mountBanner('/home');

    expect(wrapper.text()).toContain('Privacy and cookies');
    expect(wrapper.text()).toContain('Allow Google Analytics');

    setLocale('es');
    await nextTick();

    expect(wrapper.text()).toContain('Privacidad y cookies');
    expect(wrapper.text()).toContain('Permitir Google Analytics');
  });

  it('presents analytics as a button decision, not a second input', async () => {
    const wrapper = await mountBanner();
    const checkboxes = wrapper.findAll('input[type="checkbox"]');

    expect(wrapper.text()).toContain('Activas');
    expect(wrapper.text()).toContain('Opcional');
    expect(checkboxes).toHaveLength(0);
    expect(wrapper.findAll('button')).toHaveLength(2);
    expect(wrapper.text()).toContain('Usar solo necesarias');
    expect(wrapper.text()).toContain('Permitir Google Analytics');
  });
});
