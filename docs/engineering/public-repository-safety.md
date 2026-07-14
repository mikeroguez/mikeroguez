# Public Repository Safety

Este repositorio es simultaneamente:

- perfil publico de GitHub;
- proyecto de software;
- evidencia profesional;
- fuente del sitio personal.

Todo archivo rastreado puede ser visto por colegas, estudiantes, instituciones,
clientes y desconocidos. Por eso, la privacidad es parte de la arquitectura.

## Reglas

- Mantener `.local-context/` ignorado.
- No publicar documentos internos.
- No publicar datos privados o de terceros.
- No publicar secretos.
- No asumir que una fuente local es publicable.
- Revisar diffs, workflows, dependencias y archivos generados.

El script `npm run check:public` ayuda a detectar riesgos obvios, pero no
sustituye una revision humana.
