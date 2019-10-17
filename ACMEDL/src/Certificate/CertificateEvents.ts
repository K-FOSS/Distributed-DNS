// ACMEDL/src/Certificates/CertificateEvents.ts
import { ApolloClient } from 'apollo-client';
import {
  CertificateEvents,
  CertificateEventsSubscription,
  CertificateEventsSubscriptionVariables,
} from './CertificateEvents.gen';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { outputCertificate } from './outputCertificate';
import { analyzeCertificate } from './AnalyzeCertificate';

export async function subscribeToCertificateEvents(
  client: ApolloClient<NormalizedCacheObject>,
  ACMEToken: string,
): Promise<void> {
  client
    .subscribe<
      CertificateEventsSubscription,
      CertificateEventsSubscriptionVariables
    >({
      query: CertificateEvents,
      variables: {
        ACMEToken,
      },
    })
    .subscribe({
      next({ data }) {
        if (!data) return;

        const cert = analyzeCertificate(data.certificateEvents.certificate);
        console.log(cert);

        console.log('Received new Certificate');
        outputCertificate(data.certificateEvents);
      },
    });
}
