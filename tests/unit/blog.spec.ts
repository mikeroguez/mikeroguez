import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import { getPostBySlug, getPublishedPosts } from '@/content/blog';
import BlogIndexView from '@/views/BlogIndexView.vue';
import BlogPostView from '@/views/BlogPostView.vue';
import router from '@/router';

describe('blog content', () => {
  it('loads published markdown posts', () => {
    const posts = getPublishedPosts();

    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0]?.slug).toBe('contenido-en-preparacion');
    expect(posts[0]?.searchText).toContain('nota editorial');
    expect(posts[0]?.searchText).toContain('evidencia verificada');
  });

  it('renders markdown to html without allowing raw html by default', () => {
    const post = getPostBySlug('contenido-en-preparacion');

    expect(post?.html).toContain('<p>');
    expect(post?.meta.status).toBe('published');
    expect(post?.meta.image).toBeUndefined();
  });

  it('renders the blog index tools', async () => {
    await router.push('/blog');
    await router.isReady();

    const wrapper = mount(BlogIndexView, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.get('aside[aria-labelledby="blog-index-title"]').text()).toContain('Índice');
    expect(wrapper.find('input[type="search"]').exists()).toBe(true);
    expect(wrapper.get('a[href="/feed.xml"]').text()).toBe('RSS');
  });

  it('renders social sharing tools in a blog post', async () => {
    await router.push('/blog/contenido-en-preparacion');
    await router.isReady();

    const wrapper = mount(BlogPostView, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.get('#share-tools-title').text()).toBe('Compartir esta publicación');
    expect(wrapper.text()).toContain('Copiar enlace');
    expect(wrapper.get('a[href*="linkedin.com"]').attributes('href')).toContain(
      'https%3A%2F%2Fmikeroguez.me%2Fblog%2Fcontenido-en-preparacion',
    );
    expect(wrapper.get('a[href*="facebook.com"]').attributes('href')).toContain(
      'https%3A%2F%2Fmikeroguez.me%2Fblog%2Fcontenido-en-preparacion',
    );
  });
});
