

// Leemos la variable de entorno ENTORNO y si no existe, usamos "dev" por defecto
const environment = process.env.ENTORNO?.toLowerCase().trim() || "dev";

console.log(`Entorno: ${environment}`);

// Leemos las variables de entorno DB_URI, DB_USER y DB_PASSWORD y las guardamos en las variables dbUri, dbUser y dbPassword
const dbUri = process.env.DB_URI?.trim()|| "";
const dbUser = process.env.DB_USER?.trim() || "";
const dbPassword = process.env.DB_PASSWORD?.trim() || "";

console.log(`DB URI: ${dbUri}`);
console.log(`DB User: ${dbUser}`);
console.log(`DB Password: ${dbPassword}`);

// Simulamos una conexión a la base de datos del entorno en que nos encontramos
const connect = (dbUri: string, dbUser:string, dbPassword:string)  => {
    console.log(`Conectando a la base de datos ${dbUri} con el usuario ${dbUser}`);
};

connect(dbUri, dbUser, dbPassword);

