import * as Types from '../graphqlTypes.gen';

import { ResourceRecordFragment } from '../ResourceRecords/ResourceRecord.gen';
import gql from 'graphql-tag';
import { ResourceRecord } from '../ResourceRecords/ResourceRecord.gen';
export const Zone = gql`
    fragment Zone on Zone {
  domainName
  id
  updatedDate
  zoneSettings {
    contact
  }
  resourceRecords {
    ...ResourceRecord
  }
}
    ${ResourceRecord}`;export type ZoneFragment = (
  { __typename?: 'Zone' }
  & Pick<Types.Zone, 'domainName' | 'id' | 'updatedDate'>
  & { zoneSettings: (
    { __typename?: 'ZoneSettings' }
    & Pick<Types.ZoneSettings, 'contact'>
  ), resourceRecords: Array<{ __typename?: 'ResourceRecord' }
    & ResourceRecordFragment
  > }
);
