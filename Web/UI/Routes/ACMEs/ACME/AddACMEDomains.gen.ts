import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export const AddAcmeDomainDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddACMEDomain"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"acmeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ACMEDomainInput"}}}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addACMEDomain"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"acmeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"acmeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"domains"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"domains"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"zone"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"domainName"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"domains"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"contactEmail"},"arguments":[],"directives":[]}]}}]}}]};
export type AddAcmeDomainMutationFn = ApolloReactCommon.MutationFunction<AddAcmeDomainMutation, AddAcmeDomainMutationVariables>;

/**
 * __useAddAcmeDomainMutation__
 *
 * To run a mutation, you first call `useAddAcmeDomainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAcmeDomainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAcmeDomainMutation, { data, loading, error }] = useAddAcmeDomainMutation({
 *   variables: {
 *      acmeId: // value for 'acmeId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddAcmeDomainMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddAcmeDomainMutation, AddAcmeDomainMutationVariables>) {
        return ApolloReactHooks.useMutation<AddAcmeDomainMutation, AddAcmeDomainMutationVariables>(AddAcmeDomainDocument, baseOptions);
      }
export type AddAcmeDomainMutationHookResult = ReturnType<typeof useAddAcmeDomainMutation>;
export type AddAcmeDomainMutationResult = ApolloReactCommon.MutationResult<AddAcmeDomainMutation>;
export type AddAcmeDomainMutationOptions = ApolloReactCommon.BaseMutationOptions<AddAcmeDomainMutation, AddAcmeDomainMutationVariables>;
export type AddAcmeDomainMutationVariables = {
  acmeId: Types.Scalars['String'],
  input: Array<Types.AcmeDomainInput>
};


export type AddAcmeDomainMutation = (
  { __typename?: 'Mutation' }
  & { addACMEDomain: (
    { __typename?: 'ACME' }
    & Pick<Types.Acme, 'id' | 'name' | 'contactEmail'>
    & { domains: Array<(
      { __typename?: 'ACMEDomain' }
      & Pick<Types.AcmeDomain, 'id' | 'domains'>
      & { zone: (
        { __typename?: 'Zone' }
        & Pick<Types.Zone, 'id' | 'domainName'>
      ) }
    )> }
  ) }
);
