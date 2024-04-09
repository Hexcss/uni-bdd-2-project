## Cómo hacer un filtro a las queries de MongoDB
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

### 4. Realización de consultas con filtros:
- Utiliza métodos de la colección de MongoDB, como find(), para realizar consultas con filtros.
```
const db = cliente.db(dbName);
const coleccion = db.collection('nombre_de_la_coleccion');

// Ejemplo de consulta con filtro para encontrar documentos que coincidan con ciertos criterios
const filtro = { campo: valor };
const resultados = await coleccion.find(filtro).toArray();

console.log('Resultados de la consulta:', resultados);
```

### 5. Utilización de operadores de comparación:
- Puedes utilizar operadores de comparación como $eq, $gt, $lt, $gte, $lte, etc., para realizar consultas más específicas.
```
// Ejemplo de consulta con filtro usando operadores de comparación
const filtro = { edad: { $gte: 18 } };
const resultados = await coleccion.find(filtro).toArray();
```

### 6. Combinación de condiciones:
- Puedes combinar múltiples condiciones utilizando los operadores lógicos $and, $or, $nor, etc.
```
// Ejemplo de consulta con filtro utilizando operadores lógicos
const filtro = {
    $and: [
        { edad: { $gte: 18 } },
        { ciudad: 'Barcelona' }
    ]
};
const resultados = await coleccion.find(filtro).toArray();
```

### 7. Verificación:
- Verifica los resultados de la consulta para asegurarte de que estén de acuerdo con los criterios de filtro especificados.