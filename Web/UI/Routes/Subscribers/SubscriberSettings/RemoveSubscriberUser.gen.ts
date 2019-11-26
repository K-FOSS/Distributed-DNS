import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export const RemoveSubscriberUserDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveSubscriberUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subscriberId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeSubscriberUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subscriberId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subscriberId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"subscriberSettings"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"accessPermissions"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"username"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"accessPermissions"},"arguments":[],"directives":[]}]}}]}}]}}]};
export type RemoveSubscriberUserMutationFn = ApolloReactCommon.MutationFunction<RemoveSubscriberUserMutation, RemoveSubscriberUserMutationVariables>;

/**
 * __useRemoveSubscriberUserMutation__
 *
 * To run a mutation, you first call `useRemoveSubscriberUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSubscriberUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSubscriberUserMutation, { data, loading, error }] = useRemoveSubscriberUserMutation({
 *   variables: {
 *      subscriberId: // value for 'subscriberId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRemoveSubscriberUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveSubscriberUserMutation, RemoveSubscriberUserMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveSubscriberUserMutation, RemoveSubscriberUserMutationVariables>(RemoveSubscriberUserDocument, baseOptions);
      }
export type RemoveSubscriberUserMutationHookResult = ReturnType<typeof useRemoveSubscriberUserMutation>;
export type RemoveSubscriberUserMutationResult = ApolloReactCommon.MutationResult<RemoveSubscriberUserMutation>;
export type RemoveSubscriberUserMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveSubscriberUserMutation, RemoveSubscriberUserMutationVariables>;
export type RemoveSubscriberUserMutationVariables = {
  subscriberId: Types.Scalars['ID'],
  userId: Types.Scalars['ID']
};


export type RemoveSubscriberUserMutation = (
  { __typename?: 'Mutation' }
  & { removeSubscriberUser: (
    { __typename?: 'Subscriber' }
    & Pick<Types.Subscriber, 'id' | 'name' | 'updatedAt'>
    & { subscriberSettings: (
      { __typename?: 'SubscriberSettings' }
      & Pick<Types.SubscriberSettings, 'id'>
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
