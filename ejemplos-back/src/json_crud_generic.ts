import { resolve, join } from 'path';
import fs from 'fs/promises';
import minimist from 'minimist';

// Ejemplo de operaciones CRUD usando un fichero json simulando base de datos - implementado de manera genérica - operaciones asíncronas
// Al estar implementado con tipo genérico en las clases se adapta a cualquier tipo de objeto que contenta un atributo 'id' de tipo 'number'

// Observa que al ser genérico ni siquiera hace falta el import del tipo User

const argv = minimist(process.argv.slice(2));

const dataFolder = argv.dataFolder || 'unknown';
const dataFolderPath = resolve(dataFolder);

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

let usuario = await getEntity(3);
console.log(usuario);
