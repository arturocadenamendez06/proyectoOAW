# Proyecto RSS Reader

## Instalación

Clona el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Instala las dependencias:
una vez clonado en la consola del proyecto escribir esto:
Con npm:

```bash
npm install
```
eso ya instala todas las dependencias y ya estaria listo

Ejecutar el proyecto:

solo escriban esto en la consola una vez que se instalen las dependencias:

```bash
npm run dev
```

Accede a la aplicación en:

```arduino
http://localhost:3000
```

## Estructura de Carpetas

```
/app
```

Contiene los archivos de la aplicación.

- `globals.css`: Este archivo contiene los estilos globales que afectan a toda la aplicación, como fuentes, colores y configuraciones generales.
- `layout.tsx`: Define la estructura general de la aplicación, como el encabezado, el pie de página y otros componentes comunes que se muestran en todas las páginas.
- `page.tsx`: Este archivo se utiliza para definir la estructura principal de la página en donde se renderiza el contenido dinámico.

```
/actions
```
Esta carpeta contiene archivos relacionados con la lógica de las acciones y la manipulación de datos. Aquí es donde gestionas las interacciones y el procesamiento de formularios.

- `feed-form-action.ts`: Este archivo contiene la lógica para manejar la carga y validación de los feeds RSS en el formulario. Es responsable de procesar los datos que el usuario envía.

```
/public
```
En esta carpeta se encuentran los archivos estáticos, como imágenes, fuentes y otros recursos que no necesitan procesamiento.

```
/components
```
Aquí se encuentran los componentes reutilizables que componen las distintas partes de la interfaz de usuario.

- `FeedForm.tsx`: El formulario donde los usuarios ingresan la URL de un feed RSS.
- `FilterBar.tsx`: Componente que permite filtrar o buscar elementos dentro de los feeds.
- `header.tsx`: El encabezado de la página, que generalmente incluye el nombre de la aplicación y la navegación.
- `NewsCard.tsx`: Componente que muestra un artículo individual de noticias con detalles como el título, el creador y la fecha de publicación.
- `NewsSection.tsx`: Componente que organiza y muestra varias noticias o elementos de un feed RSS en una sección.
- `/ui/`: Carpeta que contiene componentes más pequeños y reutilizables de la interfaz, como botones, modales, etc.

```
/src
```
Contiene archivos que definen tipos y validaciones de datos, esenciales para garantizar que la información se maneje correctamente.

- `/schemas`: Contiene los esquemas de validación, como los esquemas de datos que validan la URL del feed RSS y otros parámetros.
- `/types`: Esta carpeta contiene los tipos de TypeScript que definen las estructuras de datos utilizadas en la aplicación. Por ejemplo, los tipos para los feeds RSS, los artículos y las respuestas de la API.
