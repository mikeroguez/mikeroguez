import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import App from '@/app.vue';
import { setLocale } from '@/i18n';
import router from '@/router';

describe('App', () => {
  const mountApp = () =>
    mount(App, {
      global: {
        plugins: [router],
        stubs: {
          NuxtPage: { template: '<div />' },
        },
      },
    });

  it('mounts with the main layout', async () => {
    router.push('/');
    await router.isReady();

    const wrapper = mountApp();

    expect(wrapper.find('main#main-content').exists()).toBe(true);
    expect(wrapper.text()).toContain('Mikeroguez');
  });

  it('includes a skip link to the main content', async () => {
    router.push('/');
    await router.isReady();

    const wrapper = mountApp();

    const skipLink = wrapper.get('a.skip-link');
    expect(skipLink.attributes('href')).toBe('#main-content');
    expect(skipLink.text()).toBe('Saltar al contenido');
  });

  it('hides breadcrumbs on the home page', async () => {
    await router.push('/');
    await router.isReady();

    const wrapper = mountApp();

    expect(wrapper.find('nav[aria-label="Ruta de navegación"]').exists()).toBe(false);
  });

  it('renders breadcrumbs on internal pages', async () => {
    await router.push('/trabajo');
    await router.isReady();

    const wrapper = mountApp();

    const breadcrumb = wrapper.get('nav[aria-label="Ruta de navegación"]');
    expect(breadcrumb.text()).toContain('Inicio');
    expect(breadcrumb.text()).toContain('Trabajo');
    expect(breadcrumb.get('a[href="/"]').text()).toBe('Inicio');
    expect(breadcrumb.get('[aria-current="page"]').text()).toBe('Trabajo');
  });

  it('renders footer resources and version link', async () => {
    await router.push('/');
    await router.isReady();

    const wrapper = mountApp();

    expect(wrapper.get('footer .brand-logo--logo').attributes('aria-label')).toBe('Mikeroguez');
    expect(wrapper.get('a[href="/feed.xml"]').text()).toBe('RSS ES');
    expect(wrapper.get('a[href="/privacidad"]').text()).toBe('Privacidad');
    expect(wrapper.get('a[href="/aviso-de-cookies"]').text()).toBe('Cookies');
    expect(wrapper.get('a[href="/licencia"]').text()).toBe('Licencia');
    expect(wrapper.findAll('footer a').some((link) => link.text() === 'Changelog')).toBe(false);
    expect(wrapper.get('a[href="https://www.linkedin.com/in/mikeroguez/"]').text()).toBe(
      'LinkedIn',
    );
    expect(wrapper.get('a[href="https://www.instagram.com/mikeroguez"]').text()).toBe('Instagram');
    expect(wrapper.text()).toContain('© 2026 Mikeroguez.');
    const versionLink = wrapper
      .findAll('a[href*="CHANGELOG.md"]')
      .find((link) => link.text().startsWith('v'));
    expect(versionLink?.text()).toMatch(/^v\d+\.\d+\.\d+$/);
  });

  it('uses the English RSS feed when English is selected', async () => {
    setLocale('en');
    await router.push('/home');
    await router.isReady();

    const wrapper = mountApp();

    expect(wrapper.get('a[href="/feed-en.xml"]').text()).toBe('RSS EN');
    expect(wrapper.get('a[href="/privacy"]').text()).toBe('Privacy');
    expect(wrapper.get('a[href="/license"]').text()).toBe('License');
    expect(wrapper.text()).toContain('Privacy');
    expect(wrapper.text()).toContain('License');
  });
});
