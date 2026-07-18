# Entradas del Blog

Esta carpeta contiene las entradas Markdown del blog publico. Cada archivo `.md`
puede convertirse en una ruta publica durante el build.

## Flujo

1. Crear una entrada Markdown en esta carpeta.
2. Escribir frontmatter completo.
3. Mantener `status: 'draft'` mientras el texto este en preparacion.
4. Revisar evidencia, privacidad, tono y derechos de uso.
5. Cambiar a `status: 'published'` solo cuando pueda publicarse.
6. Ejecutar `npm run generate:blog`.
7. Ejecutar `npm run validate`.

El comando `npm run generate:blog` crea:

- `src/content/generated/blog-posts.ts`, usado por Vue.
- `public/feed.xml`, usado por lectores RSS en espanol.
- `public/feed-en.xml`, usado por lectores RSS en ingles.
- `public/sitemap.xml`, usado por buscadores.

No edites esos archivos generados para cambiar una entrada. Edita el Markdown
fuente.

## Nombres de Archivo y Rutas

El nombre del archivo define el slug de la URL:

```txt
src/content/posts/mi-entrada.md -> /blog/mi-entrada
```

Reglas para nombrar archivos:

- usar minusculas;
- usar guiones medios entre palabras;
- evitar espacios;
- evitar acentos y caracteres especiales;
- evitar fechas en el slug salvo que sean parte importante del titulo;
- preferir slugs cortos, claros y estables;
- usar slugs unicos en todo el blog, sin repetirlos entre idiomas;
- no cambiar el nombre despues de publicar salvo que aceptes romper enlaces
  existentes.

Buenos ejemplos:

```txt
educacion-diseno-software.md
notas-sobre-interaccion-humana.md
aprendizaje-herramientas-digitales.md
```

Evita:

```txt
Mi Entrada Final FINAL.md
post-1.md
2026-07-13-cosas.md
investigación_y_software.md
```

## Frontmatter

Cada entrada debe iniciar con frontmatter:

```md
---
title: 'Titulo publico'
description: 'Resumen breve para indice, RSS y metadatos.'
date: '2026-07-13'
status: 'draft'
---
```

Campos:

- `title`: titulo publico de la entrada.
- `description`: resumen breve, sobrio y verificable. Se usa en el indice y RSS.
- `date`: fecha de publicacion o fecha editorial, en formato `YYYY-MM-DD`.
- `status`: estado editorial.

Estados permitidos:

- `draft`: trabajo publico no listado.
- `review`: texto en revision editorial.
- `published`: entrada visible en el indice, RSS y sitemap.

Solo las entradas con `status: 'published'` aparecen en `/blog`, feeds RSS y
`sitemap.xml`.

## Regla de Privacidad

Este repositorio es publico. Un archivo comprometido en Git puede ser visto
aunque tenga `status: 'draft'`.

No escribas aqui:

- borradores privados;
- datos personales sensibles;
- telefonos o domicilios privados;
- informacion familiar;
- datos de estudiantes;
- datos de clientes o prospectos;
- informacion institucional confidencial;
- negociaciones, cotizaciones o estrategias privadas;
- credenciales, tokens, llaves o valores reales de `.env`;
- material copiado desde carpetas locales ignoradas sin sintesis y revision
  humana.

La existencia de informacion en materiales locales ignorados no autoriza
publicarla automaticamente.

## Evidencia y Contenido

Antes de publicar una afirmacion, verifica:

- fuente;
- fecha de la fuente;
- vigencia;
- autorizacion de publicacion;
- sensibilidad;
- contradicciones con otras fuentes.

Clasifica internamente las afirmaciones cuando sea necesario:

- verificada;
- verificada pero desactualizada;
- plausible sin evidencia suficiente;
- opinion;
- aspiracion;
- no publicable;
- contradictoria.

No conviertas inferencias en hechos. Si algo no esta confirmado, escribelo como
incertidumbre o no lo publiques.

## Escritura Recomendada

El tono debe ser:

- directo;
- reflexivo;
- humano;
- comprensible;
- profesional sin lenguaje corporativo;
- intelectual sin pedanteria;
- basado en hechos.

Evita:

- lorem ipsum;
- frases grandilocuentes;
- lenguaje de marketing;
- afirmaciones sin evidencia;
- metricas sin fecha y contexto;
- testimonios no autorizados;
- biografia inventada;
- enlaces sociales no confirmados.

## Markdown Permitido

Usa Markdown simple:

- parrafos;
- encabezados `##` y `###`;
- listas;
- enlaces;
- citas breves;
- codigo inline;
- bloques de codigo cuando sean necesarios.

No uses HTML crudo. El generador renderiza Markdown con HTML desactivado por
defecto.

## Imagenes y Archivos

No agregues imagenes privadas ni documentos originales dentro de esta carpeta.
Los materiales fuente deben revisarse primero en el espacio local ignorado del
proyecto.

Si una entrada necesita una imagen publica, define antes:

- origen;
- derechos de uso;
- texto alternativo;
- peso y formato;
- si expone informacion privada o metadatos.

Cuando una imagen ya este autorizada para publicarse, colocala en:

```txt
public/blog/{slug-de-la-entrada}/
```

Ejemplo:

```txt
src/content/posts/aprendizaje-herramientas-digitales.md
public/blog/aprendizaje-herramientas-digitales/diagrama-flujo.webp
```

En Markdown se vincula con ruta absoluta desde la raiz publica:

```md
![Diagrama del flujo editorial](/blog/aprendizaje-herramientas-digitales/diagrama-flujo.webp)
```

Reglas para imagenes publicas:

- el nombre del directorio debe coincidir con el slug de la entrada;
- usar nombres descriptivos en minusculas y con guiones;
- preferir `.webp` o `.png` segun el tipo de imagen;
- optimizar peso antes de publicar;
- eliminar metadatos privados cuando aplique;
- escribir texto alternativo util, no decorativo;
- no usar capturas con datos sensibles, rutas locales, nombres privados o
  informacion de terceros sin autorizacion.

Si la misma imagen se reutilizara en varias entradas, usa una carpeta comun
descriptiva:

```txt
public/blog/shared/nombre-del-archivo.webp
```

Y vinculala asi:

```md
![Descripcion publica de la imagen](/blog/shared/nombre-del-archivo.webp)
```

## Validacion

Despues de editar entradas:

```sh
npm run generate:blog
npm run validate
```

Antes de proponer publicar:

```sh
git status --short
git diff --check
```

Revisa manualmente el diff. No uses `git add .`.
