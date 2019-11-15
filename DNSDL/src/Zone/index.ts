// DNSDL/src/Zone/index.ts
import { ZONE, generateZoneFile } from 'ts-zone-file';
import { ZoneFragment } from './Zone.gen';
import { handleResourceRecords } from '../ResourceRecords/index';
import { outputFile } from 'fs-extra';
import { DATA_VOLUME } from '..';

export async function handleZone(zone: ZoneFragment): Promise<void> {
  const zoneFile: ZONE = {
    soa: {
      contact: zone.zoneSettings.contact,
      serial: '1',
      refresh: '2500',
      retry: '2500',
      expire: '2500',
      mttl: '300'
    },
    $origin: zone.domainName,
    ns: []
  };

  await handleResourceRecords(zone.resourceRecords, zoneFile);

  return outputFile(
    `${DATA_VOLUME}/Zones/${zone.domainName}`,
    await generateZoneFile(zoneFile)
  );
}
