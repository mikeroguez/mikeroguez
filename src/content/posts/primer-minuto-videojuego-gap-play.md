---
title: 'El primer minuto importa'
seoTitle: 'GAP, PLAY y diseño de videojuegos'
description: 'Una lectura sobre cómo GAP y PLAY ayudan a revisar si un videojuego enseña, orienta y acompaña al jugador desde sus primeros minutos.'
date: '2026-08-29'
status: 'published'
lang: 'es'
translationKey: 'game-design-gap-play-first-minute'
tags: 'diseño de videojuegos, GAP, PLAY, interacción humano-computadora, experiencia de usuario, educación'
keywords: 'diseño de videojuegos, GAP, PLAY, heurísticas de videojuegos, playability, game approachability, experiencia de usuario, HCI, educación'
---

Un videojuego puede tener una buena idea, una mecánica interesante y una estética
cuidada, pero perder al jugador antes de que la experiencia empiece.

Ese momento inicial suele ser frágil. La persona todavía no entiende del todo qué
puede hacer, qué espera el sistema, qué cuenta como avance, qué errores son parte
del aprendizaje y cuáles indican que algo está mal diseñado. Si el juego exige
demasiado pronto, confunde. Si explica demasiado, interrumpe. Si no explica nada,
puede dejar al jugador fuera.

Por eso el primer minuto no es un trámite. Es una decisión de diseño.

En el [post anterior](/blog/disenar-videojuegos-motivacion-jugador), la pregunta
central era para quién diseñamos. No basta decir "para jugadores", porque jugar
no significa una sola cosa. Hay personas que buscan reto, otras exploración,
otras historia, relajación, competencia, compañía, expresión o dominio técnico.
Pensar en esas motivaciones ayuda a imaginar qué experiencia queremos cuidar.

Pero esa pregunta necesita una segunda parte: si ya sabemos qué experiencia
queremos proponer, ¿cómo revisamos si el juego permite habitarla desde el
inicio?

Ahí aparecen GAP y PLAY: dos conjuntos de preguntas para revisar si un juego
enseña bien su entrada y si la experiencia que promete se sostiene al jugar.

![Diagrama que muestra el primer minuto de un videojuego como traducción entre el mapa del diseñador, el modelo mental del jugador y la evaluación con GAP y PLAY.](/blog/primer-minuto-videojuego-gap-play/mapa-primer-minuto-gap-play.svg)

_El primer minuto como zona de traducción: el diseño propone reglas y ritmo; el
jugador construye sentido a partir de señales, acciones y retroalimentación. GAP
y PLAY ayudan a revisar si esa traducción sostiene la experiencia._

## El juego empieza antes de jugar bien

Cuando alguien abre un videojuego por primera vez, todavía no está jugando como
el diseñador imagina. Está leyendo señales. Prueba controles, interpreta
objetivos, mide consecuencias, decide si entiende lo suficiente para continuar.

Ese proceso no siempre se ve como aprendizaje, pero lo es. La persona construye
un modelo mental del juego: qué cosas importan, qué acciones son posibles, qué
riesgos existen, qué recompensas aparecen y qué tipo de atención se le pide.

Si ese modelo se forma con claridad, el jugador puede equivocarse sin sentirse
perdido. Si se forma con ruido, incluso una buena mecánica puede parecer injusta,
torpe o arbitraria.

Aquí aparece otra brecha. El diseñador suele tener un mapa completo del juego en
la cabeza: sabe qué reglas existen, cómo se relacionan los sistemas, qué acciones
deberían importar primero y qué experiencia espera producir. A ese mapa podemos
llamarle modelo conceptual. El jugador, en cambio, no recibe ese mapa completo.
Lo reconstruye poco a poco a partir de lo que ve, de lo que puede hacer y de la
respuesta que obtiene.

El problema no es que ambos modelos sean distintos. Siempre lo son. El problema
aparece cuando la distancia entre el modelo conceptual del diseñador y el modelo
mental del jugador impide actuar con sentido. Entonces el jugador no falla porque
el reto sea interesante, sino porque no entiende qué juego está jugando.

Esta brecha también puede leerse desde MDA, el marco mencionado en el post
anterior. MDA ayuda a separar tres cosas: las mecánicas que diseña el equipo, lo
que ocurre cuando esas mecánicas se ponen en movimiento y la experiencia que vive
el jugador. El jugador no recibe una lista técnica de reglas; interpreta lo que
esas reglas le hacen sentir y entender. Si ese paso no está mediado con cuidado,
la respuesta que el diseño quería provocar puede perderse antes de aparecer.

Diseñar el inicio de un juego no significa llenar la pantalla de instrucciones.
Significa crear una entrada legible a la experiencia. El jugador necesita saber
lo mínimo necesario para actuar, comprobar que su acción tuvo efecto y volver a
intentarlo con un poco más de comprensión.

El inicio no debe explicar todo el juego. Debe abrir una relación.

## GAP: cuidar la entrada

