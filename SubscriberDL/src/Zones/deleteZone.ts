// SubscriberDL/src/Zones/deleteZone.ts
import { remove } from 'fs-extra'
import { loadState, saveState, ZoneState } from '../State'
import { createBINDConfig } from './createBINDConfig'
import { config } from '../Config'
import { restartBINDContainer } from '../Docker'

export async function deleteZone(zoneId: string): Promise<void> {
  const state = await loadState()

  let zone: ZoneState

  const zoneToDeleteIndex = state.zones.findIndex(({ id }) => id === zoneId)
  if (zoneToDeleteIndex === -1) {
    const msg = 'Zone deletion failed. Does not exist'

    console.error(msg)
    throw new Error(msg)
  } else {
    zone = { ...state.zones[zoneToDeleteIndex] }
    state.zones.splice(zoneToDeleteIndex, 1)
  }

  await saveState(state)

  await Promise.all([
    createBINDConfig(),
    remove(`${config.dataPath}/Zones/${zone.domainName}`),
  ])

  return restartBINDContainer()
}
