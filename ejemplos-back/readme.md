# Ejemplos de algunas funcionalidades ejecutando en servidor

- [Acceso a variables de entorno](#acceso-a-variables-de-entorno)
- [Lectura de argumentos de ejecución](#lectura-de-argumentos-de-ejecución)
- [Acceso al sistema de ficheros](#acceso-al-sistema-de-ficheros)
- [CRUD sobre datos JSON](#crud-sobre-datos-json)

## Acceso a variables de entorno

Las variables de entorno son parejas nombre-texto que existen en el sistema operativo y permiten usarlas para parametrizar y configurar el funcionamiento de una aplicación.

Por ejemplo:

- configurar los datos de conexión a las bases de datos
- configurar las url's de servicios remotos con los que se necesite comunicar
- configurar el nivel de log para generar más detalle en desarrollo pero no en producción

### Consulta de variables de entorno existentes

En terminal `linux` ejecutando el comando `env`

```bash
 ~  env
LANGUAGE=en_US:
LANG=en_US.UTF-8
M2_HOME=/opt/maven
LC_TELEPHONE=es_ES.UTF-8
...
```

Para consultar el valor de una variable de entorno concreta utilizamos `echo $<variable>`

```bash
 ~  echo $TERM
xterm-256color
```

### Declarar una variable de entorno

Se declaran usando el comando `export <variable> = <texto>`

```bash
 ~  export DB_URI="jdbc:mysql://localhost:3306/"
 ~  export DB_USER="root"
 ~  export DB_PASSWORD="45678913";
```

### Lectura de variables de entorno desde script javascript

Están accesibles a través de la expresión `process.env.<nombre_variable>`

Ejemplo: Leer la variable en la que configuramos la url de la base de datos. Suponiendo que la hemos configurado en una variable de entorno llamada `DB_URI`.

```javascript
const dbUri = process.env.DB_URI?.trim() || '';
```

## Lectura de argumentos de ejecución

Los arugmentos pasados al script en el momento de ejcución son similares a las variables de entorno.

La diferencia radica en que las variables de entorno exportadas en la sesión del terminal están disponibles para todo comando que se ejecute en esa sesión, y los argumentos de un comando se pasan explícitamente a ese comando.

Por ejemplo, el argumento `-l` al comando `ls`

```bash
~  ls -l
```

#### Lectura de argumentos de ejecución

Los argumentos pasados al script en el momento de ejecución quedan accesibles en `process.argv`

Un modo fácil de recuperarlos desde el script es usar la librería `minimist` https://www.npmjs.com/package/minimist

Una vez que los hemos parseado con `minimist` están accesibles a través del nombre textual de cada argumento.

Ejemplo: Parseamos los argumentos de la línea de comandos y accedemos a los valores de `dbUri`, `dbUser` y `dbPassword`

```typescript
const argv = minimist(process.argv.slice(2));
const dbUri = argv.dbUri || 'unknown';
const dbUser = argv.dbUser || 'unknown';
const dbPassword = argv.dbPassword || 'unknown';
```

Podemos configurar el parseo que ejecuta `minimist` pasándole en un segundo argumento un objeto de configuración. Para indicarle con qué tipo primitivo se debe interpretar cada argumento.

Ejemplo: Congiruamos minimist para que interpete el argumento `enableLog` como booleano

```typescript
const argv = minimist(process.argv.slice(2), {
  boolean: ['enableLog'],
});

const enableLog: boolean = argv.enableLog || false;

console.log(`El log está ${enableLog ? 'habilitado' : 'deshabilitado'}`);
```

**Nota**: Se hace slice(2) porque los dos primeros argumentos no suelen interesar. Son:

- path de nodejs
- path del script que se está ejecutando

#### Ejemplo de invocación

Ejemplo en que ejecutamos un script pasando valores en los argumentos `dbUri`, `dbUser` y `dbPassword` para configurar los datos de conexión a la base de datos.

```bash
 ~ node dist/arguments.js --dbUri="jdbc:mysql://localhost:3306/" --dbUser=root --dbPassword=296835 --enableLog
```

## Acceso al sistema de ficheros

El módulo **fs** de Node incluye las principales funciones para trabajar con ficheros y directorios. Algunas de las funciones más comunes son:

- fs.readFile() to read a file
- fs.writeFile() to write a file
- fs.mkdir() to create a new directory
- fs.readdir() to read the contents of a directory
- fs.stat() to get information about a file
- fs.unlink() to delete a file
- fs.rename() to rename a file
- fs.exists() to check if a file exists

El módulo **path** proporciona las funciones para recorrer el árbol de carpetas del sistema de ficheros.

- path.resolve() permite obtener la ruta absoluta a un fichero o directorio

### Lectura de fichero

Para leer un fichero de forma síncrona se usa `fs.readFileSync()`, y para leerlo de forma asíncrona se usa `fs.readFile()`.

En el caso **síncrono**, se pasa la ruta del fichero y la codificación del fichero, que por defecto es utf-8. El resultado es un string con el contenido del fichero.

```typescript
import fs from 'fs';

const content = fs.readFileSync(filePath, 'utf-8');
console.log(content);
```

Si no se incluye la codificación, el resultado es un buffer con el contenido del fichero, del que se pueden obtener los datos en formato binario o convertirlos a string con el método toString.

```typescript
import fs from 'fs';
const content = fs.readFileSync(filePath);
console.log(content.toString());
```

En el caso **asíncrono** se usa el paquete `fs/promises` que proporcion las funciones equivalentes que devuelven un objeto `Promise`

```typescript
import fs from 'fs/promises';

const readPromise = fs.readFile(filePath, 'utf-8');
readPromise.then((content) => console.log(content));
```

### Escritura de fichero

Para leer un fichero de forma síncrona se usa `fs.writeFileSync()`, y para leerlo de forma asíncrona se usa `fs.writeFile()`.

En el caso **síncrono**, se pasa la ruta del fichero, el contenido y la codificación del fichero, que por defecto es utf-8.

```typescript
import fs from 'fs';

fs.writeFileSync(usersOutFilePath, content, 'utf-8');
```

En el caso **asíncrono** se usa el paquete `fs/promises` que proporcion las funciones equivalentes que devuelven un objeto `Promise`

```typescript
import fs from 'fs/promises';

const writePromise = fs.writeFile(usersOutFilePath, content, 'utf-8');
writePromise.then(() => console.log('Fichero escrito!!'));
```

### Ejemplos

- **filesystem_synchronous.ts** : ejemplo de uso de funciones síncronas
- **filesystem_asynchronous.ts**: ejemplo de uso de funcione asíncronas por medio de promesas

Ambos script están preparados para recibir la ruta de la carpeta de la información en el argumento `dataFolder`

```bash
/ejemplos-back  node dist/filesystem_synchronous.js --dataFolder=./data

/ejemplos-back  node dist/filesystem_asynchronous.js --dataFolder=./data
```

## CRUD sobre datos JSON

Esto proviene del fichero `<repo del profesor>/9.Node/info/info.node.md`

El formato **JSON** es muy común para almacenar datos en ficheros, ya que es fácil de leer y escribir, y se puede convertir a objetos de JavaScript de forma sencilla. Es posible usar un fichero JSON para almacenar datos de forma persistente, como si fuera una base de datos, implementando como un servicio las operaciones **CRUD** (Create, Read, Update, Delete) sobre los datos.

El fichero puede crearse de forma manual, pero también se puede crear de forma automática si no existe, para lo que se puede usar el método `fs.existsSync()` para comprobar si el fichero existe, y `fs.writeFileSync()` para crearlo.

```typescript
import fs from 'fs';
import { fileURLToPath } from 'url';

const filePath = fileURLToPath(
  new URL('../data/notes.db.json', import.meta.url),
);
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, '[]', 'utf-8');
}
```

El fichero se está creando en la carpeta data, que se debe crear manualmente, fuera de dist, para hacer posible su subida a GitHub. Al inicializarla como un array vacío, y tratándose de una operación que solo se ejecuta una vez, no es necesario que sea asíncrona.

Como servicio podemos crear los métodos que permitan realizar las operaciones CRUD sobre los datos del fichero JSON, es decir que leen, escriben, insertan y borran, como un ORM/ODM básico para nuestro fichero JSON.

### Modelo de datos

Para trabajar con los datos del fichero JSON, se puede definir un modelo de datos que represente la estructura de los datos. En este caso, se puede usar un _tipo / interfaz_ de TypeScript para definir la estructura de los datos de las notas. O como _clase_ si se necesita más "potencia", por ejemplo poder crear instancias mediante `new`.

```typescript
export interface User {
  id: string;
  username: string;
  mail: string;
  pwd: string;
}
```

```typescript
export type User {
  id: string;
  username: string;
  mail: string;
  pwd: string;
}
```

o como clase

```typescript
export class User {
  id: number;
  username: string;
  mail: string;
  pwd: string;

  constructor(id: number, username: string, mail: string, pwd: string) {
    this.id = id;
    this.username = username;
    this.mail = mail;
    this.pwd = pwd;
  }
}
```

### Operaciones

Para realizar las operaciones CRUD sobre los datos del fichero JSON, se pueden definir los métodos que permitan leer, escribir, insertar y borrar datos del fichero.

```typescript
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { Note } from './note.model';

const readUsers = async (): Promise<User[]> => {
  const content = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(content);
};

export const writeUsers = async (users: User[]): Promise<void> => {
  await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf-8');
};

const getUser = async (id: number) => {
  const users = await readUsers();
  return users.find((x: User) => x.id === id);
};

const createUser = async (user: User) => {
  const users = await readUsers();
  users.push(user);
  await writeUsers(users);
};

const updateUser = async (id: number, user: User): Promise<void> => {
  const users = await readUsers();
  const index = users.findIndex((n: User) => n.id === user.id);
  if (index === -1) {
    throw new Error(`Note with id ${user.id} not found`);
  }
  users[index] = user;
  await writeUsers(users);
};

const deleteUser = async (id: number) => {
  const users = await readUsers();
  const index = users.findIndex((n: User) => n.id === id);
  if (index === -1) {
    throw new Error(`Note with id ${id} not found`);
  }
  users.splice(index, 1);
  await writeUsers(users);
};
```

#### Ejemplos

- **json_crud_synchronous.ts** : ejemplo de uso de funciones síncronas
- **json_crud_asynchronous.ts**: ejemplo de uso de funcione asíncronas por medio de promesas

Ambos script están preparados para recibir la ruta de la carpeta de la información en el argumento `dataFolder`

```bash
/ejemplos-back  node dist/json_crud_synchronous.ts --dataFolder=./data

/ejemplos-back  node dist/json_crud_asynchronous.ts --dataFolder=./data
```

### Abstracción, Uso de Genéricos

Para hacer el servicio más genérico, abstraer el tipo de datos y permitir trabajar con cualquier tipo de datos, se puede usar un tipo genérico en lugar de un tipo específico.

```typescript
const filePath = join(dataFolderPath, 'db.users.json');

const read = async <T>(): Promise<T[]> => {
  const content = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(content);
};

const write = async <T>(entities: T[]): Promise<void> => {
  await fs.writeFile(filePath, JSON.stringify(entities, null, 2), 'utf-8');
};

const getEntity = async <T extends { id: number }>(id: number) => {
  const entities = await read<T>();
  return entities.find((x: T) => x.id === id);
};

const createEntity = async <T>(entity: T) => {
  const entities = await read<T>();
  entities.push(entity);
  await write<T>(entities);
};

const updatEntity = async <T extends { id: number }>(
  user: T,
): Promise<void> => {
  const entities = await read<T>();
  const index = entities.findIndex((n: T) => n.id === user.id);
  if (index === -1) {
    throw new Error(`Note with id ${user.id} not found`);
  }
  entities[index] = user;
  await write<T>(entities);
};

const deleteEntity = async <T extends { id: number }>(id: number) => {
  const entities = await read<T>();
  const index = entities.findIndex((n: T) => n.id === id);
  if (index === -1) {
    throw new Error(`Note with id ${id} not found`);
  }
  entities.splice(index, 1);
  await write(entities);
};
```

##### Ejemplos

- **json_crud_generic.js**: ejemplo de uso de funcione asíncronas por medio de promesas implementado con tipo genérico, parametrizado en cada función.

Ambos script están preparados para recibir la ruta de la carpeta de la información en el argumento `dataFolder`

```bash
/ejemplos-back  node dist/json_crud_generic.ts --dataFolder=./data
```
