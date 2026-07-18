import { createRouter, createWebHistory } from 'vue-router';

import { setLocaleForRoute, t } from '@/i18n';
import { getPostBySlug } from '@/content/blog';
import { pathLocale } from '@/utils/routes';
import AboutView from '@/views/AboutView.vue';
import BlogIndexView from '@/views/BlogIndexView.vue';
import BlogPostView from '@/views/BlogPostView.vue';
import ContactView from '@/views/ContactView.vue';
import CookiesView from '@/views/CookiesView.vue';
import HomeView from '@/views/HomeView.vue';
import LicenseView from '@/views/LicenseView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import PrivacyView from '@/views/PrivacyView.vue';
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
    path: '/home',
    name: 'home-en',
    component: HomeView,
    meta: { titleKey: 'meta.homeTitle', descKey: 'meta.homeDesc' },
  },
  {
    path: '/sobre-mi',
    name: 'about',
    component: AboutView,
    meta: { titleKey: 'meta.aboutTitle', descKey: 'meta.aboutDesc' },
  },
  {
    path: '/about',
    name: 'about-en',
    component: AboutView,
    meta: { titleKey: 'meta.aboutTitle', descKey: 'meta.aboutDesc' },
  },
  {
    path: '/trabajo',
    name: 'work',
    component: WorkView,
    meta: { titleKey: 'meta.workTitle', descKey: 'meta.workDesc' },
  },
  {
    path: '/work',
    name: 'work-en',
    component: WorkView,
    meta: { titleKey: 'meta.workTitle', descKey: 'meta.workDesc' },
  },
  {
    path: '/investigacion',
    name: 'research',
    component: ResearchView,
    meta: { titleKey: 'meta.researchTitle', descKey: 'meta.researchDesc' },
  },
  {
    path: '/research',
    name: 'research-en',
    component: ResearchView,
    meta: { titleKey: 'meta.researchTitle', descKey: 'meta.researchDesc' },
  },
  {
    path: '/publicaciones',
    name: 'blog',
    component: BlogIndexView,
    meta: { titleKey: 'meta.blogTitle', descKey: 'meta.blogDesc' },
  },
  {
    path: '/blog',
    name: 'blog-en',
    component: BlogIndexView,
    props: { lang: 'en' },
    meta: { titleKey: 'meta.blogTitle', descKey: 'meta.blogDesc' },
  },
  {
    path: '/blog/:slug',
    name: 'blog-post',
    component: BlogPostView,
    meta: { titleKey: 'meta.blogPostTitle', descKey: 'meta.blogPostDesc' },
  },
  {
    path: '/contacto',
    name: 'contact',
    component: ContactView,
    meta: { titleKey: 'meta.contactTitle', descKey: 'meta.contactDesc' },
  },
  {
    path: '/contact',
    name: 'contact-en',
    component: ContactView,
    meta: { titleKey: 'meta.contactTitle', descKey: 'meta.contactDesc' },
  },
  {
    path: '/privacidad',
    name: 'privacy',
    component: PrivacyView,
    meta: { titleKey: 'meta.privacyTitle', descKey: 'meta.privacyDesc' },
  },
  {
    path: '/privacy',
    name: 'privacy-en',
    component: PrivacyView,
    meta: { titleKey: 'meta.privacyTitle', descKey: 'meta.privacyDesc' },
  },
  {
    path: '/aviso-de-cookies',
    name: 'cookies',
    component: CookiesView,
    meta: { titleKey: 'meta.cookiesTitle', descKey: 'meta.cookiesDesc' },
  },
  {
    path: '/cookies',
    name: 'cookies-en',
    component: CookiesView,
    meta: { titleKey: 'meta.cookiesTitle', descKey: 'meta.cookiesDesc' },
  },
  {
    path: '/licencia',
    name: 'license',
    component: LicenseView,
    meta: { titleKey: 'meta.licenseTitle', descKey: 'meta.licenseDesc' },
  },
  {
    path: '/license',
    name: 'license-en',
    component: LicenseView,
    meta: { titleKey: 'meta.licenseTitle', descKey: 'meta.licenseDesc' },
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

router.beforeEach((to) => {
  const routeLocale = pathLocale(to.path);
  if (routeLocale) setLocaleForRoute(routeLocale);

  const blogPostSlug = to.path.match(/^\/blog\/([^/]+)\/?$/)?.[1];
  const post = blogPostSlug ? getPostBySlug(blogPostSlug) : undefined;
  if (post) setLocaleForRoute(post.meta.lang);
});

router.afterEach((to) => {
  const titleKey = typeof to.meta.titleKey === 'string' ? to.meta.titleKey : 'meta.homeTitle';
  const descKey = typeof to.meta.descKey === 'string' ? to.meta.descKey : 'meta.homeDesc';
  document.title = t(titleKey);
  document.querySelector('meta[name="description"]')?.setAttribute('content', t(descKey));
});

export default router;
