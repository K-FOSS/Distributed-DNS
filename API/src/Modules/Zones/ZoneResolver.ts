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
  ID,
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
import { ZoneUserInput } from './ZoneSettingsInput';
import { ApolloError } from 'apollo-server-koa';

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

  @Authorized()
  @Mutation(() => Zone)
  async addZoneUser(@Arg('zoneId', () => ID) zoneId: string, @Arg('input') { userId, accessPermission }: ZoneUserInput, @Ctx() { currentUser }: AuthContext): Promise<Zone> {
    const zone = await Zone.getUserZone(currentUser, zoneId, Permission.ADMIN, { relations: ['accessPermissions'] })
    
    const existingPermissions = zone.accessPermissions.find(({ userId: oldUserId }) => oldUserId === userId)
    if (existingPermissions) throw new ApolloError('USER ALREADY IN ZONE')

    let newUserAccessPermission: Permission[]
    
    if (accessPermission === Permission.ADMIN) newUserAccessPermission = [Permission.READ, Permission.WRITE, Permission.ADMIN]
    else if (accessPermission === Permission.WRITE) newUserAccessPermission = [Permission.READ, Permission.WRITE]
    else if (accessPermission === Permission.READ) newUserAccessPermission = [Permission.READ]

    const userZonePermissions = ZonePermissions.create({
      userId: userId,
      accessPermissions: newUserAccessPermission!,
    })

    zone.accessPermissions.push(userZonePermissions)

    await zone.save()
    
    return zone;
  }

  @Authorized([UserRole.ADMIN])
  @Mutation(() => Zone)
  async createZone(@Arg('input')
  {
    zoneUserIds,
    ns,
    contact,
    ...zoneInput
  }: ZoneInput): Promise<Zone> {
    const zone = Zone.create(zoneInput);
    const zoneSettings = ZoneSettings.create({ contact });
    const zonePermissions = zoneUserIds.map((userId) =>
      ZonePermissions.create({
        userId: userId,
        accessPermissions: [
          Permission.READ,
          Permission.WRITE,
          Permission.ADMIN,
        ],
      }),
    );
    zone.zoneSettings = zoneSettings;
    zone.accessPermissions = zonePermissions;

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

  @Authorized()
  @FieldResolver(() => Permission)
  async userPermission(
    @Root() { id }: Zone,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Permission> {
    const userPermission = await ZonePermissions.findOneOrFail({
      where: { zoneId: id, userId: currentUser.id },
    });

    if (userPermission.accessPermissions.includes(Permission.ADMIN))
      return Permission.ADMIN;
    else if (userPermission.accessPermissions.includes(Permission.WRITE))
      return Permission.WRITE;
    else if (userPermission.accessPermissions.includes(Permission.READ))
      return Permission.READ;

    throw new Error();
  }

  @Authorized()
  @FieldResolver(() => [Permission])
  async userPermissions(
    @Root() { id }: Zone,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Permission[]> {
    const userPermission = await ZonePermissions.findOneOrFail({
      where: { zoneId: id, userId: currentUser.id },
    });

    return userPermission.accessPermissions;
  }

  @Authorized()
  @FieldResolver(() => [ZonePermissions])
  async accessPermissions(
    @Root() zone: Zone,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<ZonePermissions[]> {
    await zone.checkUserAuthorization(
      currentUser,
      Permission.ADMIN,
    );

    return ZonePermissions.find({
      where: { zoneId: zone.id },
    });
  }
}
