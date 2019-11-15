import * as Types from '../graphqlTypes.gen';

import gql from 'graphql-tag';
export const ResourceRecord = gql`
    fragment ResourceRecord on ResourceRecord {
  id
  type
  host
  data
  ttl
}
    `;export type ResourceRecordFragment = (
  { __typename?: 'ResourceRecord' }
  & Pick<Types.ResourceRecord, 'id' | 'type' | 'host' | 'data' | 'ttl'>
);
