# Ejemplos de algunas funcionalidades ejecutando en servidor

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
- **filesystem_asynchronous.ts**: ejemplo de uso de funcinoes asíncronas por medio de promesas

Ambos script están preparados para recibir la ruta de la carpeta de la información en el argumento `dataFolder`

```bash
/ejemplos-back  node dist/filesystem_synchronous.js --dataFolder=./data

/ejemplos-back  node dist/filesystem_asynchronous.js --dataFolder=./data
```