GAP, Game Approachability Principles, puede entenderse como una forma de mirar si
el juego deja entrar. Su preocupación principal no es si el sistema tiene todas
las funciones, sino si una persona puede acercarse a él, aprender lo básico y
reunir la confianza suficiente para seguir jugando.

Esto es especialmente importante con jugadores con poca familiaridad, pero no se
limita a ellos. Cada juego inventa su propio idioma. Incluso una persona experta
necesita entender cómo funciona ese mundo particular: qué botones importan, qué
reglas cambian, qué puede ignorar, qué debe mirar con atención.

La entrada suele fallar cuando el diseño supone demasiado. Supone que el jugador
ya entiende el género, que recuerda convenciones, que tolera frustración, que
reconocerá una señal visual, que leerá una instrucción antes de actuar o que
sabrá qué significa perder en ese contexto.

GAP ayuda a convertir esa preocupación en preguntas concretas:

- ¿El juego muestra antes de exigir?
- ¿Permite practicar una acción antes de castigarla?
- ¿Entrega información cuando se necesita, no mucho antes ni demasiado tarde?
- ¿Da señales suficientes para que el jugador sepa qué acaba de pasar?
- ¿Construye confianza o solo mide fallos?

Estas preguntas son de diseño, pero también son pedagógicas. Un tutorial, un
nivel inicial o una primera misión no son solo puertas de entrada; son espacios
de aprendizaje. Enseñan el juego mientras el jugador juega.

En clase suelo mencionar _Plantas contra Zombies_ como un ejemplo que, a mi
juicio, trabaja muy bien esa entrada tutorial. El juego no necesita explicar todo
su sistema desde el inicio. Primero deja ver un espacio claro, una amenaza
comprensible y una acción básica: colocar una planta para detener a un zombi. La
primera escena enseña porque organiza la atención. El jugador entiende dónde
mirar, qué puede hacer y qué consecuencia tiene su decisión.

Lo interesante no es solo que el tutorial sea sencillo. Es que aprender ya se
siente como jugar. La persona practica una regla pequeña, recibe
retroalimentación inmediata y empieza a intuir el ritmo del sistema antes de que
aparezcan combinaciones más complejas. En ese caso suelo decir que funciona
porque es fácil de aprender y (más o menos) difícil de dominar. No porque sea
simple, sino porque permite entrar con pocas reglas y después exige leer mejor el
sistema.

La dificultad está en que ese aprendizaje debe sentirse integrado. Si la persona
siente que está tomando una clase antes de poder jugar, algo se rompió. Si juega
sin entender qué está aprendiendo, también.

## PLAY: revisar cómo se siente jugar

PLAY desplaza la atención hacia cómo se siente jugar. Pregunta si el juego
comunica objetivos claros, ofrece retroalimentación útil, mantiene un ritmo
adecuado, permite control suficiente, conserva consistencia y produce una
experiencia que el jugador pueda reconocer como significativa.

En clase también suelo insistir en que, en videojuegos, el producto final no es
solo el archivo, la pantalla o el conjunto de reglas. Estamos diseñando una
experiencia que se forma en la mente de cada jugador. La diversión, el reto, la
tensión, la curiosidad o la sensación de dominio no existen de la misma manera
para todas las personas.

Eso vuelve incómoda la evaluación. Si la experiencia ocurre en la mente de cada
jugador, ¿cómo la medimos? No para reducirla a un número, sino para poder
mejorarla. Lo que no se observa con cuidado se vuelve difícil de discutir; lo que
no se discute con precisión se vuelve difícil de corregir.

PLAY ayuda en ese punto. Funciona como un traductor entre lo subjetivo y lo
revisable. No mide la diversión como si fuera una sustancia, pero sí permite
mirar señales concretas que pueden favorecerla o romperla: claridad de objetivos,
control, retroalimentación, consistencia, ritmo, reto y respuesta del sistema.

PLAY no reemplaza a GAP. Lo complementa. GAP ayuda a mirar la entrada: cómo el
jugador cruza el umbral. PLAY ayuda a mirar lo que ocurre cuando ya está dentro:
si las reglas, el reto, el ritmo y la retroalimentación sostienen la experiencia
prometida.

Por ejemplo, si el juego quiere cuidar la exploración, no basta con tener un mapa
grande. PLAY obliga a preguntar si el entorno da pistas, si las rutas
tienen sentido, si descubrir algo produce una respuesta clara y si perderse se
siente como curiosidad o como abandono.

Si el juego quiere cuidar la competencia, no basta con contar puntos. Hay que
preguntar si el reto parece justo, si el jugador entiende por qué ganó o perdió,
si puede mejorar mediante práctica y si la comparación con otros se percibe como
legítima.

Si el juego quiere cuidar la relajación, no basta con bajar la dificultad. Hay que
preguntar si el ritmo respeta pausas, si la interfaz no presiona de más, si los
errores no destruyen la experiencia y si el sistema permite permanecer sin estar
en alerta constante.

Las heurísticas sirven porque obligan a mirar con atención. No dicen qué juego
hacer. Ayudan a detectar cuándo lo que hicimos no sostiene lo que queríamos
provocar.

