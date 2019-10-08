import * as Types from '../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const InitialConfigurationDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InitialConfiguration"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"initialConfiguration"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userInput"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]}]}}]}}]};
export type InitialConfigurationMutationFn = ApolloReactCommon.MutationFunction<InitialConfigurationMutation, InitialConfigurationMutationVariables>;

    export function useInitialConfigurationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InitialConfigurationMutation, InitialConfigurationMutationVariables>) {
      return ApolloReactHooks.useMutation<InitialConfigurationMutation, InitialConfigurationMutationVariables>(InitialConfigurationDocument, baseOptions);
    }
export type InitialConfigurationMutationHookResult = ReturnType<typeof useInitialConfigurationMutation>;
export type InitialConfigurationMutationResult = ApolloReactCommon.MutationResult<InitialConfigurationMutation>;
export type InitialConfigurationMutationOptions = ApolloReactCommon.BaseMutationOptions<InitialConfigurationMutation, InitialConfigurationMutationVariables>;export type InitialConfigurationMutationVariables = {
  userInput: Types.UserInput
};


export type InitialConfigurationMutation = (
  { __typename?: 'Mutation' }
  & { initialConfiguration: (
    { __typename?: 'Configuration' }
    & Pick<Types.Configuration, 'id'>
  ) }
);
