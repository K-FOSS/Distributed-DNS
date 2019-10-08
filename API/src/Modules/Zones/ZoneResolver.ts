// API/src/Modules/Zones/ZoneResolver.ts
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Root,
} from 'type-graphql';
import { Zone } from './ZoneModel';
import { ZoneInput } from './ZoneInput';
import { ZonePermissions, ZoneAccessPermission } from './ZonePermissionModel';
import { AuthContext } from 'API/Context';
import { ResourceRecord } from '../ResourceRecords/ResourceRecordModel';
import { UserRole } from '../Users/UserRole';
import { ResourceRecordType } from '../ResourceRecords/ResourceRecordTypes';
import { ResourceRecordFilter } from './ResourceRecordFilter';

@Resolver(() => Zone)
export class ZoneResolver {
  @Authorized()
  @Query(() => [Zone])
  async zones(@Ctx() { currentUser }: AuthContext): Promise<Zone[]> {
    return Zone.getUserZones(currentUser, ZoneAccessPermission.READ);
  }

  @Authorized()
  @Query(() => Zone)
  async zone(
    @Arg('zoneId') zoneId: string,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Zone> {
    return Zone.getUserZone(currentUser, zoneId, ZoneAccessPermission.READ);
  }

  @Authorized([UserRole.ADMIN])
  @Mutation(() => Zone)
  async createZone(@Arg('input')
  {
    zoneOwnerUserId,
    ns,
    ...zoneInput
  }: ZoneInput): Promise<Zone> {
    const zone = await Zone.create(zoneInput).save();

    await ZonePermissions.create({
      zoneId: zone.id,
      userId: zoneOwnerUserId,
      accessPermissions: [
        ZoneAccessPermission.READ,
        ZoneAccessPermission.WRITE,
        ZoneAccessPermission.ADMIN,
      ],
    }).save();

    await ResourceRecord.create({
      zoneId: zone.id,
      type: ResourceRecordType.NS,
      host: '@',
      data: JSON.stringify({ value: ns }),
    }).save();

    return zone;
  }

  @FieldResolver(() => [ResourceRecord])
  async resourceRecords(
    @Root() { id }: Zone,
    @Arg('filter', { nullable: true }) filter: ResourceRecordFilter,
  ): Promise<ResourceRecord[]> {
    return ResourceRecord.find({ where: { zoneId: id, ...filter } });
  }
}