## Una heurística no es una receta

Hay un riesgo al usar heurísticas: convertirlas en lista de verificación mecánica.
Marcar puntos puede dar tranquilidad, pero no necesariamente produce mejor diseño.

Una heurística funciona cuando abre una conversación más precisa. Si alguien dice
"el tutorial está mal", la discusión se queda corta. En cambio, si pregunta "¿el
juego exige una acción antes de enseñarla?", "¿la retroalimentación permite
entender el error?" o "¿la primera escena protege la motivación principal del
jugador?", entonces el problema se vuelve trabajable.

También conviene reconocer sus límites. Revisar con heurísticas puede anticipar
problemas, ordenar criterios y mejorar un prototipo temprano. Pero no sustituye
observar a jugadores reales. Hay cosas que solo aparecen cuando alguien juega:
dónde duda, qué ignora, qué interpreta de otra manera, qué le causa orgullo, qué
le cansa y qué le hace abandonar.

Por eso GAP y PLAY no deberían usarse como sustituto de las pruebas con
jugadores. Funcionan mejor como preparación y como acompañamiento: antes de
probar, para limpiar problemas evidentes; entre iteraciones, para revisar
decisiones; después de observar, para interpretar mejor lo que ocurrió.

El diseño mejora cuando la heurística y la observación conversan.

## Un ejercicio de lectura

Si tuviera que convertir esta discusión en un ejercicio para clase, pediría mirar
solo el primer minuto de un videojuego.

No todo el juego. Solo ese umbral.

En ese minuto preguntaría:

- ¿Qué cree el jugador que debe hacer?
- ¿Qué acción aprende primero?
- ¿Dónde puede practicar sin sentirse castigado?
- ¿Qué retroalimentación recibe?
- ¿Qué motivación parece cuidar el diseño?
- ¿Qué problema detectaría GAP?
- ¿Qué problema detectaría PLAY?

La restricción importa porque obliga a dejar de hablar del juego en abstracto. El
diseño aparece en una puerta, un botón, una cámara, una frase, una pausa, una
señal sonora, un enemigo que espera, una recompensa pequeña, una consecuencia
visible.

Ahí se nota si el juego acompaña al jugador o si solo espera que el jugador
entienda.

## Diseñar para que alguien quiera quedarse

El primer minuto no determina toda la calidad de un videojuego, pero sí revela
mucho de su postura de diseño. Muestra qué supone sobre el jugador, cómo enseña,
qué considera justo, qué ritmo propone y qué tipo de relación quiere construir.

GAP y PLAY son útiles porque vuelven visible esa zona inicial que a veces se da
por sentada. Recuerdan que jugar bien no ocurre de inmediato. Primero hay que
entrar, orientarse, probar, equivocarse, recibir respuesta y ganar confianza.

Si el post anterior decía que diseñar videojuegos exige pensar en la motivación
del jugador, este segundo paso diría algo más concreto: una motivación solo se
puede cuidar si el juego permite habitarla desde sus primeras acciones.

Diseñar el primer minuto no es simplificar el juego. Es hacer posible que alguien
quiera quedarse.

Y después aparece otra pregunta, igual de importante: si creemos que esa entrada
funciona, ¿cómo lo comprobamos con jugadores reales?

Esa pregunta se vuelve todavía más delicada en los juegos serios. Cuando un juego
quiere enseñar, entrenar o acompañar una práctica, no basta con que sea usable ni
con que resulte entretenido. También hay que observar si permite aprender, si
sostiene la motivación adecuada y si la experiencia que imaginó el diseñador se
parece, al menos un poco, a la que construye el jugador.

Ese es otro paso: pasar de la heurística a la prueba de usabilidad.

## Para seguir leyendo

Este texto se apoya principalmente en:

- Desurvire, H., Caplan, M., & Toth, J. A. (2004). Using heuristics to evaluate
  the playability of games. _CHI Extended Abstracts 2004_, 1509-1512.
  https://doi.org/10.1145/985921.986102
- Desurvire, H., & Wiberg, C. (2010). User experience design for inexperienced
  gamers: GAP - Game Approachability Principles. En R. Bernhaupt (Ed.),
  _Evaluating User Experience in Games_ (pp. 131-147). Springer.
  https://doi.org/10.1007/978-1-84882-963-3_8
- Desurvire, H., & Wiberg, C. (2015). User experience design for inexperienced
  gamers: GAP - Game Approachability Principles. En R. Bernhaupt (Ed.), _Game
  User Experience Evaluation_ (pp. 169-186). Springer.
  https://doi.org/10.1007/978-3-319-15985-0_8
- Santana-Mancilla, P. C., Gaytán-Lugo, L. S., & Rodríguez-Ortiz, M. A. (2016).
  Usability testing of serious games: The experience of the IHCLab. En _Games
  User Research: A Case Study Approach_ (pp. 271-283). CRC Press.
  https://www.taylorfrancis.com/chapters/edit/10.1201/b21564-20/usability-testing-serious-games-experience-ihclab
