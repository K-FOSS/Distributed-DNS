// SubscriberDL/src/Subscription/pullSubscribedEntities.ts
import { getSubscribedEntities } from './getSubscribedEntities'
import { createUpdateZoneFile } from '../Zones'

/**
 * Pulls the current Zones & TLS Certificates on the Subscriber
 */
export async function pullSubscribedEntities(): Promise<any> {
  console.log('Pulling the latest TLS Certificates & Zones')

  const subscribedEntities = await getSubscribedEntities()

  for (const entity of subscribedEntities) {
    if ('domainName' in entity) await createUpdateZoneFile(entity)
  }
}
