import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export const AddZoneUserDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddZoneUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"zoneId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserPermissionInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addZoneUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"zoneId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"zoneId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"accessPermissions"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"username"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"accessPermissions"},"arguments":[],"directives":[]}]}}]}}]}}]};
export type AddZoneUserMutationFn = ApolloReactCommon.MutationFunction<AddZoneUserMutation, AddZoneUserMutationVariables>;

/**
 * __useAddZoneUserMutation__
 *
 * To run a mutation, you first call `useAddZoneUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddZoneUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addZoneUserMutation, { data, loading, error }] = useAddZoneUserMutation({
 *   variables: {
 *      zoneId: // value for 'zoneId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddZoneUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddZoneUserMutation, AddZoneUserMutationVariables>) {
        return ApolloReactHooks.useMutation<AddZoneUserMutation, AddZoneUserMutationVariables>(AddZoneUserDocument, baseOptions);
      }
export type AddZoneUserMutationHookResult = ReturnType<typeof useAddZoneUserMutation>;
export type AddZoneUserMutationResult = ApolloReactCommon.MutationResult<AddZoneUserMutation>;
export type AddZoneUserMutationOptions = ApolloReactCommon.BaseMutationOptions<AddZoneUserMutation, AddZoneUserMutationVariables>;
export type AddZoneUserMutationVariables = {
  zoneId: Types.Scalars['ID'],
  input: Types.UserPermissionInput
};


export type AddZoneUserMutation = (
  { __typename?: 'Mutation' }
  & { addZoneUser: (
    { __typename?: 'Zone' }
    & Pick<Types.Zone, 'id'>
    & { accessPermissions: Array<(
      { __typename?: 'ZonePermissions' }
      & Pick<Types.ZonePermissions, 'id' | 'accessPermissions'>
      & { user: (
        { __typename?: 'User' }
        & Pick<Types.User, 'id' | 'username'>
      ) }
    )> }
  ) }
);
