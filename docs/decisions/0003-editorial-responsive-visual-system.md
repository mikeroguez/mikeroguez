# 0003 Editorial Responsive Visual System

## Estado

Aceptada como decision de diseño inicial.

## Contexto

Las capturas locales de revision visual mostraron que el sitio conservaba una
direccion sobria y editorial, pero tenia dos problemas principales:

- el reflow movil podia generar desbordamiento horizontal y controles recortados;
- las tarjetas repetidas hacian que algunas secciones se sintieran mas cercanas
  a una plantilla de portafolio que a un cuaderno editorial publico.

## Decision

Priorizar un sistema visual editorial, resiliente y accesible:

- usar reglas, espacio, jerarquia tipografica y listas editoriales antes que
  tarjetas;
- mantener tarjetas solo cuando enmarquen elementos repetidos con una necesidad
  clara;
- hacer que cada superficie de lectura soporte palabras largas, DOI, enlaces y
  contenido futuro sin romper el viewport;
- aplazar composiciones densas de footer, sidebar y grillas hasta breakpoints
  donde el ancho disponible sea suficiente;
- ubicar herramientas secundarias, como compartir publicaciones, despues de la
  lectura principal.
- alinear las paginas amplias con el mismo ancho exterior del header y footer,
  manteniendo el ancho de lectura limitado dentro de textos largos;
- evitar imagenes generadas o atmosfericas en el home mientras no exista una
  fotografia, proceso o evidencia visual aprobada.

## Razones

- La identidad definida para el sitio pide una presencia personal, intelectual,
  humana, sobria y accesible.
- El contenido publico debe leerse con calma y no competir con patrones
  visuales genericos de landing page, agencia o CV saturado.
- El sitio todavia no cuenta con fotografia o evidencia visual aprobada; por lo
  tanto, el sistema debe sostenerse con composicion, texto, logo, color y ritmo.
- Una diferencia de ancho entre contenido amplio, header y footer puede ser
  editorial, pero si las reglas horizontales se perciben como cortes
  accidentales, conviene un contenedor exterior compartido y restricciones
  internas de lectura.

## Consecuencias

- El CSS debe incluir defensas explicitas para reflow movil, `min-width: 0` y
  wrapping de enlaces largos.
- Los proyectos seleccionados se presentan como filas editoriales con reglas,
  no como una grilla de tarjetas promocionales.
- Las estadisticas del blog no se muestran cuando el volumen publicado no aporta
  contexto real.
- Los enlaces externos que abren una pestaña nueva deben tener nombre accesible
  que lo indique.
- El home no debe repetir la marca como texto principal cuando el logo ya ocupa
  ese rol en la cabecera; el primer viewport debe explicar posicionamiento y
  criterio.
- Las imagenes generadas pueden usarse solo como mockups internos. No deben
  publicarse como sustituto de evidencia real, fotografia autorizada o material
  de proceso.

## Seguimiento

- Revisar el footer cuando exista mas contenido real y decidir si algunas redes
  sociales deben permanecer en una identidad mas academica/profesional.
- Reconsiderar fotografia solo cuando existan imagenes reales con derechos,
  privacidad y aprobacion editorial.
- Mantener capturas desktop y movil como evidencia local para revisiones
  visuales futuras.

## Capturas de Pantalla

Las capturas de revision se guardan en `.local-context/generated/` y no forman
parte de los assets publicos.

- Desktop: Chrome headless con `--window-size=1440,1200` para revisar
  composicion general.
- Movil: Chrome DevTools Protocol con emulacion `390x1200`,
  `deviceScaleFactor: 1` y verificacion de `scrollWidth` contra `clientWidth`.

El metodo CDP es el preferido para movil porque `--screenshot` puede producir
PNG recortados cuando el viewport CSS no coincide con el ancho de imagen.
