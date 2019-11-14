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
export class CreateValueResourceRecordInput {
  @Field(() => ValueRecordTypes)
  type: ValueRecordTypes;

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
  host: string;

  @Field(() => Int, { nullable: true })
  ttl?: number;

  @Field(() => Int)
  preference: number;

  @Field()
  value: string;
}

/**
 * 
 * 
 *     service: string;
    protocol: string;
    host: string;
    ttl?: number;
    priority: number;
    weight: number;
    port: number;
    target: string;
 * 
 * 
 * 
 */

export enum SRVProtocol {
  TCP = '_tcp',
  UDP = '_udp',
  TLS = '_tls',
  LDAP = '_ldap',
  HTTP = '_http',
  OCSP = '_oscp'
}

registerEnumType(SRVProtocol, {
  name: 'SRVProtocol'
})

@InputType()
export class CreateSRVResourceRecordInput implements Partial<ResourceRecord> {
  @Field()
  host: string

  @Field(() => Int, { nullable: true })
  ttl?: number;

  @Field()
  service: string

  @Field(() => SRVProtocol)
  protocol: SRVProtocol

  @Field(() => Int)
  priority: number;

  @Field(() => Int)
  weight: number;

  @Field(() => Int)
  port: number;

  @Field()
  target: string
}