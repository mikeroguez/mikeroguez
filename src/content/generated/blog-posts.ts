import type { BlogPost } from '@/types/blog';

export const blogPosts = [
  {
    slug: 'contenido-en-preparacion',
    meta: {
      title: 'Contenido en preparacion',
      description: 'Entrada provisional para validar el flujo editorial del blog.',
      date: '2026-07-13',
      status: 'published',
    },
    html: '<p>Esta entrada valida el flujo tecnico del blog.</p>\n<p>El contenido definitivo se construira con evidencia verificada, revision de\nprivacidad y aprobacion humana antes de publicarse.</p>\n<p>No debe usarse este espacio para publicar borradores privados, datos sensibles o\nafirmaciones no verificadas.</p>\n',
    excerpt: 'Entrada provisional para validar el flujo editorial del blog.',
    searchText:
      'contenido en preparacion entrada provisional para validar el flujo editorial del blog 2026-07-13 esta entrada valida el flujo tecnico del blog el contenido definitivo se construira con evidencia verificada revision de privacidad y aprobacion humana antes de publicarse no debe usarse este espacio para publicar borradores privados datos sensibles o afirmaciones no verificadas',
  },
] satisfies BlogPost[];
