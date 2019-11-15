// API/src/Modules/ResourceRecords/ResourceRecordTypes.ts
import { registerEnumType } from 'type-graphql';

export enum ResourceRecordType {
  A = 'A',
  NS = 'NS',
  TXT = 'TXT',
  CNAME = 'CNAME',
  DNAME = 'DNAME',
  AAAA = 'AAAA',
  MX = 'MX',
  SRV = 'SRV'
}

registerEnumType(ResourceRecordType, { name: 'ResourceRecordType' });
