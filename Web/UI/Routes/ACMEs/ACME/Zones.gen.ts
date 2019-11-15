import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export const AcmeZonesDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ACMEZones"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"zones"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"domainName"},"arguments":[],"directives":[]}]}}]}}]}}]};

/**
 * __useAcmeZonesQuery__
 *
 * To run a query within a React component, call `useAcmeZonesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAcmeZonesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAcmeZonesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAcmeZonesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AcmeZonesQuery, AcmeZonesQueryVariables>) {
        return ApolloReactHooks.useQuery<AcmeZonesQuery, AcmeZonesQueryVariables>(AcmeZonesDocument, baseOptions);
      }
export function useAcmeZonesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AcmeZonesQuery, AcmeZonesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AcmeZonesQuery, AcmeZonesQueryVariables>(AcmeZonesDocument, baseOptions);
        }
export type AcmeZonesQueryHookResult = ReturnType<typeof useAcmeZonesQuery>;
export type AcmeZonesLazyQueryHookResult = ReturnType<typeof useAcmeZonesLazyQuery>;
export type AcmeZonesQueryResult = ApolloReactCommon.QueryResult<AcmeZonesQuery, AcmeZonesQueryVariables>;
export type AcmeZonesQueryVariables = {};


export type AcmeZonesQuery = (
  { __typename?: 'Query' }
  & { currentUser: Types.Maybe<(
    { __typename?: 'CurrentUser' }
    & Pick<Types.CurrentUser, 'id'>
    & { zones: Array<(
      { __typename?: 'Zone' }
      & Pick<Types.Zone, 'id' | 'domainName'>
    )> }
  )> }
);
