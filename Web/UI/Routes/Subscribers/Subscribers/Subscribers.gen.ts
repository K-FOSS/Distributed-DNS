import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export const SubscribersDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Subscribers"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"username"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"subscribers"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]}]}}]}}]}}]};

/**
 * __useSubscribersQuery__
 *
 * To run a query within a React component, call `useSubscribersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubscribersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribersQuery({
 *   variables: {
 *   },
 * });
 */
export function useSubscribersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SubscribersQuery, SubscribersQueryVariables>) {
        return ApolloReactHooks.useQuery<SubscribersQuery, SubscribersQueryVariables>(SubscribersDocument, baseOptions);
      }
export function useSubscribersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SubscribersQuery, SubscribersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SubscribersQuery, SubscribersQueryVariables>(SubscribersDocument, baseOptions);
        }
export type SubscribersQueryHookResult = ReturnType<typeof useSubscribersQuery>;
export type SubscribersLazyQueryHookResult = ReturnType<typeof useSubscribersLazyQuery>;
export type SubscribersQueryResult = ApolloReactCommon.QueryResult<SubscribersQuery, SubscribersQueryVariables>;
export type SubscribersQueryVariables = {};


export type SubscribersQuery = (
  { __typename?: 'Query' }
  & { currentUser: Types.Maybe<(
    { __typename?: 'CurrentUser' }
    & Pick<Types.CurrentUser, 'id' | 'username'>
    & { subscribers: Array<(
      { __typename?: 'Subscriber' }
      & Pick<Types.Subscriber, 'id' | 'type' | 'name'>
    )> }
  )> }
);
