import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const ZonesDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Zones"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"zones"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"domainName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]}]}}]}}]}}]};

    export function useZonesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ZonesQuery, ZonesQueryVariables>) {
      return ApolloReactHooks.useQuery<ZonesQuery, ZonesQueryVariables>(ZonesDocument, baseOptions);
    }
      export function useZonesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ZonesQuery, ZonesQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<ZonesQuery, ZonesQueryVariables>(ZonesDocument, baseOptions);
      }
      
export type ZonesQueryHookResult = ReturnType<typeof useZonesQuery>;
export type ZonesQueryResult = ApolloReactCommon.QueryResult<ZonesQuery, ZonesQueryVariables>;export type ZonesQueryVariables = {};


export type ZonesQuery = (
  { __typename?: 'Query' }
  & { currentUser: Types.Maybe<(
    { __typename?: 'CurrentUser' }
    & Pick<Types.CurrentUser, 'id'>
    & { zones: Array<(
      { __typename?: 'Zone' }
      & Pick<Types.Zone, 'domainName' | 'id'>
    )> }
  )> }
);
