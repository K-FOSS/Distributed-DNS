import * as Types from '../graphqlTypes.gen';


import gql from 'graphql-tag';
export const Zone = gql`
    fragment Zone on Zone {
  id
  domainName
  updatedDate
  zoneSettings {
    contact
  }
  resourceRecords {
    id
    host
    type
    ttl
    data
  }
}
    `;
export type ZoneFragment = (
  { __typename?: 'Zone' }
  & Pick<Types.Zone, 'id' | 'domainName' | 'updatedDate'>
  & { zoneSettings: (
    { __typename?: 'ZoneSettings' }
    & Pick<Types.ZoneSettings, 'contact'>
  ), resourceRecords: Array<(
    { __typename?: 'ResourceRecord' }
    & Pick<Types.ResourceRecord, 'id' | 'host' | 'type' | 'ttl' | 'data'>
  )> }
);
