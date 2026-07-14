# 0002 CSS Identity Foundation

## Estado

Aceptada como decision provisional.

## Decision

Mantener CSS nativo con custom properties durante la fase de definicion de
identidad grafica. No adoptar Tailwind todavia.

## Razones

- La identidad visual aun esta en formacion.
- CSS nativo mantiene bajo el peso de dependencias.
- Los tokens propios ayudan a pensar primero en sistema, no en utilidades.
- Tailwind puede acelerar implementacion, pero tambien puede inducir patrones
  visuales genericos si se usa antes de fijar direccion.
- El sitio necesita una presencia editorial sobria, no una apariencia SaaS.

## Consecuencias

- Los estilos se mantienen en `src/assets/styles/`.
- Las decisiones visuales deben registrarse como tokens y documentacion.
- Tailwind puede reconsiderarse cuando existan pantallas reales, patrones
  repetidos y friccion clara de mantenimiento.

## Criterios Para Reconsiderar Tailwind

- Hay suficientes componentes como para que CSS nativo empiece a duplicarse.
- Existe una escala visual estable.
- Se puede mapear Tailwind a tokens propios sin usar la paleta default como
  identidad.
- El equipo acepta reglas contra gradientes, cards y patrones genericos.

## Alternativas Consideradas

- Adoptar Tailwind ahora: descartado por riesgo de prematurez visual.
- Usar framework de componentes: descartado por peso y perdida de caracter.
- Mantener CSS sin tokens: descartado porque dificulta consistencia.
