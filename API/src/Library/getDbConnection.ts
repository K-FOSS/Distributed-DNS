// API/src/Library/getDbConnection.ts
import { config } from 'API/Config';
import { resolve } from 'path';
import { createConnection } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { AlreadyHasActiveConnectionError } from 'typeorm/error/AlreadyHasActiveConnectionError';

export function getConnectionArgs(test = false): PostgresConnectionOptions {
  return {
    type: 'postgres',
    database: test ? 'application-test' : config.db.name,
    username: config.db.username,
    password: config.db.password,
    port: parseInt(`${config.db.port}`, 10),
    host: config.db.host,
    entities: [
      resolve(`${__dirname}/../Modules/**/*Model.ts`),
      resolve(`${__dirname}/../Modules/**/*Model.js`),
    ],
    synchronize: true || config.env === 'development',
    logging: !test,
  };
}

export async function ensureDbConnection() {
  try {
    await createConnection(getConnectionArgs());
  } catch (e) {
    if (!(e instanceof AlreadyHasActiveConnectionError)) {
      throw e;
    }
  }
}
