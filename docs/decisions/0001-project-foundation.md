# 0001 Project Foundation

## Estado

Aceptada como base inicial.

## Decision

Usar Vue 3, Vite, TypeScript, Vue Router, GitHub Actions y GitHub Pages para
publicar `dist/` en el dominio personalizado `mikeroguez.me`.

Mantener `base: '/'`, conservar el README raiz como perfil de GitHub, usar
`.local-context/` ignorado para evidencia local y no publicar desde `/docs`.

No agregar framework CSS inicialmente.

## Razones

- Vue 3 y Vite ofrecen una base ligera y mantenible.
- TypeScript mejora confiabilidad.
- GitHub Pages y Actions reducen infraestructura.
- `dist/` mantiene separada la documentacion del artefacto publicado.
- `.local-context/` permite trabajo con evidencia sin exponerla por accidente.
- CSS nativo evita dependencias visuales prematuras.

## Consecuencias

- Se requiere fallback `404.html` para rutas directas.
- La identidad visual definitiva queda pendiente.
- La revision humana sigue siendo obligatoria antes de publicar contenido real.

## Alternativas Consideradas

- Publicar desde `/docs`: descartado para mantener fuente y artefacto separados.
- Usar framework CSS: descartado por peso y riesgo de identidad generica.
- Elegir licencia ahora: descartado por falta de decision explicita.
