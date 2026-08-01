# Editorial Workflow

Evidencia local
-> clasificacion
-> verificacion
-> sintesis
-> revision de privacidad
-> aprobacion humana
-> implementacion
-> revision publica
-> publicacion

Cada etapa debe dejar claro que se sabe, que se infiere y que permanece
pendiente.

La revision de copy debe comparar frases recurrentes, descriptores, metadatos,
titulos, pies, navegacion y microcopy entre README, sitio, publicaciones y
social cards. Cuando una frase funcione como posicionamiento canonico, las
variaciones deben ser intencionales y estar justificadas.

La revision publica tambien aplica a comentarios editoriales, ejemplos,
frontmatter, mensajes preparados para commit o PR y notas de publicacion. Ningun
texto de trabajo debe incluir secretos, llaves de analitica, tokens, IDs
operativos, rutas locales, datos privados o informacion sensible.

## Blog

Las entradas del blog viven en `src/content/posts/` y se publican en
`/blog/{slug}`. El slug sale del nombre del archivo.

Reglas:

- No escribir borradores privados en archivos rastreados por Git.
- Usar `status: draft` solo para trabajo publico no listado.
- Publicar en el indice solo con `status: published`.
- Registrar evidencia y autorizacion antes de afirmar logros, cargos,
  colaboraciones, datos o resultados.
- Mantener descripcion sobria y verificable.
- El indice del blog puede filtrar por busqueda local y por año.
- La carga de entradas es incremental en cliente, de seis en seis; no requiere
  base de datos.
- El RSS, el sitemap y las rutas prerenderizadas del blog salen de las entradas
  Markdown publicadas; no deben editarse manualmente.
- La imagen social de una entrada puede declararse con `image` en el frontmatter,
  usando una ruta publica como `/social/posts/mi-entrada.jpg`. Si se omite, la
  card usa la imagen generica `public/social/mikeroguez-card.jpg`.

## Investigacion

Las publicaciones de investigacion viven en `src/content/publications/` y se
generan con `npm run generate:research` antes del build de Nuxt.

Reglas:

- Publicar en el indice solo con `status: published`.
- Mantener DOI, URL, tipo, año y descripcion como datos verificables.
- No registrar colaboraciones, instituciones o resultados sin evidencia publica
  o aprobacion humana.
