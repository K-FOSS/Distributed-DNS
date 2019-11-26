import * as Types from '../../graphqlTypes.gen';

import { AcmeFragment } from '../../ACME/GraphQL/ACME.gen';
import { ZoneFragment } from '../../Zones/Zone.gen';



import gql from 'graphql-tag';
import { Zone } from '../../Zones/Zone.gen';
import { Acme } from '../../ACME/GraphQL/ACME.gen';

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
        ...ACME
      }
    }
  }
}
    ${Zone}
${Acme}`;
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
      & AcmeFragment
    ) | (
      { __typename?: 'Zone' }
      & ZoneFragment
    ) }
  ) }
);
