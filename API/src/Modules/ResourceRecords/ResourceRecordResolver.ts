// API/src/Modules/ResourceRecords/ResourceRecordResolver.ts
import { Resolver, Mutation, Arg, Ctx, Authorized, ID } from 'type-graphql';
import {
  CreateValueResourceRecordInput,
  CreateMXResourceRecordInput,
  CreateSRVResourceRecordInput,
  SRVProtocol,
} from './CreateResourceRecordInput';
import { ResourceRecord } from './ResourceRecordModel';
import { Zone } from '../Zones/ZoneModel';
import { AuthContext } from 'API/Context';
import { ResourceRecordType } from './ResourceRecordTypes';
import {
  ValueResourceRecordInput,
  MXResourceRecordInput,
  SRVResourceRecordInput,
} from './ResourceRecordInput';
import { Permission } from '../Permission/Permission';

@Resolver(() => ResourceRecord)
export class ResourceRecordResolver {
  @Authorized()
  @Mutation(() => Zone)
  async createValueResourceRecord(
    @Arg('zoneId', () => ID) zoneId: string,
    @Arg('input')
    { value, type, ...input }: CreateValueResourceRecordInput,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Zone> {
    const zone = await Zone.getUserZone(currentUser, zoneId, Permission.WRITE, {
      relations: ['resourceRecords'],
    });

    await ResourceRecord.create({
      zoneId: zone.id,
      data: JSON.stringify({ value }),
      type: ResourceRecordType[type],
      ...input,
    }).save();

    return zone;
  }

  @Authorized()
  @Mutation(() => Zone)
  async createMXResourceRecord(
    @Arg('zoneId', () => ID) zoneId: string,
    @Arg('input') { host, preference, value, ttl }: CreateMXResourceRecordInput,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Zone> {
    const zone = await Zone.getUserZone(currentUser, zoneId, Permission.WRITE, {
      relations: ['resourceRecords'],
    });

    await ResourceRecord.create({
      zoneId: zone.id,
      host: host,
      data: JSON.stringify({ value, preference }),
      type: ResourceRecordType[ResourceRecordType.MX],
      ttl,
    }).save();

    return zone;
  }

  @Mutation(() => Zone)
  async createSRVResourceRecord(
    @Arg('zoneId', () => ID) zoneId: string,
    @Arg('input') { host, ttl, ...RR }: CreateSRVResourceRecordInput,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Zone> {
    const zone = await Zone.getUserZone(currentUser, zoneId, Permission.WRITE, {
      relations: ['resourceRecords'],
    });

    await ResourceRecord.create({
      zoneId: zone.id,
      host: host,
      data: JSON.stringify(RR),
      type: ResourceRecordType[ResourceRecordType.SRV],
      ttl,
    }).save();

    return zone;
  }

  @Authorized()
  @Mutation(() => Zone)
  async deleteResourceRecord(
    @Arg('resourceRecordId', () => ID) resourceRecordId: string,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Zone> {
    const resourceRecord = await ResourceRecord.findOneOrFail(
      resourceRecordId,
      { relations: ['zone'] },
    );

    await resourceRecord.zone.checkUserAuthorization(
      currentUser,
      Permission.WRITE,
    );

    await resourceRecord.remove();

    return resourceRecord.zone;
  }

  @Authorized()
  @Mutation(() => Zone)
  async updateValueResourceRecord(
    @Arg('resourceRecordId', () => ID) resourceRecordId: string,
    @Arg('input')
    { host, value, ttl }: ValueResourceRecordInput,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Zone> {
    const resourceRecord = await ResourceRecord.findOneOrFail(
      resourceRecordId,
      { relations: ['zone'] },
    );

    await resourceRecord.zone.checkUserAuthorization(
      currentUser,
      Permission.WRITE,
    );

    if (host) resourceRecord.host = host;
    if (value) resourceRecord.data = JSON.stringify({ value });
    if (ttl) resourceRecord.ttl = ttl;
    else resourceRecord.ttl = null;
    await resourceRecord.save();

    return resourceRecord.zone;
  }

  @Authorized()
  @Mutation(() => Zone)
  async updateMXResourceRecord(
    @Arg('resourceRecordId', () => ID) resourceRecordId: string,
    @Arg('input')
    { host, value, ttl, preference }: MXResourceRecordInput,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Zone> {
    const resourceRecord = await ResourceRecord.findOneOrFail(
      resourceRecordId,
      { relations: ['zone'] },
    );

    await resourceRecord.zone.checkUserAuthorization(
      currentUser,
      Permission.WRITE,
    );

    if (host) resourceRecord.host = host;
    if (value || preference) {
      let data: { preference: number; value: string } = JSON.parse(
        resourceRecord.data,
      );

      if (value) data = { ...data, value };

      if (preference) data = { ...data, preference };

      resourceRecord.data = JSON.stringify(data);
    }
    if (ttl) resourceRecord.ttl = ttl;
    else resourceRecord.ttl = null;
    await resourceRecord.save();

    return resourceRecord.zone;
  }

  @Authorized()
  @Mutation(() => Zone)
  async updateSRVResourceRecord(
    @Arg('resourceRecordId', () => ID) resourceRecordId: string,
    @Arg('input')
    { host, ttl, ...RRData }: SRVResourceRecordInput,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Zone> {
    const resourceRecord = await ResourceRecord.findOneOrFail(
      resourceRecordId,
      { relations: ['zone'] },
    );

    await resourceRecord.zone.checkUserAuthorization(
      currentUser,
      Permission.WRITE,
    );

    if (host) resourceRecord.host = host;
    if (RRData) {
      let data: {
        service: string;
        protocol: SRVProtocol;
        priority: number;
        weight: number;
        port: number;
        target: string;
      } = JSON.parse(resourceRecord.data);

      data = { ...data, ...RRData };

      resourceRecord.data = JSON.stringify(data);
    }
    if (ttl) resourceRecord.ttl = ttl;
    else resourceRecord.ttl = null;
    await resourceRecord.save();

    return resourceRecord.zone;
  }
}
