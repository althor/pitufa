import * as mysql from "mysql";
import { Connection } from "mysql";
import createDebug from "debug";

const debug = createDebug("myapp:db");

let connection: Connection;

export const connect = () => {
  connection = mysql.createConnection({
    host: "localhost",
    user: process.env.DBUSER,
    password: process.env.DBPWD,
    database: "test",
  });

  connection.connect((err) => {
    if (err) {
      throw err;
    }

    debug("connected");
  });
};

// Las funciones de ejecución de queries de la librería mysql esperan una función de callback que reciba tres parámetros:
// En la función de callback se reciben:
// error will be an Error if one occurred during the query
// results will contain the results of the query
// fields will contain information about the returned results fields (if any)

// Método para ejecutar insert o update. Devuelve el id del registro insertado
export function runQuery(query: string): Promise<number> {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results, fields) => {
      if (error) reject(error);
      resolve(results.insertId);
    });
  });
}

// Método para ejecutar una query de borrado. Comprueba si se ha borrado una fila y devuelve booleano indicando si se ha borrado o no.
export function runDeleteQuery(query: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results, fields) => {
      if (error) reject(error);
      resolve(results.affectedRows > 0);
    });
  });
}

// Método para ejecutar select que devuelve varias filas
export function getAllRows(query: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results, fields) => {
      if (error) {
        debug(error);
        reject(error);
      } else {
        debug(results);
        resolve(results);
      }
    });
  });
}

// Método para ejecutar select que devuelve una única fila
// En la función de callback se reciben:
// error will be an Error if one occurred during the query
// results will contain the results of the query
// fields will contain information about the returned results fields (if any)
export function getOneRow(query: string): Promise<any> {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        debug(results);
        resolve(results[0]);
      }
    });
  });
}
