# Deployment

El despliegue usa GitHub Pages y GitHub Actions.

## Flujo

1. `npm ci`.
2. `npm run validate`.
3. `npm run build`.
4. Subir `dist/` como artefacto de Pages.
5. Desplegar con acciones oficiales.

## Dominio

`public/CNAME` contiene `mikeroguez.me` y debe llegar a `dist/CNAME`.

## SPA Fallback

GitHub Pages no ofrece reescritura de servidor para rutas de SPA. El script
`scripts/create-pages-fallback.mjs` copia `dist/index.html` a `dist/404.html`.
Esto permite navegar directamente a rutas como `/about` sin usar `#`.

## Pendiente

Los metadatos de SEO requieren revision editorial antes de considerarse
definitivos.
