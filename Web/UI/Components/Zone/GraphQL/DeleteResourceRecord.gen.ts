import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const DeleteResourceRecordDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteResourceRecord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resourceRecordId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteResourceRecord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"resourceRecordId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resourceRecordId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"domainName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"resourceRecords"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"host"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"ttl"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"data"},"arguments":[],"directives":[]}]}}]}}]}}]};
export type DeleteResourceRecordMutationFn = ApolloReactCommon.MutationFunction<DeleteResourceRecordMutation, DeleteResourceRecordMutationVariables>;

    export function useDeleteResourceRecordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteResourceRecordMutation, DeleteResourceRecordMutationVariables>) {
      return ApolloReactHooks.useMutation<DeleteResourceRecordMutation, DeleteResourceRecordMutationVariables>(DeleteResourceRecordDocument, baseOptions);
    }
export type DeleteResourceRecordMutationHookResult = ReturnType<typeof useDeleteResourceRecordMutation>;
export type DeleteResourceRecordMutationResult = ApolloReactCommon.MutationResult<DeleteResourceRecordMutation>;
export type DeleteResourceRecordMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteResourceRecordMutation, DeleteResourceRecordMutationVariables>;export type DeleteResourceRecordMutationVariables = {
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
