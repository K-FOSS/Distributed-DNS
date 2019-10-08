// API/src/Modules/ResourceRecords/ResourceRecordResolver.ts
import { Resolver, Mutation, Arg, Ctx, Authorized } from 'type-graphql';
import { CreateValueResourceRecordInput } from './CreateResourceRecordInput';
import { ResourceRecord } from './ResourceRecordModel';
import { Zone } from '../Zones/ZoneModel';
import { AuthContext } from 'API/Context';
import { ZoneAccessPermission } from '../Zones/ZonePermissionModel';
import { ResourceRecordType } from './ResourceRecordTypes';

@Resolver(() => ResourceRecord)
export class ResourceRecordResolver {
  @Authorized()
  @Mutation(() => Zone)
  async createValueResourceRecord(
    @Arg('input')
    {
      zoneId,
      value,
      recordType,
      ttl,
      ...input
    }: CreateValueResourceRecordInput,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Zone> {
    const zone = await Zone.getUserZone(
      currentUser,
      zoneId,
      ZoneAccessPermission.WRITE,
      { relations: ['resourceRecords'] },
    );
    await ResourceRecord.create({
      zoneId: zone.id,
      data: JSON.stringify({ value, ttl }),
      type: ResourceRecordType[recordType],
      ...input,
    }).save();

    return zone;
  }
}
