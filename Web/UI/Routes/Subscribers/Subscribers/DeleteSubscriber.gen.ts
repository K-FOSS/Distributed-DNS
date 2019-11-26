import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export const DeleteSubscriberDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSubscriber"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subscriberId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSubscriber"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subscriberId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subscriberId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"username"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"subscribers"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"userAccess"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"userPermissions"},"arguments":[],"directives":[]}]}}]}}]}}]};
export type DeleteSubscriberMutationFn = ApolloReactCommon.MutationFunction<DeleteSubscriberMutation, DeleteSubscriberMutationVariables>;

/**
 * __useDeleteSubscriberMutation__
 *
 * To run a mutation, you first call `useDeleteSubscriberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSubscriberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSubscriberMutation, { data, loading, error }] = useDeleteSubscriberMutation({
 *   variables: {
 *      subscriberId: // value for 'subscriberId'
 *   },
 * });
 */
export function useDeleteSubscriberMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteSubscriberMutation, DeleteSubscriberMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteSubscriberMutation, DeleteSubscriberMutationVariables>(DeleteSubscriberDocument, baseOptions);
      }
export type DeleteSubscriberMutationHookResult = ReturnType<typeof useDeleteSubscriberMutation>;
export type DeleteSubscriberMutationResult = ApolloReactCommon.MutationResult<DeleteSubscriberMutation>;
export type DeleteSubscriberMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteSubscriberMutation, DeleteSubscriberMutationVariables>;
export type DeleteSubscriberMutationVariables = {
  subscriberId: Types.Scalars['ID']
};


export type DeleteSubscriberMutation = (
  { __typename?: 'Mutation' }
  & { deleteSubscriber: (
    { __typename?: 'CurrentUser' }
    & Pick<Types.CurrentUser, 'id' | 'username'>
    & { subscribers: Array<(
      { __typename?: 'Subscriber' }
      & Pick<Types.Subscriber, 'id' | 'name' | 'userAccess' | 'userPermissions'>
    )> }
  ) }
);
