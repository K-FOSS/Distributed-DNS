import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export const DeleteResourceRecordDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteResourceRecord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resourceRecordId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteResourceRecord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"resourceRecordId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resourceRecordId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"domainName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"resourceRecords"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"host"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"ttl"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"data"},"arguments":[],"directives":[]}]}}]}}]}}]};
export type DeleteResourceRecordMutationFn = ApolloReactCommon.MutationFunction<DeleteResourceRecordMutation, DeleteResourceRecordMutationVariables>;

/**
 * __useDeleteResourceRecordMutation__
 *
 * To run a mutation, you first call `useDeleteResourceRecordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteResourceRecordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteResourceRecordMutation, { data, loading, error }] = useDeleteResourceRecordMutation({
 *   variables: {
 *      resourceRecordId: // value for 'resourceRecordId'
 *   },
 * });
 */
export function useDeleteResourceRecordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteResourceRecordMutation, DeleteResourceRecordMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteResourceRecordMutation, DeleteResourceRecordMutationVariables>(DeleteResourceRecordDocument, baseOptions);
      }
export type DeleteResourceRecordMutationHookResult = ReturnType<typeof useDeleteResourceRecordMutation>;
export type DeleteResourceRecordMutationResult = ApolloReactCommon.MutationResult<DeleteResourceRecordMutation>;
export type DeleteResourceRecordMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteResourceRecordMutation, DeleteResourceRecordMutationVariables>;
export type DeleteResourceRecordMutationVariables = {
  resourceRecordId: Types.Scalars['ID']
};


export type DeleteResourceRecordMutation = (
  { __typename?: 'Mutation' }
  & { deleteResourceRecord: (
    { __typename?: 'Zone' }
    & Pick<Types.Zone, 'id' | 'domainName'>
    & { resourceRecords: Array<(
      { __typename?: 'ResourceRecord' }
      & Pick<Types.ResourceRecord, 'id' | 'host' | 'ttl' | 'data'>
    )> }
  ) }
);
