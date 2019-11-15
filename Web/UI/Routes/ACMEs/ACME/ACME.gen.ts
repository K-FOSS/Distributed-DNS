import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export const AcmeDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ACME"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"acmeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ACME"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"acmeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"acmeId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"certificates"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"createdAt"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"certificate"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"domains"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"domains"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"zone"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"domainName"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"domains"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"contactEmail"},"arguments":[],"directives":[]}]}}]}}]};

/**
 * __useAcmeQuery__
 *
 * To run a query within a React component, call `useAcmeQuery` and pass it any options that fit your needs.
 * When your component renders, `useAcmeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAcmeQuery({
 *   variables: {
 *      acmeId: // value for 'acmeId'
 *   },
 * });
 */
export function useAcmeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AcmeQuery, AcmeQueryVariables>) {
        return ApolloReactHooks.useQuery<AcmeQuery, AcmeQueryVariables>(AcmeDocument, baseOptions);
      }
export function useAcmeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AcmeQuery, AcmeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AcmeQuery, AcmeQueryVariables>(AcmeDocument, baseOptions);
        }
export type AcmeQueryHookResult = ReturnType<typeof useAcmeQuery>;
export type AcmeLazyQueryHookResult = ReturnType<typeof useAcmeLazyQuery>;
export type AcmeQueryResult = ApolloReactCommon.QueryResult<AcmeQuery, AcmeQueryVariables>;
export type AcmeQueryVariables = {
  acmeId: Types.Scalars['String']
};


export type AcmeQuery = (
  { __typename?: 'Query' }
  & { ACME: (
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
