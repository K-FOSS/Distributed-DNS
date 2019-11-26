// SubscriberDL/src/Subscription/pullSubscribedEntities.ts
import { getSubscribedEntities } from './getSubscribedEntities'
import { createUpdateZoneFile, deleteZone } from '../Zones'
import { loadState } from '../State'

/**
 * Pulls the current Zones & TLS Certificates on the Subscriber
 */
export async function pullSubscribedEntities(): Promise<any> {
  const state = await loadState()
  console.log('Pulling the latest TLS Certificates & Zones')

  const subscribedEntities = await getSubscribedEntities()

  const toDeleteZones = state.zones.filter(
    ({ id }) =>
      !subscribedEntities.find(
        (entity) => 'domainName' in entity && entity.id === id,
      ),
  )
  for (const zoneToDelete of toDeleteZones) await deleteZone(zoneToDelete.id)
  console.log('Zones to delete', toDeleteZones)

  for (const entity of subscribedEntities) {
    if ('domainName' in entity) await createUpdateZoneFile(entity)
  }
}
