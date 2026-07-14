import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import App from '@/App.vue';
import router from '@/router';

describe('App', () => {
  it('mounts with the main layout', async () => {
    router.push('/');
    await router.isReady();

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find('main#main-content').exists()).toBe(true);
    expect(wrapper.text()).toContain('Mikeroguez');
  });

  it('includes a skip link to the main content', async () => {
    router.push('/');
    await router.isReady();

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    const skipLink = wrapper.get('a.skip-link');
    expect(skipLink.attributes('href')).toBe('#main-content');
    expect(skipLink.text()).toBe('Saltar al contenido');
  });
});
