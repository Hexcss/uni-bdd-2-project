## Cómo mostrar imágenes almacenadas en una base de datos MongoDB
### 1. Preparación del entorno:
- Asegúrate de tener MongoDB instalado en tu sistema y ejecutándose.
- Instala Node.js y npm en tu sistema si aún no lo has hecho.
- Crea un nuevo proyecto de Node.js utilizando npm init.
- Instala las dependencias necesarias, incluyendo 'mongodb' para trabajar con MongoDB y cualquier otro paquete que necesites para tu aplicación web.

### 2. Definición del esquema:
- Define una interfaz TypeScript que represente la estructura de tus documentos en la colección de MongoDB que contiene las imágenes.
- Incluye un campo para almacenar los datos binarios de la imagen en el tipo Buffer.
```
interface Imagen {
    _id: string;
    nombre: string;
    imagen: Buffer;
    // Otros campos opcionales
}
```
