# Editorial Governance

## Proposito

Garantizar que cualquier cambio publico del sitio o perfil profesional pase por
una organizacion editorial clara, con evidencia, seguridad publica, marca,
accesibilidad y revision humana final.

## Principio Central

El acceso a informacion no autoriza su publicacion.

Todo material debe clasificarse antes de usarse:

```text
privado -> revisado -> aprobado -> publicable -> publicado
```

Algunos materiales quedan como:

```text
embargado hasta publicacion del paper
```

## Liderazgo Editorial

El agente principal para trabajo publico es `editorial-lead`.

Su trabajo es:

- entender el pedido;
- activar especialistas;
- coordinar evidencia, embargos, copy, marca, UX, accesibilidad, SEO, legal,
  frontend y seguridad publica;
- validar el cambio;
- entregar un paquete de aprobacion al usuario.

El usuario conserva la aprobacion final.

## Compuertas

### 1. Evidencia

`evidence-librarian` clasifica claims, fuentes, fechas, vigencia y autorizacion.

### 2. Embargo

`research-embargo-guardian` revisa investigacion no publicada, tesis, HAPDA,
modelo predictivo, correspondencia editorial, datasets y metodos.

### 3. Estrategia

`content-strategist`, `brand-director`, `analytics-strategist` y
`academic-reputation-reviewer` definen narrativa, oportunidad, tono y riesgo
reputacional.

### 4. Produccion

`bilingual-copy-editor`, `teaching-content-curator`, `ux-architect`,
`visual-ui-designer` y `frontend-engineer` convierten el alcance aprobado en
texto, interfaz o codigo.

Toda pieza publica debe planearse, producirse y revisarse en español e ingles
con la misma prioridad editorial. Una publicacion no queda lista si solo existe
en un idioma, salvo que el usuario apruebe explicitamente una excepcion temporal.

### 5. Revision Publica

`accessibility-reviewer`, `seo-performance-reviewer`,
`web-legal-compliance-reviewer` y `public-repository-guardian` revisan bloqueos
antes de publicacion.

### 6. Cierre

`publication-readiness-editor` confirma que el paquete esta listo para revision
humana o que debe pausarse.

## Paquete de Aprobacion

Antes de publicar, commitear, empujar o desplegar, el usuario debe recibir:

- recomendacion: aprobar, modificar, pausar o rechazar;
- alcance del cambio;
- evidencia usada;
- claims sensibles o embargados;
- riesgos residuales;
- archivos cambiados;
- validaciones ejecutadas;
- decision solicitada.

## Fuentes Sensibles

Tratar como privadas o embargadas por defecto:

- `.local-context/raw/`;
- `.local-context/generated/`;
- `.secrets/`;
- exports o reportes crudos de analitica;
- workspaces locales de investigacion doctoral;
- workspaces locales de docencia y curriculum;
- papers en revision;
- tesis;
- datasets;
- documentos oficiales de clase;
- datos de estudiantes;
- correspondencia editorial.

## Regla de Publicacion

No publicar cambios editoriales, sensibles, reputacionales o de release sin
aprobacion humana explicita.
