---
title: 'Predecir no es intervenir: validar indicadores académicos antes de usarlos'
seoTitle: 'Validar modelos predictivos para apoyar el aprendizaje'
description: 'Qué aprendimos al validar un modelo de indicadores académicos y por qué una señal en los datos no basta para convertirla en una intervención educativa.'
date: '2026-10-09'
status: 'published'
lang: 'es'
translationKey: 'prediction-is-not-intervention-validating-academic-indicators'
series: 'learning-analytics'
seriesOrder: '3'
tags: 'analítica de aprendizaje, aprendizaje automático, inteligencia artificial, educación superior, investigación'
keywords: 'analítica de aprendizaje, modelos predictivos, aprendizaje automático, educación superior, validación temporal, indicadores académicos'
---

Una plataforma educativa guarda muchas huellas: entregas, actividades, entradas
al curso y evaluaciones. Es fácil mirar esos datos y pensar que un sistema podría
anticipar quién necesita apoyo. Pero antes hay una pregunta muy importante: ¿esa
información ya existía cuando habría hecho falta tomar una decisión?

Esa pregunta está en el centro de nuestro artículo reciente,
[_Beyond Grades: Temporal Validation of a Multi-Output Model for Formative
Academic Indicators in a Latin American Public University_](https://doi.org/10.3390/app16199865),
publicado en _Applied Sciences_. El artículo no presenta una herramienta lista
para mandar alertas. Examina qué se puede decir cuando usamos la actividad previa
de un curso para estimar lo que podría pasar después.

## Una versión anterior y una revisión necesaria

En julio de 2026 compartimos una versión previa del trabajo como
[preprint](https://doi.org/10.20944/preprints202607.0546.v1). Un preprint hace
pública una investigación antes de la revisión por pares. Puede servir para
seguir el proceso, pero no es la última palabra sobre los resultados.

El artículo publicado retoma el análisis con una pregunta más estricta: qué
información estaba disponible antes de cada momento del curso y qué resultados
ocurrieron después. Por eso, para las conclusiones actuales, la fuente es el
artículo final. El preprint queda como un registro público de una etapa anterior,
no como evidencia de que el modelo esté listo para usarse.

## El problema de mirar el futuro

Muchos análisis se hacen cuando un curso ya terminó. Así se puede reunir toda la
información disponible y encontrar patrones. El problema aparece si después se
habla de esos patrones como si hubieran estado disponibles durante el curso.

Para apoyar a alguien a tiempo, un modelo debería usar solo lo que se conocía en
ese momento. Una tarea entregada después, una calificación publicada más tarde o
una actividad que todavía no ocurría no pueden ser una señal temprana. Si entran
en el análisis, el resultado puede verse mejor de lo que sería en una situación
real.

Por eso organizamos los datos alrededor de distintos momentos del periodo
académico. Usamos la actividad anterior a cada momento para estimar cinco cosas
posteriores: desempeño en tareas, tareas no entregadas, entregas tardías,
desempeño en exámenes y precisión en exámenes.

Estos no son diagnósticos sobre las personas. Son indicadores observables. No
miden directamente motivación, abandono, autorregulación ni “riesgo académico”.

## Una buena prueba también busca los límites

Un resultado promedio puede esconder algo importante. Un modelo puede funcionar
en algunos cursos y no en otros. También puede verse bien con datos conocidos y
perder fuerza al probarse en un periodo posterior.

Por eso no usamos una sola prueba. Revisamos bloques de un mismo curso y periodo,
cursos que el modelo no había visto y un periodo académico posterior. También
comparamos el modelo con opciones simples. Por ejemplo, para anticipar tareas no
entregadas, preguntamos si mirar el patrón anterior de entregas ya daba una
respuesta útil.

Esta comparación importa mucho. Un modelo complejo no es mejor solo porque usa
más datos o porque produce un número. Tiene que aportar algo frente a una regla
sencilla y tiene que seguir siendo útil fuera de los datos con los que se creó.

## Lo que encontramos

La señal más clara apareció para las tareas que no se entregaron después. Aun
así, no se mantuvo de la misma forma en todos los cursos. En el periodo posterior
que evaluamos, una regla basada en entregas previas fue más útil que el modelo.

Para los otros indicadores no encontramos evidencia estable para decir que se
pueden estimar de forma fiable en ese contexto. Es una conclusión más pequeña que
decir que un sistema “predice el rendimiento”. Pero también es más honesta:
muestra qué parte de la evidencia se sostiene y cuál no.

Esto no significa que los datos educativos no sirvan o que debamos abandonar los
modelos. Significa que encontrar una relación en datos anteriores no basta para
usar una predicción en cada curso. Mucho menos basta para mandar una alerta que
afecte a una estudiante o un estudiante.

## Una interfaz y una predicción son preguntas distintas

Esta idea también importa al diseñar prototipos. Una interfaz puede ayudar a que
docentes o estudiantes vean información, entiendan una señal y hablen sobre qué
hacer. Saber si esa interacción es clara, útil y respetuosa es una pregunta de
diseño distinta.

Pero una interfaz fácil de usar no vuelve fiable una predicción. Y un modelo que
parece funcionar bien tampoco demuestra, por sí solo, que una interfaz ayude a
aprender o a tomar mejores decisiones. Cada cosa necesita su propia evaluación.

El artículo publicado revisa la parte predictiva con datos del pasado. No evalúa
una interfaz, una intervención, cómo se interpretan las alertas ni sus efectos
educativos. Por eso no permite afirmar que una herramienta de apoyo funciona,
pero tampoco permite afirmar que no puede funcionar. Deja más claro lo que
todavía hace falta demostrar.

## Lo valioso de un resultado con límites

En investigación aplicada suele haber presión por encontrar un modelo más preciso
o una respuesta definitiva. Pero reconocer un límite también es avanzar. Evita
que una señal parcial se presente como certeza y ayuda a hacer mejores preguntas.

Una de ellas es si modelos más simples, separados para cada indicador, podrían
dar resultados más claros que un modelo conjunto. Otra es cómo mostrar señales
para que las personas puedan discutirlas, cuestionarlas y usarlas con criterio.

Antes de usar algo así en una institución, todavía hay preguntas sobre privacidad,
reglas claras, pruebas en periodos futuros y el tipo de apoyo que realmente se
puede ofrecer.

La lección principal no es que debamos dejar de predecir. Es que predecir no es
intervenir. Entre un patrón en los datos y una decisión que afecta a una persona
hay muchas responsabilidades: usar información disponible a tiempo, comparar de
forma honesta, interpretar con personas y saber qué apoyo se puede ofrecer.

Ahí es donde la analítica de aprendizaje puede tener un valor educativo real.

## Para seguir leyendo

Este texto parte de:

- Rodríguez-Ortiz, M. Á., Santana-Mancilla, P. C., & Anido-Rifón, L. E. (2026).
  _Beyond Grades: Temporal Validation of a Multi-Output Model for Formative
  Academic Indicators in a Latin American Public University_. _Applied
  Sciences, 16_(19), 9865. https://doi.org/10.3390/app16199865
