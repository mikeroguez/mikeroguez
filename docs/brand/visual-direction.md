# Visual Direction

La direccion visual inicial debe ser editorial, sobria y clara. El espacio debe
usarse con generosidad para favorecer lectura, jerarquia y calma.

## Criterio General

La identidad visual debe parecer pensada, no decorada. La interfaz debe sostener
contenido verificable y lectura prolongada antes que impresionar en el primer
segundo.

El sitio debe sentirse como una presencia personal rigurosa: cercano a un
cuaderno editorial publico, no a una landing page de producto.

## Color

El color principal provisional es azul tinta, tomado de la lectura inicial del
logo. Debe funcionar como ancla institucional y editorial, no como decoracion
dominante.

Paleta provisional:

- Azul tinta: marca, encabezados, footer y elementos de identidad.
- Papel marfil/gris calido: fondo principal, inspirado en libreta editorial
  tipo Moleskine, evitando un amarillo dominante.
- Blanco: superficies y areas de lectura.
- Grafito: texto principal.
- Gris editorial: texto secundario y bordes.
- Ocre sobrio: foco visible y acentos funcionales.

El fondo puede usar un punteado muy sutil tipo libreta dotted. Debe sentirse
como textura de lectura, no como patron decorativo protagonista. Si compite con
el texto, se elimina o se reduce su contraste.

No usar todavia una paleta extensa. Los valores definitivos se ajustaran con
pruebas de contraste, lectura y aplicaciones reales del logo.

## Tipografia

Usar tipografia de sistema al inicio. La jerarquia debe apoyarse en peso,
tamanos moderados, espacio y estructura, no en decoracion.

Reglas:

- H1 expresivo pero no monumental.
- H2 y H3 compactos, adecuados para lectura editorial.
- Texto base comodo, con interlineado generoso.
- No usar mayusculas extensas salvo etiquetas breves.
- No agregar fuentes externas hasta justificar legibilidad, rendimiento y
  licencia.

## Composicion

- Preferir layouts con una columna editorial fuerte y areas de apoyo claras.
- Usar ancho de lectura limitado para textos largos.
- Evitar secciones que parezcan tarjetas flotantes dentro de tarjetas.
- Usar lineas, espacio y contraste tipografico antes que sombras.
- Los componentes repetidos pueden usar tarjetas discretas, no decorativas.
- El punteado de fondo no debe invadir superficies que necesiten lectura densa.

## Movimiento

El movimiento debe ser sutil, funcional y respetar `prefers-reduced-motion`.

No usar animaciones decorativas en la base. Si se agrega movimiento, debe ayudar
a orientacion, estado o continuidad.

## Fotografia

Las fotografias deben mostrar sujetos, procesos, lugares o evidencias reales.
Antes de publicarse requieren derechos de uso, privacidad y revision editorial.

No usar imagenes de stock ni fotografias atmosfericas que no aporten evidencia.

## Logo

El sitio usa un SVG optimizado como mascara y controla el color con CSS. Esto
permite variantes de color sin duplicar archivos.

El logo no debe competir con el contenido. Debe actuar como firma visual y punto
de orientacion.

## Framework CSS

La base usa CSS nativo con custom properties. Tailwind queda como opcion futura,
pero no se adopta hasta comprobar que acelera el trabajo sin volver generica la
identidad.

Si se adopta Tailwind mas adelante:

- debe usar tokens propios;
- no debe depender de patrones visuales genericos;
- no debe introducir gradientes, cards o sombras por inercia;
- debe mantener componentes accesibles y semanticos.

## Evitar

- Gradientes decorativos.
- Efectos sin proposito.
- Imagenes de stock.
- Paletas de una sola nota.
- Hero generico de tecnologia.
- Iconografia pesada o decorativa.
- Cards excesivas.
- Sombras prominentes.
- Lenguaje visual de SaaS o agencia.
- Composiciones saturadas de badges, metricas o claims.
- Texturas de papel exageradas o nostalgicas.

## Pendiente

Validar la paleta con contenido real, revisar contraste en todas las rutas,
probar usos del logo en tamanos pequenos y definir fotografia cuando exista
material aprobado.
