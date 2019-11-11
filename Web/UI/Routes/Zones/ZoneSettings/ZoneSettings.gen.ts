import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const ZoneSettingsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ZoneSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"zoneId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"zone"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"zoneId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"zoneId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"domainName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"zoneSettings"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]}]}}]}}]}}]};

    export function useZoneSettingsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ZoneSettingsQuery, ZoneSettingsQueryVariables>) {
      return ApolloReactHooks.useQuery<ZoneSettingsQuery, ZoneSettingsQueryVariables>(ZoneSettingsDocument, baseOptions);
    }
      export function useZoneSettingsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ZoneSettingsQuery, ZoneSettingsQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<ZoneSettingsQuery, ZoneSettingsQueryVariables>(ZoneSettingsDocument, baseOptions);
      }
      
export type ZoneSettingsQueryHookResult = ReturnType<typeof useZoneSettingsQuery>;
export type ZoneSettingsQueryResult = ApolloReactCommon.QueryResult<ZoneSettingsQuery, ZoneSettingsQueryVariables>;export type ZoneSettingsQueryVariables = {
  zoneId: Types.Scalars['String']
};


export type ZoneSettingsQuery = (
  { __typename?: 'Query' }
  & { zone: (
    { __typename?: 'Zone' }
    & Pick<Types.Zone, 'id' | 'domainName'>
    & { zoneSettings: (
      { __typename?: 'ZoneSettings' }
      & Pick<Types.ZoneSettings, 'id'>
    ) }
  ) }
);
