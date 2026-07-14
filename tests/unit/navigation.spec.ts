import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import AppHeader from '@/components/AppHeader.vue';
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

    expect(wrapper.text()).toContain('Inicio');
    expect(wrapper.text()).toContain('Sobre mi');
    expect(wrapper.text()).toContain('Investigacion');
  });

  it('routes to work without hashes', async () => {
    await router.push('/work');
    expect(router.currentRoute.value.path).toBe('/work');
  });
});
