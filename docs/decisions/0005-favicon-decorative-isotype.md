# 0005 — Favicon e isotipo decorativo

**Fecha:** 2026-07-15
**Estado:** Implementado
**Agentes consultados:** visual-ui-designer, brand-director

---

## Contexto

La fuente de marca (`Mikeroguez.svg`) es un SVG de arte pixelado: cada carácter se compone de
cientos de paths en forma de diamante de medio píxel (p. ej. `M66,12.5 L65.5,12 L66,11.5`).
El archivo optimizado original pesa 217 KB — inviable para incrustar inline en un `<link>` de
favicon. El `index.html` no tenía ningún favicon configurado.

Adicionalmente, se evaluó si el isotipo es útil como elemento decorativo en el sitio.

---

## Decisión 1 — Favicon SVG

### Estrategia de generación

Se extiende `scripts/optimize-brand-logo.mjs` con una segunda pasada de optimización SVGO usando
`floatPrecision: 0`. Esta configuración redondea todas las coordenadas a enteros, lo que colapsa
los paths sub-pixel (diamantes de medio píxel que se vuelven degenerados y son eliminados por
`mergePaths`). El resultado:

| Archivo                            | Tamaño |
| ---------------------------------- | ------ |
| `Mikeroguez.svg` (fuente original) | 526 KB |
| `mikeroguez-isotype-mask.svg`      | 217 KB |
| `public/favicon.svg` (generado)    | 120 KB |

El favicon resultante contiene 23 paths (frente a cientos en la fuente), suficientes para
representar el isotipo con fidelidad en cualquier tamaño moderno.

### Estructura del favicon

```svg
<svg overflow="hidden" aria-hidden="true" xmlns="..." viewBox="0 0 145 189">
  <rect width="145" height="189" fill="#eee8dc"/>  <!-- Fondo papel -->
  <path fill="#20294d" fill-opacity=".04" .../>     <!-- Paths originales con color de marca -->
  ...
</svg>
```

A diferencia de la máscara (paths en `#000` para CSS `mask`), el favicon usa los colores
originales del SVG fuente (`fill="#20294d"`, con sus fill-opacities). La superposición de
paths semi-transparentes produce el isotipo correctamente sobre el fondo papel.

### Por qué SVG y no PNG o ICO

- SVG es el estándar moderno de favicon (Chrome, Firefox, Safari 17+).
- Escala perfectamente a cualquier resolución (no hay artefactos en pantallas HiDPI).
- Se sirve una sola vez y queda en caché del navegador.
- 120 KB gzippeados quedan ~35 KB sobre el cable.

**Limitación:** Safari < 17 ignora `type="image/svg+xml"` en el favicon. No se añade fallback
PNG/ICO en esta versión porque el sitio no tiene herramienta de rasterizado en el pipeline.
Revisable cuando se añada procesamiento de imágenes.

### Enlace en index.html

```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
```

---

## Decisión 2 — Isotipo como elemento decorativo

### Criterio de evaluación

El isotipo es un signo de identidad. Su uso decorativo es válido solo si:

1. No compite visualmente con el contenido.
2. Refuerza la presencia de marca en un punto donde el usuario necesita orientación.
3. Su opacidad lo clasifica como textura, no como gráfico.

### Implementación

**Casa del isotipo en el header del hero (HomeView)**

El isotipo se coloca en la columna izquierda del `.page-hero` (eyebrow + h1), posicionado
absolutamente en la esquina inferior derecha, detrás del texto. Opacidad: 6.5%.

- Propósito: anclar la identidad de marca en la sección más visible del sitio.
- Riesgo verificado: `overflow: hidden` en `.page-hero__title` impide que sobresalga del grid.
- No interfiere con lectura ni interacción (`pointer-events: none`, `user-select: none`).

**Página 404 (NotFoundView)**

El isotipo se posiciona a la derecha del artículo, centrado verticalmente, parcialmente
recortado por el borde. Opacidad: 5.5%.

- Propósito: la página 404 sin marca parece un error genérico. El isotipo la hace pertenecer
  al sitio, reduce fricción y acompaña al usuario en un estado de falla.
- Recorte deliberado: la marca parcialmente visible refuerza continuidad sin protagonismo.

### CSS implementado

```css
/* Tamaño libre para contextos decorativos */
.brand-logo--bg {
  color: var(--color-brand);
}

/* Hero de inicio */
.page-hero__title {
  position: relative;
  overflow: hidden;
}
.page-hero__mark {
  position: absolute;
  right: -1rem;
  bottom: -1.5rem;
  width: 9rem;
  opacity: 0.065;
  pointer-events: none;
  user-select: none;
}

/* 404 */
.page--404 {
  position: relative;
  overflow: hidden;
}
.page-404__bg {
  position: absolute;
  top: 50%;
  right: -3rem;
  transform: translateY(-50%);
  width: 16rem;
  opacity: 0.055;
  pointer-events: none;
  user-select: none;
}
```

### Páginas evaluadas y descartadas

- **ResearchView, WorkView, BlogIndexView:** el isotipo decorativo no añadiría orientación y
  podría interferir con listados densos de contenido.
- **BlogPostView:** el artículo de blog requiere máxima legibilidad; cualquier elemento de
  fondo distrae.
- **ContactView, AboutView:** páginas breves sin espacio visual suficiente para justificarlo.

---

## Archivos modificados

| Archivo                           | Cambio                                                         |
| --------------------------------- | -------------------------------------------------------------- |
| `scripts/optimize-brand-logo.mjs` | +favicon generation con `floatPrecision: 0`                    |
| `public/favicon.svg`              | Generado por el script                                         |
| `index.html`                      | `<link rel="icon" href="/favicon.svg" type="image/svg+xml" />` |
| `src/components/BrandLogo.vue`    | Añadido `'bg'` al tipo de `size`                               |
| `src/assets/styles/base.css`      | `.brand-logo--bg`, `.page-hero__title/mark`, `.page--404/bg`   |
| `src/views/HomeView.vue`          | Isotipo decorativo en `.page-hero__title`                      |
| `src/views/NotFoundView.vue`      | Isotipo decorativo + acentos: "Página", "todavía"              |
