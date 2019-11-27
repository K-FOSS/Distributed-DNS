import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export const CreateSubscriberDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSubscriber"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SubscriberInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSubscriber"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"username"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"subscribers"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"userAccess"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"userPermissions"},"arguments":[],"directives":[]}]}}]}}]}}]};
export type CreateSubscriberMutationFn = ApolloReactCommon.MutationFunction<CreateSubscriberMutation, CreateSubscriberMutationVariables>;

/**
 * __useCreateSubscriberMutation__
 *
 * To run a mutation, you first call `useCreateSubscriberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubscriberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubscriberMutation, { data, loading, error }] = useCreateSubscriberMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSubscriberMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateSubscriberMutation, CreateSubscriberMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateSubscriberMutation, CreateSubscriberMutationVariables>(CreateSubscriberDocument, baseOptions);
      }
export type CreateSubscriberMutationHookResult = ReturnType<typeof useCreateSubscriberMutation>;
export type CreateSubscriberMutationResult = ApolloReactCommon.MutationResult<CreateSubscriberMutation>;
export type CreateSubscriberMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateSubscriberMutation, CreateSubscriberMutationVariables>;
export type CreateSubscriberMutationVariables = {
  input: Types.SubscriberInput
};


export type CreateSubscriberMutation = (
  { __typename?: 'Mutation' }
  & { createSubscriber: (
    { __typename?: 'CurrentUser' }
    & Pick<Types.CurrentUser, 'id' | 'username'>
    & { subscribers: Array<(
      { __typename?: 'Subscriber' }
      & Pick<Types.Subscriber, 'id' | 'name' | 'userAccess' | 'userPermissions'>
    )> }
  ) }
);
