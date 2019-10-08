import * as Types from '../graphqlTypes.gen';

import { ResourceRecordFragment } from '../ResourceRecords/ResourceRecord.gen';
import gql from 'graphql-tag';
import { ResourceRecord } from '../ResourceRecords/ResourceRecord.gen';
export const Zone = gql`
    fragment Zone on Zone {
  domainName
  id
  updatedDate
  contact
  resourceRecords {
    ...ResourceRecord
  }
}
    ${ResourceRecord}`;export type ZoneFragment = (
  { __typename?: 'Zone' }
  & Pick<Types.Zone, 'domainName' | 'id' | 'updatedDate' | 'contact'>
  & { resourceRecords: Array<{ __typename?: 'ResourceRecord' }
    & ResourceRecordFragment
  > }
);
