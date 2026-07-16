import { createRouter, createWebHistory } from 'vue-router';

import { t } from '@/i18n';
import AboutView from '@/views/AboutView.vue';
import BlogIndexView from '@/views/BlogIndexView.vue';
import BlogPostView from '@/views/BlogPostView.vue';
import ContactView from '@/views/ContactView.vue';
import HomeView from '@/views/HomeView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import ResearchView from '@/views/ResearchView.vue';
import WorkView from '@/views/WorkView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { titleKey: 'meta.homeTitle', descKey: 'meta.homeDesc' },
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: { titleKey: 'meta.aboutTitle', descKey: 'meta.aboutDesc' },
  },
  {
    path: '/work',
    name: 'work',
    component: WorkView,
    meta: { titleKey: 'meta.workTitle', descKey: 'meta.workDesc' },
  },
  {
    path: '/research',
    name: 'research',
    component: ResearchView,
    meta: { titleKey: 'meta.researchTitle', descKey: 'meta.researchDesc' },
  },
  {
    path: '/blog',
    name: 'blog',
    component: BlogIndexView,
    meta: { titleKey: 'meta.blogTitle', descKey: 'meta.blogDesc' },
  },
  {
    path: '/blog/:slug',
    name: 'blog-post',
    component: BlogPostView,
    meta: { titleKey: 'meta.blogPostTitle', descKey: 'meta.blogPostDesc' },
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
    meta: { titleKey: 'meta.contactTitle', descKey: 'meta.contactDesc' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: { titleKey: 'meta.notFoundTitle', descKey: 'meta.notFoundDesc' },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.afterEach((to) => {
  const titleKey = typeof to.meta.titleKey === 'string' ? to.meta.titleKey : 'meta.homeTitle';
  const descKey = typeof to.meta.descKey === 'string' ? to.meta.descKey : 'meta.homeDesc';
  document.title = t(titleKey);
  document.querySelector('meta[name="description"]')?.setAttribute('content', t(descKey));
});

export default router;
