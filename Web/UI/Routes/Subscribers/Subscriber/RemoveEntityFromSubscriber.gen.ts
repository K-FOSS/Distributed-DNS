import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export const RemoveEntityFromSubscriberDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveEntityFromSubscriber"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subscriberId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"entityIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeEntityFromSubscriber"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subscriberId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subscriberId"}}},{"kind":"Argument","name":{"kind":"Name","value":"entityIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"entityIds"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"createdAt"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"subscribedEntities"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Zone"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"domainName"},"arguments":[],"directives":[]}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ACME"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]}]}}]}}]}}]}}]};
export type RemoveEntityFromSubscriberMutationFn = ApolloReactCommon.MutationFunction<RemoveEntityFromSubscriberMutation, RemoveEntityFromSubscriberMutationVariables>;

/**
 * __useRemoveEntityFromSubscriberMutation__
 *
 * To run a mutation, you first call `useRemoveEntityFromSubscriberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveEntityFromSubscriberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeEntityFromSubscriberMutation, { data, loading, error }] = useRemoveEntityFromSubscriberMutation({
 *   variables: {
 *      subscriberId: // value for 'subscriberId'
 *      entityIds: // value for 'entityIds'
 *   },
 * });
 */
export function useRemoveEntityFromSubscriberMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveEntityFromSubscriberMutation, RemoveEntityFromSubscriberMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveEntityFromSubscriberMutation, RemoveEntityFromSubscriberMutationVariables>(RemoveEntityFromSubscriberDocument, baseOptions);
      }
export type RemoveEntityFromSubscriberMutationHookResult = ReturnType<typeof useRemoveEntityFromSubscriberMutation>;
export type RemoveEntityFromSubscriberMutationResult = ApolloReactCommon.MutationResult<RemoveEntityFromSubscriberMutation>;
export type RemoveEntityFromSubscriberMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveEntityFromSubscriberMutation, RemoveEntityFromSubscriberMutationVariables>;
export type RemoveEntityFromSubscriberMutationVariables = {
  subscriberId: Types.Scalars['ID'],
  entityIds: Array<Types.Scalars['ID']>
};


export type RemoveEntityFromSubscriberMutation = (
  { __typename?: 'Mutation' }
  & { removeEntityFromSubscriber: (
    { __typename?: 'Subscriber' }
    & Pick<Types.Subscriber, 'id' | 'createdAt' | 'updatedAt' | 'name'>
    & { subscribedEntities: Array<(
      { __typename?: 'ACME' }
      & Pick<Types.Acme, 'id' | 'name'>
    ) | (
      { __typename?: 'Zone' }
      & Pick<Types.Zone, 'id' | 'domainName'>
    ) | { __typename?: 'SubscriberSettings' }> }
  ) }
);
