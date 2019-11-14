import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export const AcmEsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ACMEs"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"ACMEs"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"contactEmail"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"domains"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"domains"},"arguments":[],"directives":[]}]}}]}}]}}]}}]};

/**
 * __useAcmEsQuery__
 *
 * To run a query within a React component, call `useAcmEsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAcmEsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAcmEsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAcmEsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AcmEsQuery, AcmEsQueryVariables>) {
        return ApolloReactHooks.useQuery<AcmEsQuery, AcmEsQueryVariables>(AcmEsDocument, baseOptions);
      }
export function useAcmEsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AcmEsQuery, AcmEsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AcmEsQuery, AcmEsQueryVariables>(AcmEsDocument, baseOptions);
        }
export type AcmEsQueryHookResult = ReturnType<typeof useAcmEsQuery>;
export type AcmEsLazyQueryHookResult = ReturnType<typeof useAcmEsLazyQuery>;
export type AcmEsQueryResult = ApolloReactCommon.QueryResult<AcmEsQuery, AcmEsQueryVariables>;
export type AcmEsQueryVariables = {};


export type AcmEsQuery = (
  { __typename?: 'Query' }
  & { currentUser: Types.Maybe<(
    { __typename?: 'CurrentUser' }
    & Pick<Types.CurrentUser, 'id'>
    & { ACMEs: Array<(
      { __typename?: 'ACME' }
      & Pick<Types.Acme, 'id' | 'name' | 'contactEmail'>
      & { domains: Array<(
        { __typename?: 'ACMEDomain' }
        & Pick<Types.AcmeDomain, 'domains'>
      )> }
    )> }
  )> }
);
