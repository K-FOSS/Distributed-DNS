// API/src/Modules/Zones/ZonePermissionModel.test.ts
import { ZonePermissions } from './ZonePermissionModel';
import { factory } from 'API/Library/Factory';
import { Zone } from './ZoneModel';
import { User } from '../Users/UserModel';
import { Permission } from '../Permission/Permission';

describe('Zone Permission Model', () => {
  test('Zone Read Permissions', async () => {
    const user = await factory.for(User).create(1);

    const zone = await factory.for(Zone).create(1);

    await factory.for(ZonePermissions).create(1, {
      zoneId: zone.id,
      userId: user.id,
      accessPermissions: [Permission.READ],
    });

    expect(
      zone.checkUserAuthorization(user, Permission.READ),
    ).resolves.not.toThrow();
    expect(
      zone.checkUserAuthorization(user, Permission.WRITE),
    ).rejects.toThrow();

    expect(
      zone.checkUserAuthorization(user, Permission.ADMIN),
    ).rejects.toThrow();
  });

  test('Zone Write Permissions', async () => {
    const user = await factory.for(User).create(1);

    const zone = await factory.for(Zone).create(1);

    await factory.for(ZonePermissions).create(1, {
      zoneId: zone.id,
      userId: user.id,
      accessPermissions: [Permission.READ, Permission.WRITE],
    });

    expect(
      zone.checkUserAuthorization(user, Permission.READ),
    ).resolves.not.toThrow();

    expect(
      zone.checkUserAuthorization(user, Permission.WRITE),
    ).resolves.not.toThrow();

    expect(
      zone.checkUserAuthorization(user, Permission.ADMIN),
    ).rejects.toThrow();
  });

  test('Zone Admin Permissions', async () => {
    const user = await factory.for(User).create(1);

    const zone = await factory.for(Zone).create(1);

    await factory.for(ZonePermissions).create(1, {
      zoneId: zone.id,
      userId: user.id,
      accessPermissions: [Permission.READ, Permission.WRITE, Permission.ADMIN],
    });

    expect(
      zone.checkUserAuthorization(user, Permission.READ),
    ).resolves.not.toThrow();

    expect(
      zone.checkUserAuthorization(user, Permission.WRITE),
    ).resolves.not.toThrow();

    expect(
      zone.checkUserAuthorization(user, Permission.ADMIN),
    ).resolves.not.toThrow();
  });
});
