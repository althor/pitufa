import { IDatabase } from "pg-promise";
import pgPromise from "pg-promise"; // pg-promise core library
import { IResult } from "pg-promise/typescript/pg-subset";
import createDebug from "debug";

const debug = createDebug("myapp:db");
let db: IDatabase<any>;

export const connect = () => {
  const pgp = pgPromise({});
  const user = process.env.DBUSER;
  const pwd = process.env.DBPWD;
  db = pgp(
    `postgresql://${user}:${pwd}@aws-0-eu-central-1.pooler.supabase.com:5432/postgres`
  );
};

// Método para ejecutar insert o update. Devuelve el id del registro insertado
export async function runQuery(query: string) {
  try {
    const result = await db.one(query);
    debug(result);
    return result.id;
  } catch (e) {
    return false;
  }
}

// Método para ejecutar una query de borrado. Comprueba si se ha borrado una fila y devuelve booleano indicando si se ha borrado o no.
export async function runDeleteQuery(query: string) {
  try {
    const result: IResult = await db.result(query);
    return result.rowCount > 0;
  } catch (e) {
    throw e;
  }
}

// Método para ejecutar select que devuelve varias filas
export async function getAllRows(query: string): Promise<any[]> {
  try {
    debug("ejecutando query: ", query);
    const row = await db.any(query);
    debug(row);
    return row;
  } catch (e) {
    throw e;
  }
}

// Método para ejecutar select que devuelve una única fila
export async function getOneRow(query: string) {
  try {
    const row = await db.one(query);
    return row;
  } catch (e) {
    throw e;
  }
}
