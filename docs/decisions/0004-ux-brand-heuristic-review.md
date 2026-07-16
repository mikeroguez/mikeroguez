# 0004 — Revisión UX, Identidad y Heurísticas de Nielsen

**Fecha:** 2026-07-14
**Estado:** Implementado
**Agentes consultados:** brand-director, ux-architect, visual-ui-designer

---

## Contexto

Se realizó una revisión integral del sitio cubriendo identidad de marca, diseño visual, UX y UI, evaluada contra las 10 heurísticas de Nielsen. Los agentes brand-director y ux-architect realizaron revisiones independientes y sus hallazgos fueron sintetizados para priorizar implementación.

---

## Hallazgos y decisiones

### H1 — Visibilidad del estado del sistema

**Problema A: Estado activo del nav indistinguible del hover (Severidad 3 — Mayor)**

`.nav-link.router-link-active` usaba los mismos estilos que `.nav-link:hover` (fondo tintado + color de marca). El usuario no podía distinguir en cuál página se encontraba.

Adicionalmente, `router-link-active` en el enlace `to="/"` activa la clase en **todas** las rutas (no solo en `/`), ya que Vue Router 4 trata la raíz como prefijo de todas las rutas.

**Decisión:** Separar las reglas CSS. Hover conserva el fondo tintado (`--color-hover`) como feedback temporal. Active (`router-link-exact-active`) usa `font-weight: 700` como indicador permanente de "estás aquí", sin fondo, para no confundirse con hover. Se cambió de `router-link-active` a `router-link-exact-active` para toda la navegación.

**Por qué este patrón:** La distinción hover/active es fundamental en sitios editoriales donde el usuario escanea para orientarse. El peso tipográfico es el indicador más sobrio y consistente con la dirección de marca. El fondo como hover-only sigue siendo suficientemente perceptible para feedback inmediato.

---

**Problema B: Filtro de año en blog sin estado activo visual (Severidad 3 — Mayor)**

Los botones de año en el sidebar del blog no indicaban cuál estaba activo. El filtro funcionaba escribiendo directamente en el campo de búsqueda (`query.value = year`), pero sin retroalimentación visual en el botón.

**Decisión:**

- Añadir `:aria-pressed="query === year.year"` a cada botón de año.
- Cuando hay un filtro activo, mostrar un botón "Ver todas ×" al inicio de la lista de años.
- En el estado vacío de resultados, añadir botón "Limpiar búsqueda" con la función `clearSearch`.

**Por qué no refactorizar a `selectedYear` separado:** El modelo actual (año como texto en `query`) permite búsquedas unificadas (escribir "2025" en el campo y hacer clic en el año tienen el mismo resultado). Refactorizar el estado añadiría complejidad sin beneficio perceptible para el usuario en esta etapa. La solución con `aria-pressed` es suficiente para comunicar estado y es reversible.

---

### H2 — Correspondencia con el mundo real

**Problema: Eyebrow = H1 en WorkView y ContactView (Severidad 2 — Menor)**

- WorkView: eyebrow "Trabajo y proyectos" + h1 "Trabajo y proyectos" — idénticos.
- ContactView: eyebrow "Contacto" + h1 "Contacto" — idénticos.

El eyebrow existe para dar contexto categórico; el h1 nombra la página. Repetir el mismo texto elimina el valor del sistema tipográfico y crea ruido visual.

**Decisión:**

- WorkView: eyebrow → "Proyectos". H1 conserva "Trabajo y proyectos".
- ContactView: eyebrow → "Perfil". H1 conserva "Contacto".

**Por qué estos valores:** "Proyectos" es la categoría padre del trabajo listado (portfolio). "Perfil" contextualiza que la página es sobre la presencia pública/canales del autor, complementando el h1 "Contacto".

---

**Problema: Acentos faltantes en copy visible (Severidad 2 — Menor)**

Una identidad rigurosa no puede tener errores ortográficos en el texto visible al usuario.

Correcciones aplicadas:

