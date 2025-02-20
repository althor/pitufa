import * as mysql from "mysql2/promise";
import { Connection, ResultSetHeader } from "mysql2/promise";
import createDebug from "debug";

const debug = createDebug("myapp:db");

let connection: Connection;

export const connect = async () => {
  connection = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: process.env.DBUSER,
    password: process.env.DBPWD,
    database: "test",
  });

  // connection
  //   .connect()
  //   .then(() => debug("connected"))
  //   .catch((err) => {
  //     throw err;
  //   });
};

// Las funciones de ejecución de queries de la librería mysql esperan una función de callback que reciba tres parámetros:
// En la función de callback se reciben:
// error will be an Error if one occurred during the query
// results will contain the results of the query
// fields will contain information about the returned results fields (if any)

// Método para ejecutar insert o update. Devuelve el id del registro insertado
export async function runQuery(query: string) {
  const [result] = await connection.query<ResultSetHeader>(query);
  debug("Result: ", result);
  return result.insertId;
}

// Método para ejecutar una query de borrado. Comprueba si se ha borrado una fila y devuelve booleano indicando si se ha borrado o no.
export async function runDeleteQuery(query: string) {
  const [result] = await connection.query<ResultSetHeader>(query);
  debug("Result: ", result);
  return result.affectedRows > 0;
}

// Método para ejecutar select que devuelve varias filas
export async function getAllRows(query: string) {
  const q = `select genere_id as id, name from generes where genere_id = ?`;
  const [rows] = await connection.query<any[]>(query);
  debug("estructura de rows", rows);
  return rows;
}

// Método para ejecutar select que devuelve una única fila
// En la función de callback se reciben:
// error will be an Error if one occurred during the query
// results will contain the results of the query
// fields will contain information about the returned results fields (if any)
export async function getOneRow(query: string) {
  const q = `select genere_id as id, name from generes where genere_id = ?`;
  const [rows] = await connection.query<any[]>(query);
  debug("estructura de rows", rows);
  return rows[0];
}
