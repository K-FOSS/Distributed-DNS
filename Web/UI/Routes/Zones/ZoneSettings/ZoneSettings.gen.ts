import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export const ZoneSettingsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ZoneSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"zoneId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"zone"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"zoneId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"zoneId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"domainName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"accessPermissions"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"username"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"accessPermissions"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"zoneSettings"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"contact"},"arguments":[],"directives":[]}]}}]}}]}}]};

/**
 * __useZoneSettingsQuery__
 *
 * To run a query within a React component, call `useZoneSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useZoneSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useZoneSettingsQuery({
 *   variables: {
 *      zoneId: // value for 'zoneId'
 *   },
 * });
 */
export function useZoneSettingsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ZoneSettingsQuery, ZoneSettingsQueryVariables>) {
        return ApolloReactHooks.useQuery<ZoneSettingsQuery, ZoneSettingsQueryVariables>(ZoneSettingsDocument, baseOptions);
      }
export function useZoneSettingsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ZoneSettingsQuery, ZoneSettingsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ZoneSettingsQuery, ZoneSettingsQueryVariables>(ZoneSettingsDocument, baseOptions);
        }
export type ZoneSettingsQueryHookResult = ReturnType<typeof useZoneSettingsQuery>;
export type ZoneSettingsLazyQueryHookResult = ReturnType<typeof useZoneSettingsLazyQuery>;
export type ZoneSettingsQueryResult = ApolloReactCommon.QueryResult<ZoneSettingsQuery, ZoneSettingsQueryVariables>;
export type ZoneSettingsQueryVariables = {
  zoneId: Types.Scalars['String']
};


export type ZoneSettingsQuery = (
  { __typename?: 'Query' }
  & { zone: (
    { __typename?: 'Zone' }
    & Pick<Types.Zone, 'id' | 'domainName'>
    & { accessPermissions: Array<(
      { __typename?: 'ZonePermissions' }
      & Pick<Types.ZonePermissions, 'id' | 'accessPermissions'>
      & { user: (
        { __typename?: 'User' }
        & Pick<Types.User, 'id' | 'username'>
      ) }
    )>, zoneSettings: (
      { __typename?: 'ZoneSettings' }
      & Pick<Types.ZoneSettings, 'id' | 'contact'>
    ) }
  ) }
);
