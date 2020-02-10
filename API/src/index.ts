// API/index.ts
import './Setup';
import Koa from 'koa';
import KoaRouter from '@koa/router';
import { ApolloServer } from 'apollo-server-koa';
import { generateGQLSchema } from 'API/Library/generateGQLSchema';
import { ensureDbConnection } from 'API/Library/getDbConnection';
import { getContext } from './Context';
import { config } from './Config';

async function startAPI(): Promise<void> {
  const server = new Koa();
  const serverRouter = new KoaRouter();

  console.log('Starting API');

  const dbConnection = ensureDbConnection();

  const apiServer = new ApolloServer({
    playground: true,
    introspection: true,
    schema: await generateGQLSchema(),
    context: async ({ ctx }) => getContext(ctx),
  });

  apiServer.applyMiddleware({ app: server });

  server.use(serverRouter.routes()).use(serverRouter.allowedMethods());
  const httpServer = await server.listen(config.port);
  apiServer.installSubscriptionHandlers(httpServer);

  await dbConnection;

  console.log(`API running and good to go on port: ${config.port}`);
}

startAPI();
