import * as Types from '../../graphqlTypes.gen';


import gql from 'graphql-tag';

export const GetSubscribedEntities = gql`
    query getSubscribedEntities($subscriberToken: String!) {
  getSubscribedEntities(subscriberToken: $subscriberToken) {
    ... on SubscriberSettings {
      TLSOutputMode
    }
    ... on Zone {
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
    ... on ACME {
      id
      name
      certificates(count: 1) {
        id
        createdAt
        certificate
        privateKey
      }
    }
  }
}
    `;
export type GetSubscribedEntitiesQueryVariables = {
  subscriberToken: Types.Scalars['String']
};


export type GetSubscribedEntitiesQuery = (
  { __typename?: 'Query' }
  & { getSubscribedEntities: Array<(
    { __typename?: 'ACME' }
    & Pick<Types.Acme, 'id' | 'name'>
    & { certificates: Array<(
      { __typename?: 'Certificate' }
      & Pick<Types.Certificate, 'id' | 'createdAt' | 'certificate' | 'privateKey'>
    )> }
  ) | (
    { __typename?: 'Zone' }
    & Pick<Types.Zone, 'id' | 'domainName' | 'updatedDate'>
    & { zoneSettings: (
      { __typename?: 'ZoneSettings' }
      & Pick<Types.ZoneSettings, 'contact'>
    ), resourceRecords: Array<(
      { __typename?: 'ResourceRecord' }
      & Pick<Types.ResourceRecord, 'id' | 'host' | 'type' | 'ttl' | 'data'>
    )> }
  ) | (
    { __typename?: 'SubscriberSettings' }
    & Pick<Types.SubscriberSettings, 'TLSOutputMode'>
  )> }
);
