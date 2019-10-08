import * as Types from '../graphqlTypes.gen';

import gql from 'graphql-tag';

export const HasSetup = gql`
    query hasSetup {
  hasSetup
}
    `;export type HasSetupQueryVariables = {};


export type HasSetupQuery = (
  { __typename?: 'Query' }
  & Pick<Types.Query, 'hasSetup'>
);
