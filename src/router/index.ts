import { createRouter, createWebHistory } from 'vue-router';

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
    meta: {
      title: 'Mikeroguez',
      description:
        'Sitio personal de Mikeroguez. Investigación, educación, diseño y desarrollo de software.',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      title: 'Sobre mi | Mikeroguez',
      description: 'Pagina provisional sobre Mikeroguez, pendiente de evidencia verificada.',
    },
  },
  {
    path: '/work',
    name: 'work',
    component: WorkView,
    meta: {
      title: 'Trabajo y proyectos | Mikeroguez',
      description: 'Trabajo y proyectos de Mikeroguez, en preparacion editorial.',
    },
  },
  {
    path: '/research',
    name: 'research',
    component: ResearchView,
    meta: {
      title: 'Investigacion | Mikeroguez',
      description: 'Investigacion y publicaciones de Mikeroguez, pendientes de verificacion.',
    },
  },
  {
    path: '/blog',
    name: 'blog',
    component: BlogIndexView,
    meta: {
      title: 'Publicaciones | Mikeroguez',
      description: 'Publicaciones, notas y ensayos de Mikeroguez.',
    },
  },
  {
    path: '/blog/:slug',
    name: 'blog-post',
    component: BlogPostView,
    meta: {
      title: 'Publicacion | Mikeroguez',
      description: 'Publicacion del blog de Mikeroguez.',
    },
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
    meta: {
      title: 'Contacto | Mikeroguez',
      description: 'Opciones de contacto de Mikeroguez, pendientes de aprobacion publica.',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: {
      title: 'Pagina no encontrada | Mikeroguez',
      description: 'Ruta no encontrada en el sitio personal de Mikeroguez.',
    },
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
  const title = typeof to.meta.title === 'string' ? to.meta.title : 'Mikeroguez';
  const description =
    typeof to.meta.description === 'string'
      ? to.meta.description
      : 'Sitio personal de Mikeroguez. Investigacion, educacion, diseno y desarrollo de software.';

  document.title = title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', description);
});

export default router;
