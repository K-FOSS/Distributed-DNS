// API/src/Modules/ResourcesRecord/CreateResourceRecordInput.ts
import { InputType, Field, Int, registerEnumType } from 'type-graphql';
import { ResourceRecord } from './ResourceRecordModel';

enum ValueRecordTypes {
  A = 'A',
  NS = 'NS',
  CNAME = 'CNAME',
  DNAME = 'DNAME',
  AAAA = 'AAAA',
  TXT = 'TXT',
}

registerEnumType(ValueRecordTypes, { name: 'ValueRecordType' });

@InputType()
export class CreateValueResourceRecordInput implements Partial<ResourceRecord> {
  @Field()
  zoneId: string;

  @Field(() => ValueRecordTypes)
  recordType: ValueRecordTypes;

  @Field(() => Int, { nullable: true })
  ttl?: number;

  @Field()
  host: string;

  @Field()
  value: string;
}

@InputType()
export class CreateMXResourceRecordInput implements Partial<ResourceRecord> {
  @Field()
  zoneId: string;

  @Field()
  host: string;

  @Field(() => Int, { nullable: true })
  ttl?: number;

  @Field(() => Int)
  preference: number;

  @Field()
  value: string;
}
