# AGENTS.md

## Mision

Este repositorio es el perfil publico de GitHub de `mikeroguez` y la fuente del
sitio personal `https://mikeroguez.me`. Todo cambio debe proteger la reputacion,
la privacidad y la calidad publica del proyecto.

## Identidad

El sitio debe sentirse personal, intelectual, humano, sobrio, contemporaneo,
riguroso y accesible. Debe conectar investigacion, educacion, diseno y software
sin parecer plantilla generica, startup, agencia, CV saturado o pagina de
influencer.

## Estructura Importante

- `README.md`: perfil publico de GitHub. No convertirlo en documentacion tecnica.
- `src/`: aplicacion Vue.
- `public/`: archivos publicados tal cual.
- `docs/`: decisiones, criterios y documentacion del proyecto.
- `.codex/`: perfiles y habilidades reutilizables para agentes.
- `.local-context/`: evidencia local ignorada por Git. Puede leerse, pero no
  copiarse automaticamente.

La existencia de informacion en `.local-context/` no constituye autorizacion
automatica para publicarla.

## Comandos

- `npm install`: instalar dependencias.
- `npm run dev`: servidor local.
- `npm run format`: aplicar formato.
- `npm run lint`: revisar codigo.
- `npm run typecheck`: revisar TypeScript.
- `npm run test:run`: ejecutar pruebas.
- `npm run check:public`: revision automatica de seguridad publica.
- `npm run build`: compilar `dist/` y crear `404.html`.
- `npm run validate`: formato, lint, typecheck, pruebas, seguridad y build.

## Vue y TypeScript

Usar Vue 3, Composition API y `<script setup lang="ts">`. Mantener TypeScript
estricto, componentes pequenos, HTML semantico, CSS nativo con custom properties
y dependencias minimas. No agregar Pinia salvo necesidad real.

## Contenido

No inventar biografia, publicaciones, cargos, premios, metricas, testimonios,
clientes ni enlaces. Separar hechos, interpretaciones, opiniones y aspiraciones.
Mostrar incertidumbre cuando la evidencia sea insuficiente.

## Accesibilidad

Objetivo: WCAG 2.2 AA. Mantener landmarks, jerarquia de encabezados, foco visible,
navegacion por teclado, contraste razonable, texto comprensible, movimiento
reducido y controles con nombres accesibles.

## Privacidad

No publicar secretos, telefonos privados, domicilios, documentos oficiales, datos
familiares, datos de estudiantes, clientes, instituciones confidenciales,
negociaciones, cotizaciones ni estrategias privadas.

## Uso de `.local-context/`

Leer primero `.local-context/approved/`, despues `reviewed/` y usar `raw/` solo
como fuente. Reportar contradicciones. La fuente mas reciente no siempre es la
mas correcta. Nunca almacenar credenciales ahi.

## Enrutamiento de Contexto

| Tipo de tarea             | Leer primero                                    |
| ------------------------- | ----------------------------------------------- |
| Branding                  | `docs/brand/`                                   |
| Publico objetivo          | `docs/audiences/`                               |
| Contenido                 | `docs/content/`                                 |
| UX y navegacion           | `docs/ux/`                                      |
| Arquitectura y despliegue | `docs/engineering/`                             |
| Biografia o evidencia     | `.local-context/approved/`, `reviewed/`, `raw/` |
| Decisiones previas        | `docs/decisions/`                               |

## Blog

Las entradas publicas viven en `src/content/posts/` y se sirven como
`/blog/{slug}`. No escribir borradores privados ahi. Un archivo Markdown
rastreado por Git debe considerarse publico aunque tenga `status: draft`.

## Flujo de Trabajo

1. Inspeccionar el repositorio.
2. Identificar el objetivo.
3. Leer el contexto relevante.
4. Revisar evidencia si aplica.
5. Separar hechos de inferencias.
6. Proponer un plan breve para cambios importantes.
7. Implementar en cambios pequenos.
8. Ejecutar validaciones.
9. Revisar accesibilidad.
10. Revisar seguridad publica.
11. Revisar `git diff`.
12. Registrar decisiones relevantes.
13. Presentar resultados.
14. Solicitar revision humana antes de commit o publicacion.

## Definicion de Terminado

Una tarea termina cuando cumple el objetivo, usa evidencia verificada cuando
aplica, es apta para publicacion, mantiene marca y accesibilidad, pasa lint,
TypeScript, pruebas, build, rutas, seguridad publica, diff revisado y
documentacion actualizada.

## Git

No ejecutar `git add .`. No hacer commit, push, force push, reset destructivo ni
reescribir historial sin instruccion explicita. Antes de proponer commit, revisar
`git status --short` y `git diff`.
