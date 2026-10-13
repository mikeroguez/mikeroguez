import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import { getPostBySlug, getPostPath, getPublishedPosts, getSeriesPosts } from '@/content/blog';
import { setLocale } from '@/i18n';
import BlogIndexView from '@/views/BlogIndexView.vue';
import BlogPostView from '@/views/BlogPostView.vue';
import router from '@/router';

describe('blog content', () => {
  it('loads published markdown posts', () => {
    const posts = getPublishedPosts();
    const reviewPost = posts.find(
      (post) => post.slug === 'analitica-aprendizaje-inteligencia-artificial',
    );

    expect(posts.length).toBeGreaterThan(0);
    expect(reviewPost?.searchText).toContain('analitica de aprendizaje');
    expect(reviewPost?.searchText).toContain('inteligencia artificial');
  });

  it('renders markdown to html without allowing raw html by default', () => {
    const post = getPostBySlug('analitica-aprendizaje-inteligencia-artificial');

    expect(post?.html).toContain('<p>');
    expect(post?.html).toContain('<figure>');
    expect(post?.html).toContain('<figcaption>Síntesis visual');
    expect(post?.meta.status).toBe('published');
    expect(post?.meta.image).toBeUndefined();
  });

  it('uses language-specific paths for translated posts', () => {
    const spanishPost = getPostBySlug('analitica-aprendizaje-inteligencia-artificial');
    const englishPost = getPostBySlug('what-is-learning-analytics-ai');

    expect(spanishPost ? getPostPath(spanishPost) : undefined).toBe(
      '/blog/analitica-aprendizaje-inteligencia-artificial',
    );
    expect(englishPost ? getPostPath(englishPost) : undefined).toBe(
      '/blog/what-is-learning-analytics-ai',
    );
  });

  it('orders related posts in an editorial series', () => {
    const post = getPostBySlug('disenar-videojuegos-motivacion-jugador');

    expect(post ? getSeriesPosts(post).map((seriesPost) => seriesPost.slug) : []).toEqual([
      'disenar-videojuegos-motivacion-jugador',
      'primer-minuto-videojuego-gap-play',
    ]);
  });

  it('keeps published posts visible while running in development mode', () => {
    const post = getPostBySlug('analitica-aprendizaje-inteligencia-artificial');

    expect(import.meta.env.MODE).not.toBe('production');
    expect(post?.meta.status).toBe('published');
  });

  it('renders the blog index tools', async () => {
    setLocale('es');
    await router.push('/publicaciones');
    await router.isReady();

    const wrapper = mount(BlogIndexView, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.get('aside[aria-labelledby="blog-index-title"]').text()).toContain('Índice');
    expect(wrapper.find('input[type="search"]').exists()).toBe(true);
    expect(wrapper.get('a[href="/feed.xml"]').text()).toBe('RSS');
    expect(wrapper.get('[role="group"][aria-label="Explorar por tema"]').text()).toContain(
      'Diseño de videojuegos',
    );

    const gameDesignFilter = wrapper
      .get('[role="group"][aria-label="Explorar por tema"]')
      .findAll('button')
      .find((button) => button.text().includes('Diseño de videojuegos'));

    expect(gameDesignFilter).toBeDefined();
    await gameDesignFilter!.trigger('click');

    expect(wrapper.text()).toContain('Diseñar videojuegos desde la motivación del jugador');
    expect(wrapper.text()).not.toContain('Qué es la analítica de aprendizaje');
  });

  it('renders English posts on the English blog index', async () => {
    setLocale('en');
    await router.push('/blog');
    await router.isReady();

    const wrapper = mount(BlogIndexView, {
      global: {
        plugins: [router],
      },
    });

    expect(router.currentRoute.value.path).toBe('/blog');
    expect(wrapper.text()).toContain('What is learning analytics');
    expect(wrapper.text()).not.toContain('Qué es la analítica de aprendizaje');
    expect(wrapper.get('a[href="/feed-en.xml"]').text()).toBe('RSS');
  });

  it('renders social sharing tools in a blog post', async () => {
    await router.push('/blog/analitica-aprendizaje-inteligencia-artificial');
    await router.isReady();

    const wrapper = mount(BlogPostView, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.get('#share-tools-title').text()).toBe('Compartir esta publicación');
    expect(wrapper.text()).toContain('Copiar enlace');
    expect(wrapper.get('a[href*="linkedin.com"]').attributes('href')).toContain(
      'https%3A%2F%2Fmikeroguez.me%2Fblog%2Fanalitica-aprendizaje-inteligencia-artificial',
    );
    expect(wrapper.get('a[href*="facebook.com"]').attributes('href')).toContain(
      'https%3A%2F%2Fmikeroguez.me%2Fblog%2Fanalitica-aprendizaje-inteligencia-artificial',
    );
  });

  it('renders a readable series path for a post', async () => {
    setLocale('es');
    await router.push('/blog/primer-minuto-videojuego-gap-play');
    await router.isReady();

    const wrapper = mount(BlogPostView, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.get('#series-posts-title').text()).toBe('En esta serie');
    expect(wrapper.get('[aria-current="page"]').text()).toContain('El primer minuto importa');
    expect(
      wrapper
        .get('.post-series__list')
        .get('a[href="/blog/disenar-videojuegos-motivacion-jugador"]')
        .text(),
    ).toContain('Diseñar videojuegos');
  });

  it('shows a verified preview when a reader focuses a known external resource', async () => {
    setLocale('es');
    await router.push('/blog/predecir-no-es-intervenir-validar-indicadores-academicos');
    await router.isReady();

    const wrapper = mount(BlogPostView, {
      global: {
        plugins: [router],
      },
    });
    const paperLink = wrapper.get('a[href="https://doi.org/10.3390/app16199865"]');

    await paperLink.trigger('focusin');

    expect(wrapper.get('#link-preview').text()).toContain('Recurso externo verificado');
    expect(wrapper.get('#link-preview').text()).toContain('Applied Sciences · 2026');
    expect(paperLink.attributes('aria-describedby')).toBe('link-preview');
  });
});
