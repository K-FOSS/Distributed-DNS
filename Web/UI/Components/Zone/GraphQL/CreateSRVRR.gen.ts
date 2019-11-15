import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export const CreateSrvrrDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSRVRR"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"zoneId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSRVResourceRecordInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSRVResourceRecord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"zoneId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"zoneId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"domainName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"resourceRecords"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"host"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"data"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"ttl"},"arguments":[],"directives":[]}]}}]}}]}}]};
export type CreateSrvrrMutationFn = ApolloReactCommon.MutationFunction<CreateSrvrrMutation, CreateSrvrrMutationVariables>;

/**
 * __useCreateSrvrrMutation__
 *
 * To run a mutation, you first call `useCreateSrvrrMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSrvrrMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSrvrrMutation, { data, loading, error }] = useCreateSrvrrMutation({
 *   variables: {
 *      zoneId: // value for 'zoneId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSrvrrMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateSrvrrMutation, CreateSrvrrMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateSrvrrMutation, CreateSrvrrMutationVariables>(CreateSrvrrDocument, baseOptions);
      }
export type CreateSrvrrMutationHookResult = ReturnType<typeof useCreateSrvrrMutation>;
export type CreateSrvrrMutationResult = ApolloReactCommon.MutationResult<CreateSrvrrMutation>;
export type CreateSrvrrMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateSrvrrMutation, CreateSrvrrMutationVariables>;
export type CreateSrvrrMutationVariables = {
  zoneId: Types.Scalars['ID'],
  input: Types.CreateSrvResourceRecordInput
};


export type CreateSrvrrMutation = (
  { __typename?: 'Mutation' }
  & { createSRVResourceRecord: (
    { __typename?: 'Zone' }
    & Pick<Types.Zone, 'id' | 'domainName'>
    & { resourceRecords: Array<(
      { __typename?: 'ResourceRecord' }
      & Pick<Types.ResourceRecord, 'id' | 'host' | 'data' | 'type' | 'ttl'>
    )> }
  ) }
);
