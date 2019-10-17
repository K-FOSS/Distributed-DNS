import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const UpdateResourceRecordDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateResourceRecord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resourceRecordId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ValueResourceRecordInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateValueResourceRecord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"resourceRecordId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resourceRecordId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"resourceRecords"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"host"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"ttl"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"data"},"arguments":[],"directives":[]}]}}]}}]}}]};
export type UpdateResourceRecordMutationFn = ApolloReactCommon.MutationFunction<UpdateResourceRecordMutation, UpdateResourceRecordMutationVariables>;

    export function useUpdateResourceRecordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateResourceRecordMutation, UpdateResourceRecordMutationVariables>) {
      return ApolloReactHooks.useMutation<UpdateResourceRecordMutation, UpdateResourceRecordMutationVariables>(UpdateResourceRecordDocument, baseOptions);
    }
export type UpdateResourceRecordMutationHookResult = ReturnType<typeof useUpdateResourceRecordMutation>;
export type UpdateResourceRecordMutationResult = ApolloReactCommon.MutationResult<UpdateResourceRecordMutation>;
export type UpdateResourceRecordMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateResourceRecordMutation, UpdateResourceRecordMutationVariables>;export type UpdateResourceRecordMutationVariables = {
  resourceRecordId: Types.Scalars['ID'],
  input: Types.ValueResourceRecordInput
};


export type UpdateResourceRecordMutation = (
  { __typename?: 'Mutation' }
  & { updateValueResourceRecord: (
    { __typename?: 'Zone' }
    & Pick<Types.Zone, 'id'>
    & { resourceRecords: Array<(
      { __typename?: 'ResourceRecord' }
      & Pick<Types.ResourceRecord, 'host' | 'id' | 'ttl' | 'data'>
    )> }
  ) }
);
