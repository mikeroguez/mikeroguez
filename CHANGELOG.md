# Changelog

Todos los cambios relevantes de este sitio se documentan aqui.

El formato sigue la intencion de Conventional Commits y mantiene una version
publica vinculada al footer del sitio.

## 0.2.4 - 2026-07-18

### Added

- Licencia MIT para el codigo fuente con obligacion de conservar aviso de
  copyright y licencia.
- Tesis de maestria de El Encanto destacada al inicio de la seccion de
  publicaciones en investigacion, con enlace al PDF y cita.

### Changed

- README del perfil publico reescrito para reflejar identidad, enfoque,
  enlaces principales y reglas de licencia sin convertirlo en documentacion
  tecnica.
- Pagina publica de licencia y documentacion interna actualizadas para distinguir
  codigo bajo MIT, contenido escrito bajo CC BY 4.0 y assets/marca con reglas
  separadas.

## 0.2.3 - 2026-07-18

### Added

- Rutas explicitas por idioma con slugs traducidos para paginas principales,
  legales e indice del blog, sin prefijo `/en`.
- RSS en ingles con URLs localizadas y sitemap con rutas bilingues.
- Inventario inicial de assets publicos y documento de pendientes de madurez
  legal, editorial, marca y accesibilidad.
- Atribucion sugerida y enlace oficial a CC BY 4.0 en la pagina de licencia.

### Changed

- Navegacion, footer, breadcrumbs, enlaces del blog y metadata SEO respetan el
  idioma activo y publican alternates `hreflang`.
- Home, README y descripciones de proyectos usan lenguaje mas sobrio y alineado
  con evidencia aprobada.
- Investigacion distingue preprints en la interfaz y agrega nota editorial sobre
  tipos de publicacion.
- Avisos de privacidad y cookies detallan proveedor, contacto y conservacion de
  preferencias con mayor claridad.

### Fixed

- Mejoras de accesibilidad en el dialogo de cookies, dialogo de citas y etiquetas
  del blog.

## 0.2.2 - 2026-07-18

### Added

- Consentimiento de cookies con Google Consent Mode para mantener Google
  Analytics denegado por defecto y activarlo solo cuando la persona permite
  analitica.
- Control en el footer para reabrir las preferencias de cookies.
- Paginas publicas de privacidad, cookies y licencia/reutilizacion enlazadas
  desde el footer.
- Pruebas unitarias para verificar consentimiento, carga condicional de Google
  Analytics e idioma del aviso de cookies.

### Changed

- El aviso de cookies usa el idioma seleccionado o, en primera visita, el idioma
  detectado del navegador.
- El contenido publico escrito queda orientado a reutilizacion con atribucion
  bajo CC BY 4.0, mientras marca, codigo, fotografias y documentos mantienen
  reglas separadas.

## 0.2.1 - 2026-07-17

### Added

- Fichas ampliadas de proyectos seleccionados con logos y enlaces publicos para
  EvPraxis 2.0 y REDI.
- Tesis de maestria de El Encanto como publicacion enlazada desde la seccion de
  investigacion.
- Seccion de comunidad academica en investigacion con participacion en AMexIHC,
  LAIHC, MexIHC y CLIHC.

### Changed

- Las descripciones de EvPraxis, REDI y El Encanto incorporan roles y contexto
  verificados desde evidencia aprobada.

## 0.2.0 - 2026-07-16

### Added

- Entradas bilingues del blog sobre analitica de aprendizaje e inteligencia
  artificial, con etiquetas, tiempo de lectura, metadatos de articulo y
  publicaciones relacionadas.
- Catalogo ampliado de publicaciones de investigacion con citas copiables y
  filtrado por tipo.
- Generacion local mas completa para contenido de blog e investigacion, con
  observadores en desarrollo y exclusion de entradas en revision durante build
  publico.

### Changed

- Las rutas del blog usan slugs unicos en `/blog/{slug}` para ambos idiomas y el
  selector de idioma cambia a la traduccion correspondiente cuando existe.
- El indice del blog incorpora filtros por etiqueta y mantiene RSS, sitemap y
  contenido generado sincronizados.

### Fixed

- Los skills locales de Codex declaran frontmatter YAML valido para volver a
  cargarse correctamente.

## 0.1.2 - 2026-07-16

### Changed

- La imagen social generica usa el logotipo de marca como imagen default en
  lugar de la fotografia de perfil.

## 0.1.1 - 2026-07-16

### Added

- Migracion del sitio a Nuxt con generacion estatica para GitHub Pages.
- Metadatos SEO por ruta con canonical, Open Graph y Twitter Cards.
- Imagen social generica para previsualizaciones compartidas.
- Soporte para imagen opcional e idioma por entrada del blog.

### Changed

- El deploy publica `.output/public` en lugar de `dist/`.
- El hero de inicio comunica de forma mas directa el trabajo en tecnologia
  educativa centrada en las personas.

## 0.1.0 - 2026-07-14

### Added

- Base de sitio personal con Vue 3, Vite y TypeScript.
- Sistema inicial de marca con logotipo e isotipo como mascaras SVG.
- Blog basado en archivos Markdown.
- Generacion de contenido del blog, RSS y sitemap durante build.
- Herramientas de compartir en publicaciones.
- Documentacion editorial, tecnica y de seguridad publica.

### Notes

- La identidad visual definitiva sigue pendiente de revision humana.
- Los enlaces a redes sociales se agregaran solo cuando existan URLs publicas
  verificadas.
