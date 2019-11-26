import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export const AddSubscriberUserDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddSubscriberUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subscriberId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserPermissionInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addSubscriberUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subscriberId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subscriberId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"subscriberSettings"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"accessPermissions"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"username"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"accessPermissions"},"arguments":[],"directives":[]}]}}]}}]}}]};
export type AddSubscriberUserMutationFn = ApolloReactCommon.MutationFunction<AddSubscriberUserMutation, AddSubscriberUserMutationVariables>;

/**
 * __useAddSubscriberUserMutation__
 *
 * To run a mutation, you first call `useAddSubscriberUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSubscriberUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSubscriberUserMutation, { data, loading, error }] = useAddSubscriberUserMutation({
 *   variables: {
 *      subscriberId: // value for 'subscriberId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddSubscriberUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddSubscriberUserMutation, AddSubscriberUserMutationVariables>) {
        return ApolloReactHooks.useMutation<AddSubscriberUserMutation, AddSubscriberUserMutationVariables>(AddSubscriberUserDocument, baseOptions);
      }
export type AddSubscriberUserMutationHookResult = ReturnType<typeof useAddSubscriberUserMutation>;
export type AddSubscriberUserMutationResult = ApolloReactCommon.MutationResult<AddSubscriberUserMutation>;
export type AddSubscriberUserMutationOptions = ApolloReactCommon.BaseMutationOptions<AddSubscriberUserMutation, AddSubscriberUserMutationVariables>;
export type AddSubscriberUserMutationVariables = {
  subscriberId: Types.Scalars['ID'],
  input: Types.UserPermissionInput
};


export type AddSubscriberUserMutation = (
  { __typename?: 'Mutation' }
  & { addSubscriberUser: (
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
