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
### 3. Conexión a la base de datos:
- Utiliza el cliente MongoDB para TypeScript para conectarte a tu base de datos MongoDB.
```
import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';
const dbName = 'nombre_de_la_base_de_datos';

const cliente = new MongoClient(url);

cliente.connect().then(() => {
    console.log('Conexión a MongoDB establecida correctamente');
}).catch(error => {
    console.error('Error al conectar a MongoDB:', error);
});
```
### 4. Consulta de la base de datos:
- Utiliza métodos de MongoDB para TypeScript, como findOne o find, para recuperar los documentos que contienen las imágenes que deseas mostrar.
```
const db = cliente.db(dbName);
const coleccion = db.collection<Imagen>('nombre_de_la_coleccion');

const imagen = await coleccion.findOne({ _id: 'id_de_la_imagen' });
```

### 5. Mostrar la imagen:
- Utiliza el framework web de tu elección (por ejemplo, Express.js) para configurar una ruta que maneje las solicitudes para mostrar imágenes.
- Convierte los datos binarios de la imagen en Base64.
- Responde con una etiqueta < img > en HTML que incluya la URL Base64 de la imagen.
```
import express from 'express';

const app = express();

app.get('/imagen/:id', async (req, res) => {
    const imagenId = req.params.id;
    const imagen = await coleccion.findOne({ _id: imagenId });

    if (!imagen) {
        res.status(404).send('Imagen no encontrada');
        return;
    }

    const imagenBase64 = imagen.imagen.toString('base64');
    const imagenDataUrl = `data:image/jpeg;base64,${imagenBase64}`;

    res.send(`<img src="${imagenDataUrl}" alt="Imagen">`);
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
```

### 6. Verificación:
- Inicia tu aplicación web y visita la URL donde has configurado la ruta para mostrar imágenes.
- Verifica que las imágenes se muestren correctamente en el navegador.

