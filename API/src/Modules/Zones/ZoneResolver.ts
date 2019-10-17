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
import { ZonePermissions } from './ZonePermissionModel';
import { AuthContext } from 'API/Context';
import { ResourceRecord } from '../ResourceRecords/ResourceRecordModel';
import { UserRole } from '../Users/UserRole';
import { ResourceRecordType } from '../ResourceRecords/ResourceRecordTypes';
import { ResourceRecordFilter } from './ResourceRecordFilter';
import { ZoneSettings } from './ZoneSettingsModel';
import { Permission } from '../Permission/Permission';

@Resolver(() => Zone)
export class ZoneResolver {
  @Authorized()
  @Query(() => [Zone])
  async zones(@Ctx() { currentUser }: AuthContext): Promise<Zone[]> {
    return Zone.getUserZones(currentUser, Permission.READ);
  }

  @Authorized()
  @Query(() => Zone)
  async zone(
    @Arg('zoneId') zoneId: string,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Zone> {
    return Zone.getUserZone(currentUser, zoneId, Permission.READ);
  }

  /*   @Authorized()
  @Mutation(() => Zone)
  async updateZoneSettings(
    @Arg('zoneId') zoneId: string,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Zone> {
    const zone = await Zone.getUserZone(
      currentUser,
      zoneId,
      Permission.ADMIN,
    );

    const zoneSettings = ZoneSettings.create({});
    zone.zoneSettings = zoneSettings;

    await zone.save();

    return zone;
  }
 */

  @Authorized([UserRole.ADMIN])
  @Mutation(() => Zone)
  async createZone(@Arg('input')
  {
    zoneOwnerUserId,
    ns,
    ...zoneInput
  }: ZoneInput): Promise<Zone> {
    const zone = Zone.create(zoneInput);
    const zoneSettings = ZoneSettings.create();
    const zonePermissions = ZonePermissions.create({
      userId: zoneOwnerUserId,
      accessPermissions: [Permission.READ, Permission.WRITE, Permission.ADMIN],
    });
    zone.zoneSettings = zoneSettings;
    zone.accessPermissions = [zonePermissions];

    const nsRecord = ResourceRecord.create({
      type: ResourceRecordType.NS,
      host: '@',
      data: JSON.stringify({ value: ns }),
    });
    zone.resourceRecords = [nsRecord];

    await zone.save();

    return zone;
  }

  @FieldResolver(() => [ResourceRecord])
  async resourceRecords(
    @Root() { id }: Zone,
    @Arg('filter', { nullable: true }) filter: ResourceRecordFilter,
  ): Promise<ResourceRecord[]> {
    return ResourceRecord.find({ where: { zoneId: id, ...filter } });
  }

  @FieldResolver(() => ZoneSettings)
  zoneSettings(@Root() { zoneSettingsId }: Zone): Promise<ZoneSettings> {
    return ZoneSettings.findOneOrFail(zoneSettingsId);
  }
}
