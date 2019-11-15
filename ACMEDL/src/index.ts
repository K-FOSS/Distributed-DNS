// ACMEDL/src/index.ts
import { initApollo } from './initApollo';
import { subscribeToCertificateEvents } from './Certificate/CertificateEvents';

export const DATA_VOLUME =
  process.env.NODE_ENV === 'production'
    ? process.env.DATA_VOLUME || '/data'
    : 'data';

const acmeToken =
  process.env.ACME_TOKEN ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY21lSWQiOiIwNmExOGFjNS03NTNhLTRjMzAtOTVmNS1iYjdjMWJjZGVkNzgiLCJpYXQiOjE1NzEzNDU1NzZ9.4CrlsvL2ta-3jKmOxFbUCj4SkSbVKJvt6n6OnzxQ-0o';

const API_URL = process.env.API_URL || 'http://localhost/graphql';

async function startACMEDL(): Promise<void> {
  const client = initApollo({ URL: API_URL });

  console.log('Starting ACMEDL');

  console.log('Subscribing to Certificate Events');

  await subscribeToCertificateEvents(client, acmeToken);
}

startACMEDL();
