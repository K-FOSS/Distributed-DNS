import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export const AddEntityToSubscriberDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddEntityToSubscriber"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subscriberId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newEntities"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EntityInput"}}}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addEntityToSubscriber"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subscriberId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subscriberId"}}},{"kind":"Argument","name":{"kind":"Name","value":"newEntities"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newEntities"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"createdAt"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"subscribedEntities"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Zone"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"domainName"},"arguments":[],"directives":[]}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ACME"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]}]}}]}}]}}]}}]};
export type AddEntityToSubscriberMutationFn = ApolloReactCommon.MutationFunction<AddEntityToSubscriberMutation, AddEntityToSubscriberMutationVariables>;

/**
 * __useAddEntityToSubscriberMutation__
 *
 * To run a mutation, you first call `useAddEntityToSubscriberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddEntityToSubscriberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addEntityToSubscriberMutation, { data, loading, error }] = useAddEntityToSubscriberMutation({
 *   variables: {
 *      subscriberId: // value for 'subscriberId'
 *      newEntities: // value for 'newEntities'
 *   },
 * });
 */
export function useAddEntityToSubscriberMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddEntityToSubscriberMutation, AddEntityToSubscriberMutationVariables>) {
        return ApolloReactHooks.useMutation<AddEntityToSubscriberMutation, AddEntityToSubscriberMutationVariables>(AddEntityToSubscriberDocument, baseOptions);
      }
export type AddEntityToSubscriberMutationHookResult = ReturnType<typeof useAddEntityToSubscriberMutation>;
export type AddEntityToSubscriberMutationResult = ApolloReactCommon.MutationResult<AddEntityToSubscriberMutation>;
export type AddEntityToSubscriberMutationOptions = ApolloReactCommon.BaseMutationOptions<AddEntityToSubscriberMutation, AddEntityToSubscriberMutationVariables>;
export type AddEntityToSubscriberMutationVariables = {
  subscriberId: Types.Scalars['ID'],
  newEntities: Array<Types.EntityInput>
};


export type AddEntityToSubscriberMutation = (
  { __typename?: 'Mutation' }
  & { addEntityToSubscriber: (
    { __typename?: 'Subscriber' }
    & Pick<Types.Subscriber, 'id' | 'createdAt' | 'updatedAt' | 'name'>
    & { subscribedEntities: Array<(
      { __typename?: 'ACME' }
      & Pick<Types.Acme, 'id' | 'name'>
    ) | (
      { __typename?: 'Zone' }
      & Pick<Types.Zone, 'id' | 'domainName'>
    )> }
  ) }
);
