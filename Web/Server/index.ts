// Web/Server/index.ts
import Koa from 'koa';
import KoaRouter from '@koa/router';
import serve from 'koa-static';
import { readJSON } from 'fs-extra';
import { resolve } from 'path';
import universalCookies from 'universal-cookie-koa';
import { initApollo } from './initApollo';
import { hasSetup } from './Configuration';

const setupTEST = (path: string): boolean => /Setup$/.test(path);

const loadServer = async (): Promise<typeof import('./server')> => {
  const manifest = await readJSON(`dist/server/parcel-manifest.json`);
  return require(`${__dirname}${manifest['Server.tsx']}`);
};

async function startWeb(): Promise<void> {
  const server = new Koa();
  const router = new KoaRouter();

  const client = initApollo();

  server.use(universalCookies());

  router.get('*', serve('dist/public'));

  router.get('*', async (ctx, next) => {
    const isSetup = await hasSetup(client).catch(next);
    if (isSetup && setupTEST(ctx.path)) return ctx.redirect('/');
    else if (isSetup) return next();
    else if (!isSetup && !setupTEST(ctx.path)) return ctx.redirect('/Setup');
    else if (/Setup$/.test(ctx.path)) return next();
  });

  router.get('*', async (ctx) => {
    let { uiServer } = await loadServer();
    if (process.env.NODE_ENV !== 'production') {
      const chokidar = await import('chokidar');
      chokidar
        .watch(resolve('dist/server/*'), {
          ignoreInitial: true,
          awaitWriteFinish: { stabilityThreshold: 100 },
        })
        .on('all', async () => {
          process.stdout.write('Reloading UI Server...');
          uiServer = (await loadServer()).uiServer;
          process.stdout.write('✅\n');
        });
    }
    try {
      return uiServer(ctx, { baseUrl: process.env.PUBLIC_URL! });
    } catch {
      ctx.body = 'Error';
    }
  });

  server.use(router.routes()).use(router.allowedMethods());

  server.listen(81, () => console.log(`Server listening on port 80`));
}

startWeb();
