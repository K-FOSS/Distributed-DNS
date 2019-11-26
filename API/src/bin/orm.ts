import '../Setup';

/* eslint-disable import/first */
import fs from 'fs-extra';

import { resolve } from 'path';
import { run } from './lib/run';
import { getConnectionArgs } from '../Library/getDbConnection';
import { config } from 'API/Config';
/* eslint-enable */

const cmd = process.env.NODE_ENV === 'production' ? 'node' : 'ts-node';

const apiDir = resolve(__dirname, '..');
const ormConfigDir = resolve(apiDir, 'local');
const ormConfigPath = resolve(ormConfigDir, 'ormconfig.tmp.json');

async function main() {
  const ormConfig = getConnectionArgs();
  console.log(config);
  await fs.mkdirp(ormConfigDir);
  await fs.writeFile(
    ormConfigPath,
    JSON.stringify({
      ...ormConfig,
      migrations: ['migrations/*.js', 'migrations/*.ts'],
      cli: {
        migrationsDir: 'migrations',
      },
    }),
    {
      encoding: 'utf8',
    },
  );
  try {
    await run(
      [
        cmd,
        `-r '${resolve(`${apiDir}/Setup.ts`)}'`,
        `'${resolve(apiDir, '../node_modules/typeorm/cli.js')}'`,
        ...process.argv.slice(2),
        `--config=${ormConfigPath.replace(apiDir, '.')}`,
      ],
      apiDir,
    );
  } catch (e) {
    process.exit(1);
  }
  await fs.unlink(ormConfigPath);
}

main();
