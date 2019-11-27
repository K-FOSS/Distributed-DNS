// DNSDL/src/index.ts
import { initApollo } from './initApollo';
import { getSubscribedZones, subscribeToZone } from './Subscriber';
import { handleZone } from './Zone';
import { restartContainer } from './Docker';
import { createBINDConfig } from './BINDConfig';

export const DATA_VOLUME =
  process.env.NODE_ENV === 'production'
    ? process.env.DATA_VOLUME || '/data'
    : 'data';

const subscriberToken = process.env.SUBSCRIBER_TOKEN;

const API_URL = process.env.API_URL || 'http://localhost/graphql';

export const domains = new Set<string>();

async function startDNSDL(): Promise<void> {
  console.log('Starting DNSDL');
  const client = initApollo({ URL: API_URL });

  console.log('Fetching subscribed Zones');
  const {
    data: { getSubscribedZones: zones }
  } = await getSubscribedZones({ client, subscriberToken });

  for (const zone of zones) {
    await handleZone(zone);
    domains.add(zone.domainName);
  }

  console.log('Subscribing to changes');

  const subscription = await subscribeToZone({ client, subscriberToken });
  subscription.subscribe({
    async next({ data: { subscribeToZones: zone } }) {
      console.log('Received zone update');
      await handleZone(zone);
      domains.add(zone.domainName);
      await createBINDConfig(domains);
      await restartContainer();
    }
  });

  await createBINDConfig(domains);
  await restartContainer();
}

startDNSDL();
