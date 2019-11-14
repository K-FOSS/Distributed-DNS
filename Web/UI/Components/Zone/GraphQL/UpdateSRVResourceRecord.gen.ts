import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export const UpdateSrvResourceRecordDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateSRVResourceRecord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resourceRecordId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SRVResourceRecordInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSRVResourceRecord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"resourceRecordId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resourceRecordId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"resourceRecords"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"ttl"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"host"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"data"},"arguments":[],"directives":[]}]}}]}}]}}]};
export type UpdateSrvResourceRecordMutationFn = ApolloReactCommon.MutationFunction<UpdateSrvResourceRecordMutation, UpdateSrvResourceRecordMutationVariables>;

/**
 * __useUpdateSrvResourceRecordMutation__
 *
 * To run a mutation, you first call `useUpdateSrvResourceRecordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSrvResourceRecordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSrvResourceRecordMutation, { data, loading, error }] = useUpdateSrvResourceRecordMutation({
 *   variables: {
 *      resourceRecordId: // value for 'resourceRecordId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSrvResourceRecordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateSrvResourceRecordMutation, UpdateSrvResourceRecordMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateSrvResourceRecordMutation, UpdateSrvResourceRecordMutationVariables>(UpdateSrvResourceRecordDocument, baseOptions);
      }
export type UpdateSrvResourceRecordMutationHookResult = ReturnType<typeof useUpdateSrvResourceRecordMutation>;
export type UpdateSrvResourceRecordMutationResult = ApolloReactCommon.MutationResult<UpdateSrvResourceRecordMutation>;
export type UpdateSrvResourceRecordMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateSrvResourceRecordMutation, UpdateSrvResourceRecordMutationVariables>;
export type UpdateSrvResourceRecordMutationVariables = {
  resourceRecordId: Types.Scalars['ID'],
  input: Types.SrvResourceRecordInput
};


export type UpdateSrvResourceRecordMutation = (
  { __typename?: 'Mutation' }
  & { updateSRVResourceRecord: (
    { __typename?: 'Zone' }
    & Pick<Types.Zone, 'id'>
    & { resourceRecords: Array<(
      { __typename?: 'ResourceRecord' }
      & Pick<Types.ResourceRecord, 'id' | 'ttl' | 'type' | 'host' | 'data'>
    )> }
  ) }
);
