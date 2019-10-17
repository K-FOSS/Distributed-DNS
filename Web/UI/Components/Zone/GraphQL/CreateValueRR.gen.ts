import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const CreateValueRrDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateValueRR"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"zoneId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateValueResourceRecordInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createValueResourceRecord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"zoneId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"zoneId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"domainName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"resourceRecords"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"host"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"data"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"ttl"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]}]}}]}}]}}]};
export type CreateValueRrMutationFn = ApolloReactCommon.MutationFunction<CreateValueRrMutation, CreateValueRrMutationVariables>;

    export function useCreateValueRrMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateValueRrMutation, CreateValueRrMutationVariables>) {
      return ApolloReactHooks.useMutation<CreateValueRrMutation, CreateValueRrMutationVariables>(CreateValueRrDocument, baseOptions);
    }
export type CreateValueRrMutationHookResult = ReturnType<typeof useCreateValueRrMutation>;
export type CreateValueRrMutationResult = ApolloReactCommon.MutationResult<CreateValueRrMutation>;
export type CreateValueRrMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateValueRrMutation, CreateValueRrMutationVariables>;export type CreateValueRrMutationVariables = {
  zoneId: Types.Scalars['ID'],
  input: Types.CreateValueResourceRecordInput
};


export type CreateValueRrMutation = (
  { __typename?: 'Mutation' }
  & { createValueResourceRecord: (
    { __typename?: 'Zone' }
    & Pick<Types.Zone, 'id' | 'domainName'>
    & { resourceRecords: Array<(
      { __typename?: 'ResourceRecord' }
      & Pick<Types.ResourceRecord, 'id' | 'host' | 'data' | 'ttl' | 'type'>
    )> }
  ) }
);
