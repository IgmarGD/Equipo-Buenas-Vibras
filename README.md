# Lapta Ecosol ☀️🌿

**Sitio web del Equipo Buena Vibra | Rally Latinoamericano de Innovación 2026**

> **La energía no termina aquí. Se transforma.**

## Acerca del proyecto

**Lapta Ecosol** es una propuesta de innovación del **Equipo Buena Vibra**, de la Bluefields Indian & Caribbean University (BICU), Nicaragua.

**Tema del proyecto:**

*Aprovechamiento sostenible de paneles solares en desuso mediante su reutilización energética comunitaria y transformación artística en América Latina.*

La iniciativa plantea recolectar y evaluar paneles solares retirados para darles un destino adecuado:

1. **Reutilización energética comunitaria:** los paneles que superen pruebas técnicas podrán emplearse en aplicaciones de menor consumo, como iluminación LED o carga de pequeños dispositivos.
2. **Transformación artística:** los paneles o componentes que hayan sido evaluados como seguros para uso decorativo podrán emplearse en cuadros y diseños artísticos comercializables.
3. **Reciclaje especializado:** los módulos y materiales que no sean aptos para reutilización ni decoración deberán ser gestionados por especialistas.

La propuesta inicia en Nicaragua y busca un modelo adaptable a otros países de América Latina.

> **Nota de seguridad:** nunca debe asumirse que un panel dañado es seguro para pintarlo, cortarlo o desarmarlo. Se requiere evaluación profesional; el sitio web no sustituye ninguna prueba eléctrica, ambiental o de seguridad.

## Funcionalidades de la página

- Página de presentación del proyecto, del equipo y del Rally 2026.
- **Tres logotipos:** Rally Latinoamericano de Innovación, Equipo Buena Vibra y Lapta Ecosol.
- Información sobre el problema, las tres rutas y el impacto esperado.
- Simulador **educativo** de clasificación (no realiza diagnósticos reales).
- Ejemplos conceptuales de arte y decoración.
- Sección **Momentos** para mostrar videos y enlaces de YouTube.
- Diseño adaptable a celular, tableta y computadora.
- Código editable con HTML, CSS y JavaScript, sin frameworks ni base de datos obligatoria.

## Requisitos

- **Visual Studio Code** (recomendado, pero no obligatorio).
- Navegador actualizado, por ejemplo Chrome, Edge o Firefox.
- Extensión **Live Server** de VS Code (recomendada para visualizar el proyecto localmente).

**No necesitas instalar Node.js, React ni un servidor de base de datos.**

## Cómo abrir el sitio en Visual Studio Code

1. Descomprime `Lapta_Ecosol_Con_README.zip`.
2. En VS Code, selecciona **Archivo → Abrir carpeta**.
3. Elige la carpeta `buena_vibra_web`.
4. Abre `index.html`.
5. Haz clic derecho sobre `index.html` y elige **Open with Live Server**, si tienes instalada esa extensión.
6. El navegador mostrará el sitio. Guarda los archivos para ver tus cambios.

También puedes usar un servidor local con Python desde la carpeta del sitio:

```bash
python -m http.server 5500
```

Luego abre `http://localhost:5500`.

> Abrir `index.html` mediante doble clic permite ver gran parte del diseño, pero es preferible usar un servidor local para que el almacenamiento de videos y otras funciones del navegador trabajen de manera más predecible.

## Estructura de archivos

```text
buena_vibra_web/
├── index.html                 # Textos, estructura y secciones
├── estilos.css                # Colores, tipografía y diseño adaptable
├── app.js                     # Menú y simulador educativo
├── app-momentos.js            # Reproducción y manejo local de videos
├── videos-publicos.js         # Videos visibles para todos los visitantes
├── README.md                  # Esta documentación
├── LEEME.md                   # Guía adicional incluida en el proyecto
└── assets/
    ├── logo-rally.webp        # Logo del Rally Latinoamericano
    ├── logo-equipo.webp       # Logo del Equipo Buena Vibra
    ├── logo-proyecto.webp     # Logo de Lapta Ecosol
    ├── ilustracion-solar.svg
    ├── arte-caribe.svg
    ├── arte-geometrico.svg
    ├── arte-naturaleza.svg
    ├── favicon.svg
    └── videos/
        └── PON_AQUI_TUS_VIDEOS.txt
```

## Cómo cambiar los tres logos

Los archivos de los logos están en `assets/`:

| Logotipo | Archivo |
| --- | --- |
| Rally Latinoamericano de Innovación | `assets/logo-rally.webp` |
| Equipo Buena Vibra | `assets/logo-equipo.webp` |
| Proyecto Lapta Ecosol | `assets/logo-proyecto.webp` |

**Opción sencilla:** sustituye la imagen correspondiente por una nueva con **el mismo nombre y extensión**. El sitio utilizará el nuevo archivo cuando recargues la página.

Si tu nueva imagen tiene otro nombre o formato (`.png`, `.jpg`, etc.), edita la ruta del atributo `src` correspondiente en `index.html`:

```html
<img src="assets/logo-proyecto.webp" alt="Logo de Lapta Ecosol">
```

Puedes buscar `logo-rally.webp`, `logo-equipo.webp` y `logo-proyecto.webp` en VS Code para localizar cada uso. El logo del equipo también aparece en el encabezado y en el pie de página.

## Cómo agregar videos a «Momentos»

