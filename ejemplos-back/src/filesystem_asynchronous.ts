import { resolve, join } from 'path';
import minimist from 'minimist';
import fs from 'fs/promises';

//Ejemplo de uso del sistema de ficheros a través de las funciones en modo síncrono

const argv = minimist(process.argv.slice(2));

const dataFolder = argv.dataFolder || 'unknown';

//Ejemplo de uso de módulos de Node.js para manejo de archivos y directorios

// Construimos la ruta a la carpeta donde se guardarán los datos
const dataFolderPath = resolve(dataFolder);
console.log(dataFolderPath);

// Construimos la ruta al fichero 'users.csv'
const usersFilePath = join(dataFolderPath, 'users.csv');

//Lectura asíncrona
const readPromise = fs.readFile(usersFilePath, 'utf-8');
readPromise.then((content) => {
  console.log(content);
  processContent(content);
});

function processContent(content: string) {
  // Construimos la ruta al fichero 'users_out.csv'
  const usersOutFilePath = join(dataFolderPath, 'users_out.csv');

  // Escritura asíncrona
  const writePromise = fs.writeFile(usersOutFilePath, content, 'utf-8');
  writePromise.then(() => console.log('Fichero escrito!!'));
}
