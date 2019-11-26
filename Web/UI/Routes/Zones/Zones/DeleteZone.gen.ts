import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export const DeleteZoneDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteZone"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"zoneId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteZone"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"zoneId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"zoneId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"username"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"zones"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"domainName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"userPermissions"},"arguments":[],"directives":[]}]}}]}}]}}]};
export type DeleteZoneMutationFn = ApolloReactCommon.MutationFunction<DeleteZoneMutation, DeleteZoneMutationVariables>;

/**
 * __useDeleteZoneMutation__
 *
 * To run a mutation, you first call `useDeleteZoneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteZoneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteZoneMutation, { data, loading, error }] = useDeleteZoneMutation({
 *   variables: {
 *      zoneId: // value for 'zoneId'
 *   },
 * });
 */
export function useDeleteZoneMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteZoneMutation, DeleteZoneMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteZoneMutation, DeleteZoneMutationVariables>(DeleteZoneDocument, baseOptions);
      }
export type DeleteZoneMutationHookResult = ReturnType<typeof useDeleteZoneMutation>;
export type DeleteZoneMutationResult = ApolloReactCommon.MutationResult<DeleteZoneMutation>;
export type DeleteZoneMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteZoneMutation, DeleteZoneMutationVariables>;
export type DeleteZoneMutationVariables = {
  zoneId: Types.Scalars['ID']
};


export type DeleteZoneMutation = (
  { __typename?: 'Mutation' }
  & { deleteZone: (
    { __typename?: 'CurrentUser' }
    & Pick<Types.CurrentUser, 'id' | 'username'>
    & { zones: Array<(
      { __typename?: 'Zone' }
      & Pick<Types.Zone, 'id' | 'domainName' | 'userPermissions'>
    )> }
  ) }
);
