## Cómo hacer un filtro a las queries de mongoDB
### 1. Preparación del entorno:
- Asegúrate de tener MongoDB instalado y ejecutándose en tu sistema.
- Crea un proyecto de TypeScript si aún no lo has hecho.

### 2. Instalación de las dependencias:
- Instala el controlador oficial de MongoDB para TypeScript, 'mongodb', utilizando npm:
```
npm install mongodb
```

### 3. Conexión a la base de datos:
- Importa MongoClient de la biblioteca mongodb en tu archivo TypeScript.
- Conecta tu aplicación a la base de datos MongoDB utilizando MongoClient.
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
