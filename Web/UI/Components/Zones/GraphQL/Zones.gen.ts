import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export const ZonesDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Zones"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"zones"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"domainName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"userPermissions"},"arguments":[],"directives":[]}]}}]}}]}}]};

/**
 * __useZonesQuery__
 *
 * To run a query within a React component, call `useZonesQuery` and pass it any options that fit your needs.
 * When your component renders, `useZonesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useZonesQuery({
 *   variables: {
 *   },
 * });
 */
export function useZonesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ZonesQuery, ZonesQueryVariables>) {
        return ApolloReactHooks.useQuery<ZonesQuery, ZonesQueryVariables>(ZonesDocument, baseOptions);
      }
export function useZonesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ZonesQuery, ZonesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ZonesQuery, ZonesQueryVariables>(ZonesDocument, baseOptions);
        }
export type ZonesQueryHookResult = ReturnType<typeof useZonesQuery>;
export type ZonesLazyQueryHookResult = ReturnType<typeof useZonesLazyQuery>;
export type ZonesQueryResult = ApolloReactCommon.QueryResult<ZonesQuery, ZonesQueryVariables>;
export type ZonesQueryVariables = {};


export type ZonesQuery = (
  { __typename?: 'Query' }
  & { currentUser: Types.Maybe<(
    { __typename?: 'CurrentUser' }
    & Pick<Types.CurrentUser, 'id'>
    & { zones: Array<(
      { __typename?: 'Zone' }
      & Pick<Types.Zone, 'domainName' | 'id' | 'userPermissions'>
    )> }
  )> }
);
