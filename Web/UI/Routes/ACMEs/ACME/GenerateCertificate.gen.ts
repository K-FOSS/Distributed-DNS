import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export const GenerateCertificateDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GenerateCertificate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"acmeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateCertificate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"acmeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"acmeId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"certificates"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"createdAt"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"certificate"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"domains"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"domains"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"zone"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"domainName"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"domains"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"contactEmail"},"arguments":[],"directives":[]}]}}]}}]};
export type GenerateCertificateMutationFn = ApolloReactCommon.MutationFunction<GenerateCertificateMutation, GenerateCertificateMutationVariables>;

/**
 * __useGenerateCertificateMutation__
 *
 * To run a mutation, you first call `useGenerateCertificateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateCertificateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateCertificateMutation, { data, loading, error }] = useGenerateCertificateMutation({
 *   variables: {
 *      acmeId: // value for 'acmeId'
 *   },
 * });
 */
export function useGenerateCertificateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GenerateCertificateMutation, GenerateCertificateMutationVariables>) {
        return ApolloReactHooks.useMutation<GenerateCertificateMutation, GenerateCertificateMutationVariables>(GenerateCertificateDocument, baseOptions);
      }
export type GenerateCertificateMutationHookResult = ReturnType<typeof useGenerateCertificateMutation>;
export type GenerateCertificateMutationResult = ApolloReactCommon.MutationResult<GenerateCertificateMutation>;
export type GenerateCertificateMutationOptions = ApolloReactCommon.BaseMutationOptions<GenerateCertificateMutation, GenerateCertificateMutationVariables>;
export type GenerateCertificateMutationVariables = {
  acmeId: Types.Scalars['String']
};


export type GenerateCertificateMutation = (
  { __typename?: 'Mutation' }
  & { generateCertificate: (
    { __typename?: 'ACME' }
    & Pick<Types.Acme, 'id' | 'name' | 'contactEmail'>
    & { certificates: Array<(
      { __typename?: 'Certificate' }
      & Pick<Types.Certificate, 'id' | 'createdAt' | 'certificate'>
    )>, domains: Array<(
      { __typename?: 'ACMEDomain' }
      & Pick<Types.AcmeDomain, 'id' | 'domains'>
      & { zone: (
        { __typename?: 'Zone' }
        & Pick<Types.Zone, 'id' | 'domainName'>
      ) }
    )> }
  ) }
);
