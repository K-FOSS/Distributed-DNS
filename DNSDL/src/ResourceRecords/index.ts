// DNSDL/src/ResourceRecords/index.ts
import { ZONE } from 'ts-zone-file';
import { ResourceRecordFragment } from './ResourceRecord.gen';

type ResourceRecordLowerTypes = 'a' | 'ns';

export async function handleResourceRecords(
  resourceRecords: ResourceRecordFragment[],
  zone: ZONE
): Promise<any> {
  for (const { host, data, type } of resourceRecords) {
    if (!zone[type.toLowerCase() as ResourceRecordLowerTypes])
      zone[type.toLowerCase() as ResourceRecordLowerTypes] = [];
    zone[type.toLowerCase() as ResourceRecordLowerTypes].push({
      host,
      ...JSON.parse(data)
    });
  }
}
