import * as Types from '../../graphqlTypes.gen';

import { AcmeFragment } from '../../ACME/GraphQL/ACME.gen';
import { ZoneFragment } from '../../Zones/Zone.gen';



import gql from 'graphql-tag';
import { Zone } from '../../Zones/Zone.gen';
import { Acme } from '../../ACME/GraphQL/ACME.gen';

export const GetSubscribedEntities = gql`
    query getSubscribedEntities($subscriberToken: String!) {
  getSubscribedEntities(subscriberToken: $subscriberToken) {
    ... on Zone {
      ...Zone
    }
    ... on ACME {
      ...ACME
    }
    ... on SubscriberSettings {
      TLSOutputMode
    }
  }
}
    ${Zone}
${Acme}`;
export type GetSubscribedEntitiesQueryVariables = {
  subscriberToken: Types.Scalars['String']
};


export type GetSubscribedEntitiesQuery = (
  { __typename?: 'Query' }
  & { getSubscribedEntities: Array<(
    { __typename?: 'ACME' }
    & AcmeFragment
  ) | (
    { __typename?: 'Zone' }
    & ZoneFragment
  ) | (
    { __typename?: 'SubscriberSettings' }
    & Pick<Types.SubscriberSettings, 'TLSOutputMode'>
  )> }
);
