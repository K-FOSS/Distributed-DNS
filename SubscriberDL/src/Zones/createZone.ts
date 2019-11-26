// SubscriberDL/src/Zones/createZone.ts
import { ZONE, generateZoneFile } from 'ts-zone-file'
import { loadState, ZoneState, saveState } from '../State'
import { ZoneFragment } from './Zone.gen'
import { processResourceRecords } from './ResourceRecords'
import { outputFile } from 'fs-extra'
import { config } from '../Config'
import { createBINDConfig } from './createBINDConfig'
import { restartBINDContainer } from '../Docker'

/**
 * Create a BIND9 Zone
 */
export async function createUpdateZoneFile(zone: ZoneFragment): Promise<void> {
  const currentState = await loadState()
  console.log(currentState)

  let zoneState = currentState.zones.find(({ id }) => id === zone.id)
  if (zoneState) {
    console.log('Zone already exists')
    console.log(zoneState)

    if (zoneState.updatedDate === zone.updatedDate) return

    console.log('Updating existing zone')
  } else {
    zoneState = {
      id: zone.id,
      updatedDate: zone.updatedDate,
      domainName: zone.domainName,
    }
    currentState.zones.push(zoneState)
  }

  const bindZone: ZONE = {
    $origin: zoneState.domainName,
    $ttl: 100,
    soa: {
      contact: zone.zoneSettings.contact,
      serial: '1',
      refresh: '2500',
      retry: '2500',
      expire: '2500',
      mttl: '300',
    },
    ns: [],
  }

  processResourceRecords(zone.resourceRecords, bindZone)

  const zoneFile = await generateZoneFile(bindZone)

  await outputFile(`${config.dataPath}/Zones/${zoneState.domainName}`, zoneFile)
  await saveState(currentState)

  await createBINDConfig()

  await restartBINDContainer()
}
