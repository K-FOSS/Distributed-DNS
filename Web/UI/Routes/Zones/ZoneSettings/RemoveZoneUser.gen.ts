import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export const RemoveZoneUserDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveZoneUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"zoneId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"zoneUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeZoneUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"zoneId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"zoneId"}}},{"kind":"Argument","name":{"kind":"Name","value":"zoneUserId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"zoneUserId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"accessPermissions"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"username"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"accessPermissions"},"arguments":[],"directives":[]}]}}]}}]}}]};
export type RemoveZoneUserMutationFn = ApolloReactCommon.MutationFunction<RemoveZoneUserMutation, RemoveZoneUserMutationVariables>;

/**
 * __useRemoveZoneUserMutation__
 *
 * To run a mutation, you first call `useRemoveZoneUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveZoneUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeZoneUserMutation, { data, loading, error }] = useRemoveZoneUserMutation({
 *   variables: {
 *      zoneId: // value for 'zoneId'
 *      zoneUserId: // value for 'zoneUserId'
 *   },
 * });
 */
export function useRemoveZoneUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveZoneUserMutation, RemoveZoneUserMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveZoneUserMutation, RemoveZoneUserMutationVariables>(RemoveZoneUserDocument, baseOptions);
      }
export type RemoveZoneUserMutationHookResult = ReturnType<typeof useRemoveZoneUserMutation>;
export type RemoveZoneUserMutationResult = ApolloReactCommon.MutationResult<RemoveZoneUserMutation>;
export type RemoveZoneUserMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveZoneUserMutation, RemoveZoneUserMutationVariables>;
export type RemoveZoneUserMutationVariables = {
  zoneId: Types.Scalars['ID'],
  zoneUserId: Types.Scalars['ID']
};


export type RemoveZoneUserMutation = (
  { __typename?: 'Mutation' }
  & { removeZoneUser: (
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
