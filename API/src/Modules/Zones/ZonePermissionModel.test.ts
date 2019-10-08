// API/src/Modules/Zones/ZonePermissionModel.test.ts
import { ZonePermissions, ZoneAccessPermission } from './ZonePermissionModel';
import { factory } from 'API/Library/Factory';
import { Zone } from './ZoneModel';
import { User } from '../Users/UserModel';

describe('Zone Permission Model', () => {
  test('Zone Read Permissions', async () => {
    const user = await factory.for(User).create(1);

    const zone = await factory.for(Zone).create(1);

    await factory.for(ZonePermissions).create(1, {
      zoneId: zone.id,
      userId: user.id,
      accessPermissions: [ZoneAccessPermission.READ],
    });

    expect(
      zone.checkUserAuthorization(user, ZoneAccessPermission.READ),
    ).resolves.not.toThrow();
    expect(
      zone.checkUserAuthorization(user, ZoneAccessPermission.WRITE),
    ).rejects.toThrow();

    expect(
      zone.checkUserAuthorization(user, ZoneAccessPermission.ADMIN),
    ).rejects.toThrow();
  });

  test('Zone Write Permissions', async () => {
    const user = await factory.for(User).create(1);

    const zone = await factory.for(Zone).create(1);

    await factory.for(ZonePermissions).create(1, {
      zoneId: zone.id,
      userId: user.id,
      accessPermissions: [
        ZoneAccessPermission.READ,
        ZoneAccessPermission.WRITE,
      ],
    });

    expect(
      zone.checkUserAuthorization(user, ZoneAccessPermission.READ),
    ).resolves.not.toThrow();

    expect(
      zone.checkUserAuthorization(user, ZoneAccessPermission.WRITE),
    ).resolves.not.toThrow();

    expect(
      zone.checkUserAuthorization(user, ZoneAccessPermission.ADMIN),
    ).rejects.toThrow();
  });

  test('Zone Admin Permissions', async () => {
    const user = await factory.for(User).create(1);

    const zone = await factory.for(Zone).create(1);

    await factory.for(ZonePermissions).create(1, {
      zoneId: zone.id,
      userId: user.id,
      accessPermissions: [
        ZoneAccessPermission.READ,
        ZoneAccessPermission.WRITE,
        ZoneAccessPermission.ADMIN,
      ],
    });

    expect(
      zone.checkUserAuthorization(user, ZoneAccessPermission.READ),
    ).resolves.not.toThrow();

    expect(
      zone.checkUserAuthorization(user, ZoneAccessPermission.WRITE),
    ).resolves.not.toThrow();

    expect(
      zone.checkUserAuthorization(user, ZoneAccessPermission.ADMIN),
    ).resolves.not.toThrow();
  });
});
