// Scripts/GraphQLCodegen/src/index.ts
import { watch } from 'chokidar';
import pDebounce from 'p-debounce';
import { run } from './run';

export const DATA_PATH = process.env.DATA_PATH || '/data/';

async function startCodeGen(): Promise<void> {
  const watcher = watch(`${DATA_PATH}/**/*.graphql`, { ignoreInitial: true });

  watcher.on(
    'all',
    pDebounce(() => run(['npm run gen'], DATA_PATH), 1000, { leading: true })
  );
}

startCodeGen();
