import * as Types from '../../graphqlTypes.gen';

import { ZoneFragment } from '../../Zones/Zone.gen';


import gql from 'graphql-tag';
import { Zone } from '../../Zones/Zone.gen';

export const Subscribe = gql`
    subscription Subscribe($subscriberToken: String!) {
  subscribe(subscriberToken: $subscriberToken) {
    eventType
    id
    eventType
    entity {
      ... on Zone {
        ...Zone
      }
      ... on ACME {
        id
        name
        certificates {
          id
          createdAt
          certificate
          privateKey
        }
      }
    }
  }
}
    ${Zone}`;
export type SubscribeSubscriptionVariables = {
  subscriberToken: Types.Scalars['String']
};


export type SubscribeSubscription = (
  { __typename?: 'Subscription' }
  & { subscribe: (
    { __typename?: 'SubscriberEventPayload' }
    & Pick<Types.SubscriberEventPayload, 'eventType' | 'id'>
    & { entity: (
      { __typename?: 'ACME' }
      & Pick<Types.Acme, 'id' | 'name'>
      & { certificates: Array<(
        { __typename?: 'Certificate' }
        & Pick<Types.Certificate, 'id' | 'createdAt' | 'certificate' | 'privateKey'>
      )> }
    ) | (
      { __typename?: 'Zone' }
      & ZoneFragment
    ) }
  ) }
);
