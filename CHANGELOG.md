# Changelog

Todos los cambios relevantes de este sitio se documentan aqui.

El formato sigue la intencion de Conventional Commits y mantiene una version
publica vinculada al footer del sitio.

## 1.0.6 - 2026-08-05

### Added

- Segunda entrada bilingue del blog sobre el primer aniversario de la revision
  sistematica de Learning Analytics e IA generativa, con rutas, RSS y sitemap
  sincronizados.

## 1.0.5 - 2026-08-02

### Fixed

- Estado activo de la navegacion principal conservado al abrir entradas del
  blog, con `aria-current` para comunicar la seccion actual.

## 1.0.4 - 2026-08-02

### Added

- Flujo editorial coordinado por `editorial-lead` para contenido publico,
  analitica, evidencia, embargos, revision bilingue y seguridad antes de
  publicacion.
- Scripts locales para consultar Google Analytics 4 desde credenciales ignoradas
  por Git.
- Rutas editoriales en home y posts para conectar lectura con investigacion,
  trabajo aplicado y contacto.

### Changed

- Regla editorial actualizada: toda publicacion publica debe tener espejo en
  español e ingles con la misma prioridad, salvo excepcion temporal aprobada.
- Paginas de trabajo e investigacion ajustadas con llamados contextuales hacia
  contacto.

### Fixed

- Normalizacion cliente de rutas con diagonal final para reducir duplicacion de
  vistas en analitica.

## 1.0.3 - 2026-08-01

### Changed

- Frase de posicionamiento unificada entre README, hero, footer y metadatos
  bilingues.
- Flujo editorial reforzado para revisar consistencia de copy y seguridad
  publica antes de commits, comentarios, codigo, metadatos y publicaciones.
- Dependencia directa de `vue-router` alineada con Nuxt para eliminar el warning
  de Volar durante `typecheck`.
- Build de Nuxt configurado sin el polyfill de `modulepreload` para evitar el
  warning de sourcemaps en generacion estatica.

### Fixed

- Layout global migrado al mecanismo nativo de Nuxt con `<NuxtLayout>`, evitando
  el warning de layouts durante `dev`.

## 1.0.2 - 2026-07-30

### Fixed

- Identificadores concretos de analitica redactados del changelog historico para
  reducir exposicion publica innecesaria.

## 1.0.1 - 2026-07-30

### Changed

- Pies de imagen del blog renderizados como `figure` y `figcaption`, con estilo
  editorial reutilizable para distinguirlos del texto principal.
- Pie de imagen de la entrada sobre analitica de aprendizaje reescrito como
  sintesis visual del recorrido del campo.
- Guia editorial de posts actualizada para documentar el patron de pies de
  imagen en Markdown.

### Fixed

- Periodo visible del proyecto CONAHCYT PRONACES corregido de `2022-2024` a
  `2022-2023`.

## 1.0.0 - 2026-07-19

### Changed

- Analitica migrada a un gestor de etiquetas con consentimiento denegado por
  defecto.
- La medicion de visitas solo se activa cuando la persona acepta analitica.
- Modal de cookies, aviso de privacidad, aviso de cookies y pendientes legales
  actualizados para describir el flujo de consentimiento y analitica.

### Removed

- Carga directa anterior de analitica desde el sitio.

## 0.2.6 - 2026-07-19

### Changed

- Seccion de colaboraciones de investigacion redisenada como lista editorial con
  identificadores de programa, rol y periodo.
- Proyecto semilla de lectoescritura ajustado a CONACYT y proyecto PRONACES a
  CONAHCYT (PRONACES), segun su denominacion correspondiente.
- README del perfil publico suavizado para mejorar lectura sin agregar claims.
- Pagina "Sobre mi" ajustada para evitar una frase final demasiado editorial.

### Fixed

- Enlace de la publicacion sobre juego serio para trabajo social corregido de
  `ww.ucol.mx` a `www.ucol.mx`.

## 0.2.5 - 2026-07-18

### Added

- Colaboraciones interinstitucionales de IHCLab sobre lectoescritura de
  estudiantes Sordos en la pagina de trabajo, usando rol de miembro.
- Mencion breve de IHCLab en el README del perfil publico.

### Changed

- La tesis de maestria queda integrada en la lista general de publicaciones, sin
  bloque destacado separado en la pagina de investigacion.

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
