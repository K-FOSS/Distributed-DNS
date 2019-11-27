import * as Types from '../../graphqlTypes.gen';


import gql from 'graphql-tag';
export const Acme = gql`
    fragment ACME on ACME {
  id
  name
  certificates {
    id
    createdAt
    certificate
    privateKey
  }
}
    `;
export type AcmeFragment = (
  { __typename?: 'ACME' }
  & Pick<Types.Acme, 'id' | 'name'>
  & { certificates: Array<(
    { __typename?: 'Certificate' }
    & Pick<Types.Certificate, 'id' | 'createdAt' | 'certificate' | 'privateKey'>
  )> }
);
