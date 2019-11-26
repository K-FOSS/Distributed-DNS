import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export const SubscriberSettingsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SubscriberSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subscriberId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subscriber"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subscriberId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subscriberId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"subscriberSettings"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"TLSOutputMode"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"accessPermissions"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"username"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"accessPermissions"},"arguments":[],"directives":[]}]}}]}}]}}]};

/**
 * __useSubscriberSettingsQuery__
 *
 * To run a query within a React component, call `useSubscriberSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubscriberSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscriberSettingsQuery({
 *   variables: {
 *      subscriberId: // value for 'subscriberId'
 *   },
 * });
 */
export function useSubscriberSettingsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SubscriberSettingsQuery, SubscriberSettingsQueryVariables>) {
        return ApolloReactHooks.useQuery<SubscriberSettingsQuery, SubscriberSettingsQueryVariables>(SubscriberSettingsDocument, baseOptions);
      }
export function useSubscriberSettingsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SubscriberSettingsQuery, SubscriberSettingsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SubscriberSettingsQuery, SubscriberSettingsQueryVariables>(SubscriberSettingsDocument, baseOptions);
        }
export type SubscriberSettingsQueryHookResult = ReturnType<typeof useSubscriberSettingsQuery>;
export type SubscriberSettingsLazyQueryHookResult = ReturnType<typeof useSubscriberSettingsLazyQuery>;
export type SubscriberSettingsQueryResult = ApolloReactCommon.QueryResult<SubscriberSettingsQuery, SubscriberSettingsQueryVariables>;
export type SubscriberSettingsQueryVariables = {
  subscriberId: Types.Scalars['ID']
};


export type SubscriberSettingsQuery = (
  { __typename?: 'Query' }
  & { subscriber: (
    { __typename?: 'Subscriber' }
    & Pick<Types.Subscriber, 'id' | 'name' | 'updatedAt'>
    & { subscriberSettings: (
      { __typename?: 'SubscriberSettings' }
      & Pick<Types.SubscriberSettings, 'id' | 'TLSOutputMode'>
    ), accessPermissions: Array<(
      { __typename?: 'SubscriberAccess' }
      & Pick<Types.SubscriberAccess, 'id' | 'accessPermissions'>
      & { user: (
        { __typename?: 'User' }
        & Pick<Types.User, 'id' | 'username'>
      ) }
    )> }
  ) }
);
