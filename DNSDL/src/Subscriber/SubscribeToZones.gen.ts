import * as Types from '../graphqlTypes.gen';

import { ZoneFragment } from '../Zone/Zone.gen';
import gql from 'graphql-tag';
import { Zone } from '../Zone/Zone.gen';

export const SubscribeToZones = gql`
    subscription SubscribeToZones($subscriberToken: String!) {
  subscribeToZones(subscriberToken: $subscriberToken) {
    ...Zone
  }
}
    ${Zone}`;export type SubscribeToZonesSubscriptionVariables = {
  subscriberToken: Types.Scalars['String']
};


export type SubscribeToZonesSubscription = (
  { __typename?: 'Subscription' }
  & { subscribeToZones: { __typename?: 'Zone' }
    & ZoneFragment
   }
);
