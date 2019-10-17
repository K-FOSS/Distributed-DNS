import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const AcmEsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ACMEs"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"ACMEs"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]}]}}]}}]}}]};

    export function useAcmEsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AcmEsQuery, AcmEsQueryVariables>) {
      return ApolloReactHooks.useQuery<AcmEsQuery, AcmEsQueryVariables>(AcmEsDocument, baseOptions);
    }
      export function useAcmEsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AcmEsQuery, AcmEsQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<AcmEsQuery, AcmEsQueryVariables>(AcmEsDocument, baseOptions);
      }
      
export type AcmEsQueryHookResult = ReturnType<typeof useAcmEsQuery>;
export type AcmEsQueryResult = ApolloReactCommon.QueryResult<AcmEsQuery, AcmEsQueryVariables>;export type AcmEsQueryVariables = {};


export type AcmEsQuery = (
  { __typename?: 'Query' }
  & { currentUser: Types.Maybe<(
    { __typename?: 'CurrentUser' }
    & Pick<Types.CurrentUser, 'id'>
    & { ACMEs: Array<(
      { __typename?: 'ACME' }
      & Pick<Types.Acme, 'id' | 'name'>
    )> }
  )> }
);
