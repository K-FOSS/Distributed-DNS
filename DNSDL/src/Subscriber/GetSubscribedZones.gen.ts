import * as Types from '../graphqlTypes.gen';

import { ZoneFragment } from '../Zone/Zone.gen';
import gql from 'graphql-tag';
import { Zone } from '../Zone/Zone.gen';

export const GetSubscribedZones = gql`
    query GetSubscribedZones($subscriberToken: String!) {
  getSubscribedZones(subscriberToken: $subscriberToken) {
    ...Zone
  }
}
    ${Zone}`;export type GetSubscribedZonesQueryVariables = {
  subscriberToken: Types.Scalars['String']
};


export type GetSubscribedZonesQuery = (
  { __typename?: 'Query' }
  & { getSubscribedZones: Array<{ __typename?: 'Zone' }
    & ZoneFragment
  > }
);
