// API/Library/getGraphQLSchema.ts
import { GraphQLSchema } from 'graphql';
import { resolve } from 'path';
import { buildSchema } from 'type-graphql';
import { authChecker } from 'API/Modules/Auth/AuthChecker';

export function generateGQLSchema(): Promise<GraphQLSchema> {
  return buildSchema({
    resolvers: [
      resolve(`${__dirname}/../Modules/**/*Resolver.ts`),
      resolve(`${__dirname}/../Modules/**/*Resolver.js`),
    ],
    authChecker,
    emitSchemaFile: '../API.graphql',
  });
}
