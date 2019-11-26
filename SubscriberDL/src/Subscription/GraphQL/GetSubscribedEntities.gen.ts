import * as Types from '../../graphqlTypes.gen';

import { ZoneFragment } from '../../Zones/Zone.gen';


import gql from 'graphql-tag';
import { Zone } from '../../Zones/Zone.gen';

export const GetSubscribedEntities = gql`
    query getSubscribedEntities($subscriberToken: String!) {
  getSubscribedEntities(subscriberToken: $subscriberToken) {
    ... on Zone {
      ...Zone
    }
    ... on ACME {
      id
    }
  }
}
    ${Zone}`;
export type GetSubscribedEntitiesQueryVariables = {
  subscriberToken: Types.Scalars['String']
};


export type GetSubscribedEntitiesQuery = (
  { __typename?: 'Query' }
  & { getSubscribedEntities: Array<(
    { __typename?: 'ACME' }
    & Pick<Types.Acme, 'id'>
  ) | (
    { __typename?: 'Zone' }
    & ZoneFragment
  )> }
);
