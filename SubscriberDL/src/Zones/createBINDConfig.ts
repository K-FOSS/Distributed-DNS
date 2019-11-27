// SubscriberDL/src/Zones/createBINDConfig.ts
import { generateConfig, ZONECONFIG } from 'ts-zone-file'
import { loadState } from '../State'
import { outputFile } from 'fs-extra'
import { config } from '../Config'

export async function createBINDConfig(): Promise<any> {
  const state = await loadState()

  const zones: ZONECONFIG[] = []

  for (const zone of state.zones)
    zones.push({
      name: zone.domainName,
      file: `/zones/${zone.domainName}`,
      type: 'master',
    })

  const bindConfig = await generateConfig({
    options: {
      directory: '/var/bind',
      listenOn: ['any'],
      recursion: false,
      allowRecursion: ['none'],
    },
    zones,
  })

  return outputFile(`${config.dataPath}/BIND/named.conf`, bindConfig)
}
