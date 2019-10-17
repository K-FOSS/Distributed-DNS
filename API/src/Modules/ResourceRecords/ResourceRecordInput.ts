// API/src/Modules/ResourceRecord/ResourceRecordInput.ts
import { InputType, Field } from 'type-graphql';
import { ResourceRecord } from './ResourceRecordModel';

@InputType()
export class ValueResourceRecordInput implements Partial<ResourceRecord> {
  @Field({ nullable: true })
  host?: string;

  @Field({ nullable: true })
  ttl?: number;

  @Field({ nullable: true })
  value?: string;
}
