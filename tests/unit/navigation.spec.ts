import { flushPromises, mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import AppHeader from '@/components/AppHeader.vue';
import { setLocale } from '@/i18n';
import router from '@/router';

describe('navigation', () => {
  it('renders the primary navigation links', async () => {
    router.push('/');
    await router.isReady();

    const wrapper = mount(AppHeader, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.get('.brand-logo--header').attributes('aria-hidden')).toBe('true');
    expect(wrapper.text()).toContain('Inicio');
    expect(wrapper.text()).toContain('Sobre mí');
    expect(wrapper.text()).toContain('Investigación');
    expect(wrapper.text()).toContain('Blog');
  });

  it('routes to work without hashes', async () => {
    await router.push('/work');
    expect(router.currentRoute.value.path).toBe('/work');
  });

  it('switches blog posts to the translated slug', async () => {
    setLocale('es');
    await router.push('/blog/analitica-aprendizaje-inteligencia-artificial');
    await router.isReady();

    const wrapper = mount(AppHeader, {
      global: {
        plugins: [router],
      },
    });

    await wrapper.get('.site-header__lang-toggle').trigger('click');
    await flushPromises();

    expect(router.currentRoute.value.path).toBe('/blog/what-is-learning-analytics-ai');
  });

  it('switches blog posts to the translated slug from trailing slash urls', async () => {
    setLocale('es');
    await router.push('/blog/analitica-aprendizaje-inteligencia-artificial/');
    await router.isReady();

    const wrapper = mount(AppHeader, {
      global: {
        plugins: [router],
      },
    });

    await wrapper.get('.site-header__lang-toggle').trigger('click');
    await flushPromises();

    expect(router.currentRoute.value.path).toBe('/blog/what-is-learning-analytics-ai');
  });
});
