# Claude Code — Mikeroguez

Lee `AGENTS.md` para las reglas principales del proyecto. Este archivo agrega configuracion especifica para Claude Code.

## Agentes Especializados

Los agentes viven en `.claude/agents/`. Invocalos con la herramienta Agent cuando la tarea lo requiera:

| Agente                       | Cuándo invocar                                                                                          |
| ---------------------------- | ------------------------------------------------------------------------------------------------------- |
| `brand-director`             | Estrategia, posicionamiento, percepcion publica, coherencia de marca                                    |
| `visual-ui-designer`         | Diseño visual, composicion, tipografia, color, sistema de componentes, sincronizacion con Claude Design |
| `ux-architect`               | Arquitectura de informacion, navegacion, jerarquia, usabilidad                                          |
| `content-strategist`         | Narrativa, tono, escritura basada en evidencia                                                          |
| `frontend-engineer`          | Vue 3, TypeScript, CSS, pruebas, despliegue                                                             |
| `accessibility-reviewer`     | Revision WCAG 2.2 AA                                                                                    |
| `seo-performance-reviewer`   | Metadatos, Core Web Vitals, discoverabilidad                                                            |
| `public-repository-guardian` | Privacidad, credenciales, seguridad publica — puede detener una publicacion                             |

## Claude Design

El agente `visual-ui-designer` tiene acceso a `DesignSync` para sincronizar el sistema de componentes con un proyecto Design System en `claude.ai/design`. Usa esta integracion para revisar componentes visualmente antes de publicar.

Flujo recomendado:

1. Invocar `visual-ui-designer` con la tarea de diseño.
2. El agente crea o actualiza previsualizaciones HTML de componentes.
3. El agente usa `DesignSync` para sincronizar al proyecto Design System en `claude.ai`.
4. El usuario revisa visualmente en `claude.ai/design`.

## Contexto Local

Lee `.local-context/approved/` antes de `reviewed/`, y `raw/` solo como fuente primaria. Reportar contradicciones. La existencia de material en `.local-context/` no autoriza su publicacion.

## Skills de Revision

Las habilidades en `.codex/skills/` aplican a Claude Code:

- `brand-review` — identidad y percepcion publica
- `accessibility-review` — WCAG 2.2 AA
- `content-evidence-review` — clasificacion de afirmaciones
- `public-safety-review` — privacidad y seguridad antes de commit
- `release-readiness` — validacion completa antes de publicar
- `ux-review` — experiencia de usuario

## Git

No ejecutar `git add .`, `git commit`, `git push`, `git reset --hard` ni comandos destructivos sin instruccion explicita del usuario. Antes de cualquier propuesta de commit revisar `git status --short` y `git diff`.
