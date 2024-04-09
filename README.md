# Proyecto de Bases de Datos 2

Este proyecto se estructura en varias partes, incluyendo APIs y front-ends que interactúan entre sí, además de la configuración de la base de datos.

## Estructura del Proyecto

- **api-auth**: API desarrollada en Express y TypeScript, utilizando MongoDB y JWT para la autenticación.
- **api-crud**: API en Express y TypeScript para el manejo CRUD (Crear, Leer, Actualizar, Eliminar) de Recetas, Categorías y Tags, utilizando MongoDB.
- **api-images**: API en Express y TypeScript con MongoDB y `express-fileupload` para subir y servir imágenes desde la base de datos.
- **front-cms**: Frontend desarrollado en React, conectándose a las APIs para manejar el contenido.
- **front-landing**: Frontend en Astro, diseñado para mostrar contenido en formato de blog.
- **mongo**: Configuraciones de MongoDB.

## Estructura de las APIs

La estructura propuesta busca maximizar la claridad, mantenibilidad y escalabilidad del proyecto. Se detalla cada componente con estándares específicos para nombres de archivos y su organización interna.

### `src/`: Carpeta raíz del código fuente
- **`app.ts`**: Archivo principal de configuración de la aplicación Express. Aquí se configuran los middlewares, las rutas y la conexión a la base de datos.
- **`index.ts`**: Punto de entrada de la aplicación. Este archivo inicia el servidor Express y puede incluir configuraciones iniciales.
- **`controllers/`**: Gestionan la interacción entre la capa de servicios y los clientes. Ejemplo: `user/index.ts`.
- **`services/`**: Contiene la lógica de negocio y las operaciones de backend. Ejemplo: `authentication/index.ts`.
- **`middlewares/`**: Funciones para manejar solicitudes antes de llegar a los controladores. Ejemplo: `error-handler/index.ts`.
- **`models/`**: Modelos de datos, para Mongoose en este caso. Ejemplo: `user/index.ts`.
- **`routes/`**: Definiciones de rutas de Express. Ejemplo: `user/index.ts`.
- **`utils/`**: Utilidades y herramientas comunes, con subcarpetas para funciones, interfaces, tipos, enumeraciones y validaciones. Ejemplo: `jwt/index.ts`.
- **`config/`**: Configuraciones del proyecto, incluyendo variables de entorno y configuraciones de servicios. Ejemplo: `env/index.ts`.

## Estructura de la Rúbrica de Evaluación

### Archivos Raíz

- `app.js`: Archivo principal donde se configura Express.
- `package.json` & `package-lock.json`: Definen y bloquean las versiones de las dependencias del proyecto.

### `bin/`

- `www`: Script para configurar el servidor, definiendo el puerto e iniciando la aplicación.

### `config/mongodb/`

- `mongodb-config.json`: Configuraciones para MongoDB.

### Módulos

#### `mongodb/`

- `mongodb.module.js`: Módulo para inicializar conexiones a MongoDB.
- `mongodb.util.js`: Funciones de utilidad para operaciones de MongoDB.

#### `usuario/`

- `user.controller.js`: Maneja solicitudes relacionadas con los usuarios y delega operaciones a la capa de servicio.
- `user.middleware.js`: Middleware para rutas de usuarios.
- `user.model.js`: Define el modelo de datos del usuario, usando Mongoose.
- `user.module.js`: Agrega funcionalidades relacionadas con el usuario, inicializando controladores y servicios.
- `user.service.js`: Contiene la lógica de negocio para usuarios, interactuando con la base de datos.

### `nbproject/`

- Archivos de configuración para el IDE NetBeans.

### Rutas

- `index.js` & `users.js`: Definen el enrutamiento para la aplicación, con `index.js` para rutas generales y `users.js` para rutas de usuarios.

### Pruebas

#### `fixtures/`

- Datos de prueba para pruebas unitarias e integración.

#### `integración/`

- `user.controller.spec.js`: Pruebas de integración para el controlador de usuarios.

#### `unidad/`

- Pruebas para utilidades de MongoDB y funcionalidades de usuario.

### Vistas

#### `páginas/`

- `index.ejs`: Plantilla de la página principal.

#### `parciales/`

- `footer.ejs`, `head.ejs`, `header.ejs`: Partes de plantilla reutilizables para el diseño de la aplicación.

## Mapeo de la Estructura

| Estructura de la Rúbrica            | Equivalencia en mi Proyecto                               | Descripción                                                                                     |
|-------------------------------------|-----------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| app.js                              | index.ts y app.ts                                         | Archivos principales para inicializar y configurar la aplicación.                               |
| bin                                 | Makefile y docker-compose.yml en la raíz del repo. Scripts individuales en package.json | Herramientas y scripts para construcción y despliegue.                                          |
| config/mongodb/                     | mongo/config/                                             | Configuración de MongoDB y docker-compose para su ejecución.                                    |
| mongodb.module.js                   | src/services/db/index.ts                                  | Inicialización de la base de datos y su configuración. Llamado en app.ts.                       |
| user.controller.js                  | src/controllers/                                          | Contiene los controladores usados en todas las APIs.                                            |
| user.middleware.js                  | src/middlewares/                                          | Contiene los middleware (Autenticación, CORS, Validaciones, etc) usados en todas las APIs.      |
| user.model.js                       | src/models/                                               | Modelos de Mongoose utilizados en todas las APIs.                                               |
| user.service.js                     | src/services/                                             | Servicios usados por los controladores en todas las APIs.                                       |
| Carpeta rutas                       | src/routes/                                               | Contiene las rutas de la aplicación en todas las APIs.                                          |
| Carpeta pruebas                     | /tests/                                                   | Contiene los tests de las APIs.                                                                 |
| Vistas                              | front-cms (React) y front-landing (Astro)                 | Vistas para visualizar la data en tiempo real, desarrolladas en React y Astro respectivamente.  |




