import * as Types from '../graphqlTypes.gen';

import { ResourceRecordFragmentDoc, ResourceRecordFragment } from './ResourceRecords/ResourceRecord.gen';


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
    ...ResourceRecord
  }
}
    ${ResourceRecord}`;
export type ZoneFragment = (
  { __typename?: 'Zone' }
  & Pick<Types.Zone, 'id' | 'domainName' | 'updatedDate'>
  & { zoneSettings: (
    { __typename?: 'ZoneSettings' }
    & Pick<Types.ZoneSettings, 'contact'>
  ), resourceRecords: Array<(
    { __typename?: 'ResourceRecord' }
    & ResourceRecordFragment
  )> }
);
