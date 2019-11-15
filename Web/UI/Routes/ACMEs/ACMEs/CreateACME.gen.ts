import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export const CreateAcmeDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateACME"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ACMEInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createACME"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"ACMEs"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"contactEmail"},"arguments":[],"directives":[]}]}}]}}]}}]};
export type CreateAcmeMutationFn = ApolloReactCommon.MutationFunction<CreateAcmeMutation, CreateAcmeMutationVariables>;

/**
 * __useCreateAcmeMutation__
 *
 * To run a mutation, you first call `useCreateAcmeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAcmeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAcmeMutation, { data, loading, error }] = useCreateAcmeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAcmeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateAcmeMutation, CreateAcmeMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateAcmeMutation, CreateAcmeMutationVariables>(CreateAcmeDocument, baseOptions);
      }
export type CreateAcmeMutationHookResult = ReturnType<typeof useCreateAcmeMutation>;
export type CreateAcmeMutationResult = ApolloReactCommon.MutationResult<CreateAcmeMutation>;
export type CreateAcmeMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateAcmeMutation, CreateAcmeMutationVariables>;
export type CreateAcmeMutationVariables = {
  input: Types.AcmeInput
};


export type CreateAcmeMutation = (
  { __typename?: 'Mutation' }
  & { createACME: (
    { __typename?: 'CurrentUser' }
    & Pick<Types.CurrentUser, 'id'>
    & { ACMEs: Array<(
      { __typename?: 'ACME' }
      & Pick<Types.Acme, 'id' | 'name' | 'contactEmail'>
    )> }
  ) }
);
