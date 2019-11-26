import * as Types from '../../graphqlTypes.gen';


import gql from 'graphql-tag';
export const ResourceRecord = gql`
    fragment ResourceRecord on ResourceRecord {
  id
  host
  type
  ttl
  data
}
    `;
export type ResourceRecordFragment = (
  { __typename?: 'ResourceRecord' }
  & Pick<Types.ResourceRecord, 'id' | 'host' | 'type' | 'ttl' | 'data'>
);
