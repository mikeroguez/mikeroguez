import type { BlogPost } from '@/types/blog';

export const blogPosts = [
  {
    slug: 'contenido-en-preparacion',
    meta: {
      title: 'Contenido en preparación',
      description: 'Nota editorial sobre el estado inicial del blog.',
      date: '2026-07-13',
      status: 'published',
      lang: 'es',
      translationKey: 'contenido-en-preparacion',
    },
    html: '<p>Este espacio inicia con una nota editorial breve.</p>\n<p>Las próximas entradas se construirán con evidencia verificada, revisión de\nprivacidad y aprobación humana antes de publicarse.</p>\n<p>El blog no debe usarse para publicar borradores privados, datos sensibles ni\nafirmaciones sin contexto suficiente.</p>\n',
    excerpt: 'Nota editorial sobre el estado inicial del blog.',
    searchText:
      'contenido en preparacion nota editorial sobre el estado inicial del blog 2026-07-13 este espacio inicia con una nota editorial breve las proximas entradas se construiran con evidencia verificada revision de privacidad y aprobacion humana antes de publicarse el blog no debe usarse para publicar borradores privados datos sensibles ni afirmaciones sin contexto suficiente',
  },
] satisfies BlogPost[];
