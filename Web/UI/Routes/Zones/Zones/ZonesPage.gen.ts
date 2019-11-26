import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export const ZonesPageDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ZonesPage"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"username"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"zones"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"domainName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"userPermissions"},"arguments":[],"directives":[]}]}}]}}]}}]};

/**
 * __useZonesPageQuery__
 *
 * To run a query within a React component, call `useZonesPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useZonesPageQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useZonesPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useZonesPageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ZonesPageQuery, ZonesPageQueryVariables>) {
        return ApolloReactHooks.useQuery<ZonesPageQuery, ZonesPageQueryVariables>(ZonesPageDocument, baseOptions);
      }
export function useZonesPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ZonesPageQuery, ZonesPageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ZonesPageQuery, ZonesPageQueryVariables>(ZonesPageDocument, baseOptions);
        }
export type ZonesPageQueryHookResult = ReturnType<typeof useZonesPageQuery>;
export type ZonesPageLazyQueryHookResult = ReturnType<typeof useZonesPageLazyQuery>;
export type ZonesPageQueryResult = ApolloReactCommon.QueryResult<ZonesPageQuery, ZonesPageQueryVariables>;
export type ZonesPageQueryVariables = {};


export type ZonesPageQuery = (
  { __typename?: 'Query' }
  & { currentUser: Types.Maybe<(
    { __typename?: 'CurrentUser' }
    & Pick<Types.CurrentUser, 'id' | 'username'>
    & { zones: Array<(
      { __typename?: 'Zone' }
      & Pick<Types.Zone, 'id' | 'domainName' | 'userPermissions'>
    )> }
  )> }
);