| Archivo             | Original                            | Corregido     |
| ------------------- | ----------------------------------- | ------------- |
| `BlogIndexView.vue` | `titulo` (placeholder)              | `título`      |
| `BlogIndexView.vue` | `Contenido en preparacion.`         | `preparación` |
| `BlogIndexView.vue` | `coincidan con la busqueda`         | `búsqueda`    |
| `BlogIndexView.vue` | `Mostrar 6 mas`                     | `más`         |
| `BlogPostView.vue`  | `<eyebrow>Publicacion</eyebrow>`    | `Publicación` |
| `BlogPostView.vue`  | `Publicacion lista para compartir.` | `Publicación` |

---

### H3 — Control y libertad del usuario

**Problema: Sin mecanismo de reset para filtro de año (Severidad 3 — Mayor)**

El único modo de deshacer un filtro activo era borrar manualmente el texto del campo de búsqueda. No había botón ni CTA de reset.

**Decisión:** Ver solución en H1-B arriba (botón "Ver todas ×" en sidebar + "Limpiar búsqueda" en empty state). Las dos rutas de reset responden a dos contextos distintos: el usuario que usó el sidebar y el usuario que busca y no encuentra.

---

### H4 — Consistencia y estándares

**Problema: Cuatro valores alpha hardcodeados sin tokens (Severidad 1 — Cosmético)**

`rgb(32 41 77 / 0.18)`, `rgb(32 41 77 / 0.22)`, `rgb(32 41 77 / 0.25)`, `rgb(32 41 77 / 0.28)` aparecían en `base.css` sin correspondencia en el sistema de tokens. Si el azul de marca cambia, estos valores quedan desfasados.

**Decisión:** Añadir a `tokens.css`:

```css
--color-brand-alpha-18: rgb(32 41 77 / 0.18);
--color-brand-alpha-22: rgb(32 41 77 / 0.22);
--color-brand-alpha-25: rgb(32 41 77 / 0.25);
--color-brand-alpha-28: rgb(32 41 77 / 0.28);
```

Reemplazar los valores hardcodeados en `base.css` con las variables correspondientes.

---

## Archivos modificados

| Archivo                        | Cambio                                                            |
| ------------------------------ | ----------------------------------------------------------------- |
| `src/assets/styles/tokens.css` | +4 tokens alpha de color de marca                                 |
| `src/assets/styles/base.css`   | Nav active/hover separados; 4 valores alpha tokenizados           |
| `src/views/WorkView.vue`       | Eyebrow "Trabajo y proyectos" → "Proyectos"                       |
| `src/views/ContactView.vue`    | Eyebrow "Contacto" → "Perfil"                                     |
| `src/views/BlogIndexView.vue`  | 4 acentos; aria-pressed en años; clearSearch; empty state con CTA |
| `src/views/BlogPostView.vue`   | 2 acentos en "Publicación"                                        |

---

## Decisiones aplazadas

- **Texto vacío del blog:** El post provisional con status `draft` ya es filtrado por `getPublishedPosts()`. Verificar que el filtro funcione correctamente en producción antes del primer deploy público.
- **Icono en botón de menú móvil:** El brand-director señaló que añadir un ícono hamburger mejoraría la affordance. Aplazado hasta tener un sistema de iconografía definido. El texto "Menú" es funcional y accesible.
- **ContactView h1:** La heurística H2 identifica "Perfil" + "Contacto" como mejora pero no bloqueo crítico. Revisable cuando haya contenido confirmado para esa página.
- **Reset de filtro de año con toggle:** Si el usuario hace clic dos veces en el mismo año, actualmente no hace toggle (aplica el mismo filtro). Aplazado por complejidad mínima del contenido actual.

---

## Heurísticas sin hallazgos significativos

H5 (prevención de errores), H6 (reconocimiento vs. recuerdo), H7 (flexibilidad), H8 (estética minimalista), H10 (documentación) — el skip-link, aria-labels, breadcrumb automático y estructura editorial están bien implementados y alineados con la dirección de marca.
