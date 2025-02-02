import { resolve, join } from 'path';
import fs from 'fs';
import minimist from 'minimist';
import { User } from './model/user';

// Ejemplo de operaciones CRUD usando un fichero json simulando base de datos - operaciones síncronas

const argv = minimist(process.argv.slice(2));

const dataFolder = argv.dataFolder || 'unknown';
const dataFolderPath = resolve(dataFolder);

const filePath = join(dataFolderPath, 'db.users.json');

const readUsers = () => {
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
};

export const writeUsers = (users: User[]) => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');
};

const getUser = (id: number) => {
  const users = readUsers();
  return users.find((x: User) => x.id === id);
};
const createUser = (user: User) => {
  const users = readUsers();
  users.push(user);
  writeUsers(users);
};

const updateUser = (user: User) => {
  const users = readUsers();
  const index = users.findIndex((n: User) => n.id === user.id);
  if (index === -1) {
    throw new Error(`Note with id ${user.id} not found`);
  }
  users[index] = user;
  writeUsers(users);
};

const deleteUser = (id: number) => {
  const users = readUsers();
  const index = users.findIndex((n: User) => n.id === id);
  if (index === -1) {
    throw new Error(`Note with id ${id} not found`);
  }
  users.splice(index, 1);
  writeUsers(users);
};

let usuario = getUser(3);
console.log(usuario);
