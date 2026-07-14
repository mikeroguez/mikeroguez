# Architecture

El sitio es una SPA en Vue 3 con Vite y TypeScript.

## Estructura

- `src/main.ts`: inicializa Vue y Router.
- `src/router/`: rutas publicas y metadatos basicos.
- `src/layouts/`: estructura compartida.
- `src/components/`: componentes reutilizables.
- `src/views/`: paginas.
- `src/assets/styles/`: tokens, reset, base y utilidades.
- `tests/`: pruebas unitarias.
- `public/`: archivos copiados al build.

## Router

Vue Router usa history mode. GitHub Pages no reescribe rutas de SPA, por lo que
el build crea `dist/404.html` copiando `dist/index.html`.

## Estilos

CSS nativo con custom properties. No hay framework CSS ni fuentes externas.

## Pruebas

Vitest y Vue Test Utils cubren montaje, navegacion y elementos basicos de
accesibilidad.

## Contenido y Presentacion

El contenido verificable debe separarse de componentes visuales cuando el sitio
madure. La base actual solo contiene placeholders editoriales.

## Despliegue

GitHub Actions valida, compila `dist/`, sube el artefacto y despliega con GitHub
Pages.
