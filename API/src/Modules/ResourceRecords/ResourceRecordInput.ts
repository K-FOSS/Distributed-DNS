// API/src/Modules/ResourceRecord/ResourceRecordInput.ts
import { InputType, Field, Int } from 'type-graphql';
import { ResourceRecord } from './ResourceRecordModel';
import { SRVProtocol } from './CreateResourceRecordInput';

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

@InputType()
export class SRVResourceRecordInput implements Partial<ResourceRecord> {
  @Field({ nullable: true })
  host?: string

  @Field(() => Int, { nullable: true })
  ttl?: number;

  @Field({ nullable: true })
  service?: string

  @Field(() => SRVProtocol, { nullable: true })
  protocol?: SRVProtocol

  @Field(() => Int, { nullable: true })
  priority?: number;

  @Field(() => Int, { nullable: true })
  weight?: number;

  @Field(() => Int, { nullable: true })
  port?: number;

  @Field({ nullable: true })
  target?: string
}