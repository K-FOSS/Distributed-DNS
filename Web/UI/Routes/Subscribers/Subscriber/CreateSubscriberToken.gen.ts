import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export const CreateSubscriberTokenDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSubscriberToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subscriberId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSubscriberToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subscriberId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subscriberId"}}}],"directives":[]}]}}]};
export type CreateSubscriberTokenMutationFn = ApolloReactCommon.MutationFunction<CreateSubscriberTokenMutation, CreateSubscriberTokenMutationVariables>;

/**
 * __useCreateSubscriberTokenMutation__
 *
 * To run a mutation, you first call `useCreateSubscriberTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubscriberTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubscriberTokenMutation, { data, loading, error }] = useCreateSubscriberTokenMutation({
 *   variables: {
 *      subscriberId: // value for 'subscriberId'
 *   },
 * });
 */
export function useCreateSubscriberTokenMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateSubscriberTokenMutation, CreateSubscriberTokenMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateSubscriberTokenMutation, CreateSubscriberTokenMutationVariables>(CreateSubscriberTokenDocument, baseOptions);
      }
export type CreateSubscriberTokenMutationHookResult = ReturnType<typeof useCreateSubscriberTokenMutation>;
export type CreateSubscriberTokenMutationResult = ApolloReactCommon.MutationResult<CreateSubscriberTokenMutation>;
export type CreateSubscriberTokenMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateSubscriberTokenMutation, CreateSubscriberTokenMutationVariables>;
export type CreateSubscriberTokenMutationVariables = {
  subscriberId: Types.Scalars['ID']
};


export type CreateSubscriberTokenMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'createSubscriberToken'>
);
