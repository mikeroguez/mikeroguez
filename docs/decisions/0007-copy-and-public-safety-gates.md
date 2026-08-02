# 0007 - Revisiones de copy y seguridad publica antes de publicar

**Fecha:** 2026-08-01
**Estado:** Implementado

---

## Contexto

El sitio y el README comparten frases de posicionamiento, metadatos y contenido
publico. Una variacion no intencional puede debilitar la identidad editorial.

Tambien existe riesgo de publicar informacion sensible en lugares que no siempre
se revisan como contenido final: mensajes de commit, PRs, comentarios de
revision, comentarios de codigo, ejemplos, logs, frontmatter y archivos
generados. Las llaves de analitica y otros identificadores operativos deben
tratarse como material sensible aunque su impacto parezca bajo.

## Decision

Toda revision de publicacion debe incluir dos compuertas:

- Copy: revisar consistencia de frases recurrentes, descriptores, encabezados,
  metadatos, pies, navegacion y microcopy entre README, sitio, publicaciones y
  social cards.
- Seguridad publica: revisar secretos, llaves de analitica, measurement IDs,
  tokens, client IDs, webhook URLs, nombres de entornos, rutas locales,
  identificadores operativos y datos privados en commits, comentarios, codigo,
  documentacion, publicaciones, metadatos y archivos generados.

Si una variacion editorial es intencional, debe tener justificacion. Si aparece
un dato sensible o de autorizacion dudosa, la publicacion debe pausarse para
revision humana.

## Consecuencias

- El editor de copy debe auditar consistencia, no solo corregir redaccion.
- El guardian del repositorio publico puede detener cambios por riesgos en
  commits, comentarios, codigo o metadatos, no solo en paginas visibles.
- `npm run check:public` sigue siendo apoyo automatico, pero la decision final
  requiere revision humana.
