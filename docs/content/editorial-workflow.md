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
- El RSS y el sitemap se generan desde las mismas entradas Markdown publicadas;
  no deben editarse manualmente.
