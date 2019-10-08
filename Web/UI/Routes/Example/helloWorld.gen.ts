import * as Types from '../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const HelloWorldDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HelloWorld"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"helloWorld"},"arguments":[],"directives":[]}]}}]};

    export function useHelloWorldQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<HelloWorldQuery, HelloWorldQueryVariables>) {
      return ApolloReactHooks.useQuery<HelloWorldQuery, HelloWorldQueryVariables>(HelloWorldDocument, baseOptions);
    }
      export function useHelloWorldLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<HelloWorldQuery, HelloWorldQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<HelloWorldQuery, HelloWorldQueryVariables>(HelloWorldDocument, baseOptions);
      }
      
export type HelloWorldQueryHookResult = ReturnType<typeof useHelloWorldQuery>;
export type HelloWorldQueryResult = ApolloReactCommon.QueryResult<HelloWorldQuery, HelloWorldQueryVariables>;export type HelloWorldQueryVariables = {};


export type HelloWorldQuery = (
  { __typename?: 'Query' }
  & Pick<Types.Query, 'helloWorld'>
);
