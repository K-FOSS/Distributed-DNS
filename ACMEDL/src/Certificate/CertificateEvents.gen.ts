import * as Types from '../graphqlTypes.gen';


import gql from 'graphql-tag';

export const CertificateEvents = gql`
    subscription CertificateEvents($ACMEToken: String!) {
  certificateEvents(ACMEToken: $ACMEToken) {
    privateKey
    certificate
  }
}
    `;
export type CertificateEventsSubscriptionVariables = {
  ACMEToken: Types.Scalars['String']
};


export type CertificateEventsSubscription = (
  { __typename?: 'Subscription' }
  & { certificateEvents: (
    { __typename?: 'Certificate' }
    & Pick<Types.Certificate, 'privateKey' | 'certificate'>
  ) }
);
