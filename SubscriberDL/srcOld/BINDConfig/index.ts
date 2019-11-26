// DNSDL/src/BINDConfig/index.ts
import { generateConfig, ZONECONFIG } from 'ts-zone-file';
import { DATA_VOLUME } from '../index';
import { outputFile } from 'fs-extra';

export async function createBINDConfig(domains: Set<string>): Promise<void> {
  let zones: ZONECONFIG[] = [];

  for (const domainName of domains)
    zones.push({
      type: 'master',
      name: domainName,
      file: `/Zones/${domainName}`
    });

  const config = await generateConfig({
    options: {
      directory: '/var/bind',
      listenOn: ['any'],
      recursion: false,
      allowRecursion: ['none']
    },
    zones
  });

  return outputFile(`${DATA_VOLUME}/BIND/named.conf`, config);
}
