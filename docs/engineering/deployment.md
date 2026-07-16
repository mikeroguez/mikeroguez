# Deployment

El despliegue usa GitHub Pages y GitHub Actions.

## Flujo

1. `npm ci`.
2. `npm run validate`.
3. `npm run build`.
4. Subir `.output/public` como artefacto de Pages.
5. Desplegar con acciones oficiales.

## Dominio

`public/CNAME` contiene `mikeroguez.me` y debe llegar a `.output/public/CNAME`.

## Generacion estatica

GitHub Pages no ofrece configuracion tipo `.htaccess`. El sitio usa Nuxt SSG
para generar HTML por ruta, de modo que crawlers y redes sociales puedan leer
titulos, descripciones, canonical y Open Graph sin ejecutar JavaScript.

## Pendiente

Los metadatos de SEO requieren revision editorial antes de considerarse
definitivos.
