// API/src/Modules/ResourceRecord/ResourceRecordInput.ts
import { InputType, Field, Int } from 'type-graphql';
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

@InputType()
export class MXResourceRecordInput implements Partial<ResourceRecord> {
  @Field({ nullable: true })
  host?: string;

  @Field(() => Int, { nullable: true })
  ttl?: number;

  @Field(() => Int, { nullable: true })
  preference?: number;

  @Field({ nullable: true })
  value?: string;
}
