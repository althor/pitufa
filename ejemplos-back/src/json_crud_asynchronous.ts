import { resolve, join } from 'path';
import fs from 'fs/promises';
import minimist from 'minimist';
import { User } from './model/user';

// Ejemplo de operaciones CRUD usando un fichero json simulando base de datos - operaciones asíncronas

const argv = minimist(process.argv.slice(2));

const dataFolder = argv.dataFolder || 'unknown';
const dataFolderPath = resolve(dataFolder);

const filePath = join(dataFolderPath, 'db.users.json');

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

const updateUser = async (user: User): Promise<void> => {
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

let usuario = await getUser(3);
console.log(usuario);
