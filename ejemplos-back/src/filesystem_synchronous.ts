import { resolve, join } from 'path';
import fs from 'fs';
import minimist from 'minimist';

//Ejemplo de uso del sistema de ficheros a través de las funciones en modo síncrono

const argv = minimist(process.argv.slice(2));

const dataFolder = argv.dataFolder || 'unknown';

//Ejemplo de uso de módulos de Node.js para manejo de archivos y directorios

// Construimos la ruta a la carpeta donde se guardarán los datos
const dataFolderPath = resolve(dataFolder);
console.log(dataFolderPath);

// Construimos la ruta al fichero 'users.csv'
const usersFilePath = join(dataFolderPath, 'users.csv');

//Lectura síncrona
const content = fs.readFileSync(usersFilePath, 'utf-8');
console.log(content);

// Construimos la ruta al fichero 'users_out.csv'
const usersOutFilePath = join(dataFolderPath, 'users_out.csv');

// Escritura síncrona
fs.writeFileSync(usersOutFilePath, content, 'utf-8');
console.log('Fichero escrito!!');
