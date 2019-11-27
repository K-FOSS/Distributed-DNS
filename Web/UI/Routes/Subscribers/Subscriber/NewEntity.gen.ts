import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export const NewEntityDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NewEntity"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"username"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"zones"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"domainName"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"ACMEs"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]}]}}]}}]}}]};

/**
 * __useNewEntityQuery__
 *
 * To run a query within a React component, call `useNewEntityQuery` and pass it any options that fit your needs.
 * When your component renders, `useNewEntityQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewEntityQuery({
 *   variables: {
 *   },
 * });
 */
export function useNewEntityQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<NewEntityQuery, NewEntityQueryVariables>) {
        return ApolloReactHooks.useQuery<NewEntityQuery, NewEntityQueryVariables>(NewEntityDocument, baseOptions);
      }
export function useNewEntityLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<NewEntityQuery, NewEntityQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<NewEntityQuery, NewEntityQueryVariables>(NewEntityDocument, baseOptions);
        }
export type NewEntityQueryHookResult = ReturnType<typeof useNewEntityQuery>;
export type NewEntityLazyQueryHookResult = ReturnType<typeof useNewEntityLazyQuery>;
export type NewEntityQueryResult = ApolloReactCommon.QueryResult<NewEntityQuery, NewEntityQueryVariables>;
export type NewEntityQueryVariables = {};


export type NewEntityQuery = (
  { __typename?: 'Query' }
  & { currentUser: Types.Maybe<(
    { __typename?: 'CurrentUser' }
    & Pick<Types.CurrentUser, 'id' | 'username'>
    & { zones: Array<(
      { __typename?: 'Zone' }
      & Pick<Types.Zone, 'id' | 'domainName'>
    )>, ACMEs: Array<(
      { __typename?: 'ACME' }
      & Pick<Types.Acme, 'id' | 'name'>
    )> }
  )> }
);
