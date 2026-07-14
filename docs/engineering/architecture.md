# Architecture

El sitio es una SPA en Vue 3 con Vite y TypeScript.

## Estructura

- `src/main.ts`: inicializa Vue y Router.
- `src/router/`: rutas publicas y metadatos basicos.
- `src/layouts/`: estructura compartida.
- `src/components/`: componentes reutilizables.
- `src/views/`: paginas.
- `src/assets/styles/`: tokens, reset, base y utilidades.
- `src/content/posts/`: entradas Markdown del blog.
- `src/content/generated/`: contenido del blog generado para la app.
- `tests/`: pruebas unitarias.
- `public/`: archivos copiados al build.

## Router

Vue Router usa history mode. GitHub Pages no reescribe rutas de SPA, por lo que
el build crea `dist/404.html` copiando `dist/index.html`.

El blog usa rutas `/blog` y `/blog/:slug`. Cada slug corresponde a un archivo
Markdown en `src/content/posts/`.

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
`src/content/generated/blog-posts.ts`. El mismo flujo genera `public/feed.xml`
y `public/sitemap.xml` para que el blog, RSS y sitemap salgan de la misma fuente.

## Contenido y Presentacion

El contenido verificable debe separarse de componentes visuales cuando el sitio
madure. La base actual solo contiene placeholders editoriales.

## Despliegue

GitHub Actions valida, compila `dist/`, sube el artefacto y despliega con GitHub
Pages.