La sección **Momentos** tiene **dos modos distintos**. Es importante no confundirlos.

### Opción A: agregar videos desde la página (solo para ese navegador)

1. Entra a **Momentos**.
2. Pulsa **+ Añadir momentos**.
3. Selecciona varios videos desde tu dispositivo y pulsa **Añadir videos**, o introduce el título y un enlace válido de YouTube o de un video MP4/WebM.
4. Los videos aparecerán en tarjetas dentro de la galería.

Los videos locales se intentan guardar en **IndexedDB** del navegador; los enlaces se guardan en almacenamiento local. **No se suben a internet ni serán visibles para otras personas** por este método. Si borras los datos del navegador, cambias de dispositivo o te quedas sin espacio, podrías perderlos. Si el almacenamiento no está disponible, el sitio puede conservar archivos solo durante esa sesión.

En el formulario, el tamaño máximo permitido por archivo es **250 MB**, sujeto además a los límites de almacenamiento del dispositivo. Para mejorar la compatibilidad, utiliza **MP4** o **WebM**; algunos `.mov` no se reproducen en todos los navegadores.

### Opción B: publicar videos para todos los visitantes (recomendada)

**Para archivos de video:**

1. Copia tus archivos MP4 o WebM dentro de `assets/videos/`.
2. Abre el archivo `videos-publicos.js`.
3. Agrega una entrada por video al arreglo `window.VIDEOS_PUBLICOS`.
4. Guarda los cambios y publica toda la carpeta del sitio, **incluidos los videos**.

Ejemplo:

```javascript
window.VIDEOS_PUBLICOS = [
  {
    titulo: "Presentación del equipo",
    archivo: "assets/videos/presentacion.mp4",
    descripcion: "Nuestra primera presentación"
  },
  {
    titulo: "Preparación del proyecto",
    archivo: "assets/videos/preparacion.webm"
  },
  {
    titulo: "Pitch del Rally",
    url: "https://www.youtube.com/watch?v=ID_REAL_DEL_VIDEO",
    descripcion: "Participación del Equipo Buena Vibra"
  }
];
```

**Los nombres y enlaces anteriores son ejemplos.** Reemplázalos con tus archivos y URLs reales. Respeta las comas, llaves y comillas del JavaScript para evitar errores.

**Para videos de YouTube:** súbelos a un canal con el nivel de visibilidad apropiado y pega el enlace en `videos-publicos.js` como `url`. Esto suele ser mejor que almacenar archivos de gran tamaño en un alojamiento web gratuito. Si un video es privado o prohíbe inserciones, puede no reproducirse en la página.

> **Importante:** esta web es **estática**. No dispone de cuentas, autenticación, moderación, panel administrativo ni subida de videos a un servidor. Para que un formulario permita publicar videos para todo el mundo automáticamente, se necesita un backend y almacenamiento en la nube.

## Otros cambios habituales

| Quiero cambiar… | Archivo que debo editar |
| --- | --- |
| Nombre del proyecto, secciones o descripciones | `index.html` |
| Colores, letras, márgenes y diseño | `estilos.css` |
| Funcionamiento del menú y simulador | `app.js` |
| Galería y formulario de «Momentos» | `app-momentos.js` |
| Lista de videos públicos | `videos-publicos.js` |
| Logos e ilustraciones | `assets/` y, si cambia el nombre, `index.html` |

Puedes usar la búsqueda de VS Code (`Ctrl + F`) para localizar un texto y cambiarlo.

## Cómo publicar la página

Puedes utilizar un servicio de alojamiento estático como **GitHub Pages** o **Netlify**.

Una forma de publicar con GitHub Pages es:

1. Crear un repositorio de GitHub para la página.
2. Subir **el contenido** de `buena_vibra_web` (con `index.html` en la raíz del sitio que se publica).
3. En el repositorio, abrir **Settings → Pages**.
4. Seleccionar la rama y la carpeta de publicación correspondientes, por ejemplo `main` y `/ (root)`.
5. Esperar la publicación y abrir la dirección que GitHub indique.

Si usas GitHub Pages con un repositorio que contiene una carpeta `buena_vibra_web` en su interior, debes ajustar la configuración o mover los archivos al directorio que se publique. GitHub Pages y otros servicios tienen límites de tamaño y ancho de banda: evita cargar muchos videos pesados directamente al repositorio.

## Recomendaciones y límites del proyecto

- El proyecto es una **propuesta de innovación**; el contenido no debe dar a entender que se realizaron instalaciones o ensayos que todavía no existen.
- Las imágenes artísticas son **conceptuales**; no prueban la seguridad de pintar un panel solar real.
- Obtén permiso para publicar videos donde aparezcan personas y utiliza únicamente imágenes, música o materiales que tengas derecho a usar.
- El logo del Rally identifica la competencia; respeta las condiciones de uso de la organización.
- Conserva copias originales de los videos y respaldos del código.
- Después de modificar la web, pruébala tanto en computadora como en celular.

## Equipo y créditos

- **Equipo:** Buena Vibra.
- **Proyecto:** Lapta Ecosol.
- **Institución:** Bluefields Indian & Caribbean University (BICU), Nicaragua.
- **Evento:** Rally Latinoamericano de Innovación 2026.
- **Alcance propuesto:** Nicaragua, con proyección a América Latina.

---

**Lapta Ecosol — energía, arte y nuevas oportunidades para nuestras comunidades.**
