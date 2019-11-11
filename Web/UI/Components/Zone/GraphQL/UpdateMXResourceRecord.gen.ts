import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const UpdateMxResourceRecordDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMXResourceRecord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resourceRecordId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MXResourceRecordInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMXResourceRecord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"resourceRecordId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resourceRecordId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"resourceRecords"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"host"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"ttl"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"data"},"arguments":[],"directives":[]}]}}]}}]}}]};
export type UpdateMxResourceRecordMutationFn = ApolloReactCommon.MutationFunction<UpdateMxResourceRecordMutation, UpdateMxResourceRecordMutationVariables>;

    export function useUpdateMxResourceRecordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateMxResourceRecordMutation, UpdateMxResourceRecordMutationVariables>) {
      return ApolloReactHooks.useMutation<UpdateMxResourceRecordMutation, UpdateMxResourceRecordMutationVariables>(UpdateMxResourceRecordDocument, baseOptions);
    }
export type UpdateMxResourceRecordMutationHookResult = ReturnType<typeof useUpdateMxResourceRecordMutation>;
export type UpdateMxResourceRecordMutationResult = ApolloReactCommon.MutationResult<UpdateMxResourceRecordMutation>;
export type UpdateMxResourceRecordMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateMxResourceRecordMutation, UpdateMxResourceRecordMutationVariables>;export type UpdateMxResourceRecordMutationVariables = {
  resourceRecordId: Types.Scalars['ID'],
  input: Types.MxResourceRecordInput
};


export type UpdateMxResourceRecordMutation = (
  { __typename?: 'Mutation' }
  & { updateMXResourceRecord: (
    { __typename?: 'Zone' }
    & Pick<Types.Zone, 'id'>
    & { resourceRecords: Array<(
      { __typename?: 'ResourceRecord' }
      & Pick<Types.ResourceRecord, 'host' | 'id' | 'ttl' | 'data'>
    )> }
  ) }
);
