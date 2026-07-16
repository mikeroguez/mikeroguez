# Logo Usage

El sitio usa por ahora:

- `public/brand/mikeroguez-logo-mask.svg`: logo horizontal optimizado.
- `public/brand/mikeroguez-isotype-mask.svg`: isotipo recortado desde el lado
  izquierdo del logo aprobado.

Ambos se pintan desde CSS con `currentColor`.

## Variantes Previstas

- Logo principal horizontal.
- Version clara.
- Version oscura.
- Isotipo derivado del logo aprobado.
- Favicon.

## Reglas Iniciales

- Mantener zona de proteccion alrededor del logo.
- Usar el SVG optimizado como mascara para variantes de color.
- Usar el isotipo solo en espacios compactos donde el logo horizontal pierda
  legibilidad.
- Cambiar color desde CSS, no duplicando SVGs.
- Usar azul tinta sobre fondos claros.
- Usar blanco sobre azul tinta u otros fondos oscuros aprobados.
- Definir tamano minimo despues de pruebas visuales en mobile y desktop.
- Usar fondos permitidos con contraste suficiente.
- No deformar.
- No recolorear arbitrariamente.
- No reconstruir el logo con texto o SVG improvisado.
- No publicar archivos fuente pesados si no son necesarios para el sitio.

## Pendiente

Validar visualmente el recorte del isotipo, definir favicon, zona de proteccion
precisa, tamano minimo y reglas para usos fuera del sitio.
