# LAPTA ECOSOL · Equipo Buena Vibra

Sitio web editable en **Visual Studio Code** para el Rally Latinoamericano de Innovación 2026.

Tema: **Aprovechamiento sostenible de paneles solares en desuso mediante su reutilización energética comunitaria y transformación artística en América Latina**.

## 1. Cómo empezar

1. Descomprime el ZIP y abre la carpeta `buena_vibra_web` con Visual Studio Code.
2. Abre `index.html` usando la extensión **Live Server** (recomendado para guardar los videos en el navegador). También funciona con un servidor local simple.
3. Modifica los archivos, guarda y recarga la página.

No necesitas React, Node.js, pagos ni base de datos para visualizar la página.

## 2. Los tres logos

La sección **Nuestra identidad** ya contiene tus imágenes reales:

- `assets/logo-rally.webp`: logo del Rally Latinoamericano de Innovación 2026.
- `assets/logo-equipo.webp`: logo del Equipo Buena Vibra.
- `assets/logo-proyecto.webp`: logo de Lapta Ecosol.

Puedes reemplazar cualquiera por otro archivo con el mismo nombre, o editar el atributo `src` correspondiente de `index.html`. En el encabezado y el pie de página se emplea también el logo del equipo.

## 3. Momentos: cómo agregar TODOS tus videos

### Forma A: desde la página (solo tu navegador)

1. Abre la sección **Momentos**.
2. Selecciona **+ Añadir momentos**.
3. Escoge uno o varios archivos en «Subir videos desde el dispositivo» y pulsa **Añadir videos**; o pega un enlace de YouTube / MP4 / WebM en «Agregar video desde un enlace».
4. Los videos se muestran como tarjetas con reproductor y título.
5. Puedes quitarlos con **Quitar este video**.

**IMPORTANTE:** los videos agregados con estos formularios permanecen **solo en ese navegador/dispositivo** y NO aparecen automáticamente para otros visitantes. Los archivos se intentan guardar mediante IndexedDB; si el navegador lo bloquea o se queda sin espacio, la web mostrará un aviso. Si limpias los datos de navegación, se pueden perder. Cada archivo tiene un límite de 250 MB en este modo y algunos formatos, como MOV, podrían no reproducirse en todos los navegadores. No es una subida a un servidor.

### Forma B: hacer que los videos salgan para TODOS en la web publicada

1. Copia tus archivos MP4/WebM dentro de `assets/videos/` (puedes agrupar todos los que quieras; considera el tamaño y límite de tu alojamiento).
2. Abre `videos-publicos.js` en Visual Studio Code.
3. Añade los videos de este modo, separados por comas:

```javascript
window.VIDEOS_PUBLICOS = [
  { titulo: "Primera reunión", archivo: "assets/videos/primera-reunion.mp4", descripcion: "Nuestro equipo trabajando" },
  { titulo: "Presentación del proyecto", archivo: "assets/videos/presentacion.mp4" },
  { titulo: "Pitch oficial", url: "https://youtu.be/ID_DEL_VIDEO" }
];
```

Los ejemplos no corresponden a videos existentes: pon sus nombres reales, rutas correctas y enlaces válidos. Los videos guardados de esta manera **sí aparecerán a cualquier persona** cuando publiques toda la carpeta. Para videos grandes, puede ser mejor subirlos a YouTube y agregar los enlaces al mismo archivo para no llenar el hosting.

No existe todavía acceso con contraseña o panel administrativo en línea. Para que los visitantes puedan subir videos y estos se publiquen automáticamente para todos, haría falta un backend, almacenamiento en la nube y controles de acceso.

## 4. Otros archivos del proyecto

| Archivo | Para qué sirve |
| --- | --- |
| `index.html` | Secciones, textos, logos, botones y estructura del sitio. |
| `estilos.css` | Colores, tamaños, fondos, tipografía y diseño adaptable. |
| `app.js` | Menú, simulador educativo y botón copiar. |
| `app-momentos.js` | Galería, reproducción, archivos y enlaces guardados en el navegador. |
| `videos-publicos.js` | Videos que verán **todos los visitantes** en el sitio publicado. |
| `assets/` | Logos, ilustraciones y carpeta para videos públicos. |

## 5. Publicación

Publica la carpeta completa usando GitHub Pages, Netlify u otro alojamiento web estático. Deben conservarse las rutas relativas (`index.html`, scripts, CSS y `assets/`). Verifica previamente los derechos o permisos para publicar los videos de otras personas.

## 6. Información del proyecto

La web presenta una propuesta en etapa de diseño. El simulador de clasificación **no realiza pruebas técnicas**, ni garantiza que los paneles dañados sean seguros. Se requiere evaluación profesional para reutilizar o transformar materiales en arte; los módulos no aptos deben ir a gestores autorizados.
