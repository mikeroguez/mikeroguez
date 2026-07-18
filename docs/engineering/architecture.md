# Architecture

El sitio es una aplicacion Nuxt con Vue 3, TypeScript y generacion estatica para
GitHub Pages.

## Estructura

- `nuxt.config.ts`: configuracion de Nuxt, prerender y metadatos base.
- `src/app.vue`: shell raiz de Nuxt.
- `src/pages/`: rutas publicas prerenderizadas.
- `src/layouts/`: estructura compartida.
- `src/components/`: componentes reutilizables.
- `src/views/`: paginas.
- `src/assets/styles/`: tokens, reset, base y utilidades.
- `src/content/posts/`: entradas Markdown del blog.
- `src/content/generated/`: contenido del blog generado para la app.
- `tests/`: pruebas unitarias.
- `public/`: archivos copiados al build.

## Rutas y SEO

Nuxt genera HTML estatico por ruta con `nuxt generate`. Esto evita depender de
reescrituras de servidor o de metadatos inyectados solo en cliente.

El blog usa rutas `/blog` y `/blog/:slug`. Cada slug corresponde a un archivo
Markdown en `src/content/posts/`.

Los metadatos SEO, canonical, Open Graph, Twitter card y RSS se definen desde
`src/utils/seo.ts` y se aplican en `src/pages/`.

El indice `/blog` tiene busqueda local, filtros por año y carga incremental en
cliente.

## Estilos

CSS nativo con custom properties. No hay framework CSS ni fuentes externas.
La decision se registra en `docs/decisions/0002-css-identity-foundation.md`.

## Pruebas

Vitest y Vue Test Utils cubren montaje, navegacion y elementos basicos de
accesibilidad.

El contenido Markdown se procesa con `scripts/generate-blog-content.mjs`, se
renderiza con `markdown-it` durante build y no permite HTML crudo por defecto.
El navegador recibe contenido ya generado en
`src/content/generated/blog-posts.ts`. El mismo flujo genera `public/feed.xml`,
`public/feed-en.xml` y `public/sitemap.xml` para que el blog, RSS y sitemap
salgan de la misma fuente.

Las rutas publicas principales usan slugs traducidos: por ejemplo `/sobre-mi`
en espanol y `/about` en ingles, `/investigacion` en espanol y `/research` en
ingles. El indice del blog usa `/publicaciones` en espanol y `/blog` en ingles.
Los posts usan `/blog/{slug}` en ambos idiomas porque cada slug identifica el
idioma del contenido. El SEO publica alternates `hreflang` entre variantes
cuando aplica.

## Contenido y Presentacion

El contenido verificable debe separarse de componentes visuales cuando el sitio
madure. La base actual solo contiene placeholders editoriales.

## Despliegue

GitHub Actions valida, genera `.output/public`, sube el artefacto y despliega con
GitHub Pages.
