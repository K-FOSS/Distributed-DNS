import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export const ZoneDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Zone"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"zoneId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"zone"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"zoneId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"zoneId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"domainName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"userPermissions"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"resourceRecords"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"ttl"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"host"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"data"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"zoneSettings"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"contact"},"arguments":[],"directives":[]}]}}]}}]}}]};

/**
 * __useZoneQuery__
 *
 * To run a query within a React component, call `useZoneQuery` and pass it any options that fit your needs.
 * When your component renders, `useZoneQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useZoneQuery({
 *   variables: {
 *      zoneId: // value for 'zoneId'
 *   },
 * });
 */
export function useZoneQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ZoneQuery, ZoneQueryVariables>) {
        return ApolloReactHooks.useQuery<ZoneQuery, ZoneQueryVariables>(ZoneDocument, baseOptions);
      }
export function useZoneLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ZoneQuery, ZoneQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ZoneQuery, ZoneQueryVariables>(ZoneDocument, baseOptions);
        }
export type ZoneQueryHookResult = ReturnType<typeof useZoneQuery>;
export type ZoneLazyQueryHookResult = ReturnType<typeof useZoneLazyQuery>;
export type ZoneQueryResult = ApolloReactCommon.QueryResult<ZoneQuery, ZoneQueryVariables>;
export type ZoneQueryVariables = {
  zoneId: Types.Scalars['String']
};


export type ZoneQuery = (
  { __typename?: 'Query' }
  & { zone: (
    { __typename?: 'Zone' }
    & Pick<Types.Zone, 'id' | 'domainName' | 'userPermissions'>
    & { resourceRecords: Array<(
      { __typename?: 'ResourceRecord' }
      & Pick<Types.ResourceRecord, 'id' | 'ttl' | 'host' | 'data' | 'type'>
    )>, zoneSettings: (
      { __typename?: 'ZoneSettings' }
      & Pick<Types.ZoneSettings, 'id' | 'contact'>
    ) }
  ) }
);
