import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export const SubscriberDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Subscriber"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subscriberId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subscriber"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subscriberId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subscriberId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"createdAt"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"subscribedEntities"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Zone"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"domainName"},"arguments":[],"directives":[]}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ACME"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]}]}}]}}]}}]}}]};

/**
 * __useSubscriberQuery__
 *
 * To run a query within a React component, call `useSubscriberQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubscriberQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscriberQuery({
 *   variables: {
 *      subscriberId: // value for 'subscriberId'
 *   },
 * });
 */
export function useSubscriberQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SubscriberQuery, SubscriberQueryVariables>) {
        return ApolloReactHooks.useQuery<SubscriberQuery, SubscriberQueryVariables>(SubscriberDocument, baseOptions);
      }
export function useSubscriberLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SubscriberQuery, SubscriberQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SubscriberQuery, SubscriberQueryVariables>(SubscriberDocument, baseOptions);
        }
export type SubscriberQueryHookResult = ReturnType<typeof useSubscriberQuery>;
export type SubscriberLazyQueryHookResult = ReturnType<typeof useSubscriberLazyQuery>;
export type SubscriberQueryResult = ApolloReactCommon.QueryResult<SubscriberQuery, SubscriberQueryVariables>;
export type SubscriberQueryVariables = {
  subscriberId: Types.Scalars['ID']
};


export type SubscriberQuery = (
  { __typename?: 'Query' }
  & { subscriber: (
    { __typename?: 'Subscriber' }
    & Pick<Types.Subscriber, 'id' | 'createdAt' | 'updatedAt' | 'name'>
    & { subscribedEntities: Array<(
      { __typename?: 'ACME' }
      & Pick<Types.Acme, 'id' | 'name'>
    ) | (
      { __typename?: 'Zone' }
      & Pick<Types.Zone, 'id' | 'domainName'>
    )> }
  ) }
);
