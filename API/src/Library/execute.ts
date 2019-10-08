// API/src/Library/execute.ts
import { Context, getTestContext } from 'API/Context';
import {
  execute as executeGraphql,
  GraphQLSchema,
  parse,
  ExecutionResult,
} from 'graphql';
import { generateGQLSchema } from './generateGQLSchema';

let schema: GraphQLSchema;

export async function execute(
  query: string,
  context?: Context,
): Promise<ExecutionResult<any>> {
  if (!schema) {
    schema = await generateGQLSchema();
  }
  if (!context) {
    context = await getTestContext();
  }
  return executeGraphql(schema, parse(query), null, context);
}
