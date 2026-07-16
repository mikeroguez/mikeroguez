# 0006 — Nuxt SSG para SEO y social cards

**Fecha:** 2026-07-16
**Estado:** Implementado

---

## Contexto

El sitio se publicaba como SPA de Vue con Vite. GitHub Pages no permite reglas de servidor tipo
`.htaccess`, por lo que las rutas internas dependian de un fallback `404.html` y los metadatos de
SEO se ajustaban en cliente. Ese modelo no es suficiente para crawlers ni para previsualizaciones
sociales que leen el HTML inicial.

## Decisión

Migrar el sitio a Nuxt con generacion estatica (`nuxt generate`) y publicar `.output/public` en
GitHub Pages.

Cada ruta publica debe generar HTML propio con:

- `title` y `description`.
- `canonical`.
- Open Graph.
- Twitter card.
- enlace RSS.

Las rutas del blog publicadas se derivan de `src/content/posts/` durante el build. El indice de
investigacion se genera desde `src/content/publications/` antes de compilar Nuxt.

## Consecuencias

- GitHub Pages recibe archivos estaticos por ruta, sin depender de reescrituras de servidor.
- Las cards sociales pueden leer metadatos sin ejecutar JavaScript.
- El output publico cambia de `dist/` a `.output/public`.
- El typecheck se ejecuta con el comando oficial de Nuxt.
