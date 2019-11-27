// SubscriberDL/src/Zones/ResourceRecords/processResourceRecords.ts
import { ResourceRecordFragment } from './ResourceRecord.gen'
import { ZONE } from 'ts-zone-file'
import { ResourceRecordType } from '../../graphqlTypes.gen'

type RRLowers = 'a' | 'ns' | 'txt' | 'cname' | 'dname' | 'aaaa' | 'mx' | 'srv'

const rrNames: { [key in ResourceRecordType]: RRLowers } = {
  A: 'a',
  NS: 'ns',
  CNAME: 'cname',
  TXT: 'txt',
  DNAME: 'dname',
  AAAA: 'aaaa',
  MX: 'mx',
  SRV: 'srv',
}

export function processResourceRecords(
  RRs: ResourceRecordFragment[],
  zone: ZONE,
): void {
  for (const { host, type, ttl, data } of RRs) {
    // @ts-ignore
    if (!zone[rrNames[type]]) zone[rrNames[type]] = []

    zone[rrNames[type]].push({
      host,
      ttl,
      ...JSON.parse(data),
    })
  }
}
