import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export const CreateZoneDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateZone"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ZoneInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createZone"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"domainName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]}]}}]}}]};
export type CreateZoneMutationFn = ApolloReactCommon.MutationFunction<CreateZoneMutation, CreateZoneMutationVariables>;

/**
 * __useCreateZoneMutation__
 *
 * To run a mutation, you first call `useCreateZoneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateZoneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createZoneMutation, { data, loading, error }] = useCreateZoneMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateZoneMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateZoneMutation, CreateZoneMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateZoneMutation, CreateZoneMutationVariables>(CreateZoneDocument, baseOptions);
      }
export type CreateZoneMutationHookResult = ReturnType<typeof useCreateZoneMutation>;
export type CreateZoneMutationResult = ApolloReactCommon.MutationResult<CreateZoneMutation>;
export type CreateZoneMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateZoneMutation, CreateZoneMutationVariables>;
export type CreateZoneMutationVariables = {
  input: Types.ZoneInput
};


export type CreateZoneMutation = (
  { __typename?: 'Mutation' }
  & { createZone: (
    { __typename?: 'Zone' }
    & Pick<Types.Zone, 'domainName' | 'id'>
  ) }
);
