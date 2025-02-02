import minimist from 'minimist';

//Ejemplo de lectura de argumentos en Node.js

const argv = minimist(process.argv.slice(2));

// Access the arguments
const dbUri = argv.dbUri || 'unknown';
const dbUser = argv.dbUser || 'unknown';
const dbPassword = argv.dbPassword || 'unknown';

console.log(`DB URI: ${dbUri}`);
console.log(`DB User: ${dbUser}`);
console.log(`DB Password: ${dbPassword}`);

// Simulamos una conexión a la base de datos del entorno en que nos encontramos
const connect = (dbUri: string, dbUser: string, dbPassword: string) => {
  console.log(
    `Conectando a la base de datos ${dbUri} con el usuario ${dbUser} usando la contraseña ${dbPassword}`,
  );
};

connect(dbUri, dbUser, dbPassword);
