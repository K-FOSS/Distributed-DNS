// API/src/Modules/Zones/ZoneModel.test.ts
import { factory } from 'API/Library/Factory';
import { User } from '../Users/UserModel';
import { UserRole } from '../Users/UserRole';
import { execute } from 'API/Library/execute';
import { getTestContext } from 'API/Context';
import { ZonePermissions, ZoneAccessPermission } from './ZonePermissionModel';
import { Zone } from './ZoneModel';
import { ResourceRecord } from '../ResourceRecords/ResourceRecordModel';
import { ResourceRecordType } from '../ResourceRecords/ResourceRecordTypes';

describe('Zone Model', () => {
  test('Zones Query', async () => {
    const user = await factory.for(User).create(1);

    const zone = await factory.for(Zone).create(1);

    await factory.for(ZonePermissions).create(1, {
      zoneId: zone.id,
      userId: user.id,
      accessPermissions: [ZoneAccessPermission.READ],
    });

    await factory
      .for(ResourceRecord)
      .state('NS')
      .create(1, { zoneId: zone.id });

    const { data, errors } = await execute(
      `query {
      zones {
        domainName
        id
        resourceRecords {
          host
          type
        }
      }
    }`,
      await getTestContext(user.id),
    );

    expect(data.zones[0].domainName).toBe(zone.domainName);
    expect(data.zones[0].resourceRecords[0]).toBeDefined();
    expect(data.zones[0].resourceRecords[0].type).toBe(ResourceRecordType.NS);
    expect(errors).toBeUndefined();
  });

  describe('Zone Query', () => {
    test('Authorized Access', async () => {
      const user = await factory.for(User).create(1);

      const zone = await factory.for(Zone).create(1);

      await factory.for(ZonePermissions).create(1, {
        zoneId: zone.id,
        userId: user.id,
        accessPermissions: [ZoneAccessPermission.READ],
      });

      const resourceRecord = await factory
        .for(ResourceRecord)
        .state('NS')
        .create(1, { zoneId: zone.id });

      const { data, errors } = await execute(
        `query {
          zone(zoneId: "${zone.id}") {
            domainName
            id
            resourceRecords {
              host
              type
            }
          }
        }`,
        await getTestContext(user.id),
      );

      expect(data.zone.domainName).toBe(zone.domainName);
      expect(data.zone.resourceRecords[0]).toBeDefined();
      expect(data.zone.resourceRecords[0].type).toBe(ResourceRecordType.NS);
      expect(data.zone.resourceRecords[0].host).toBe(resourceRecord.host);
      expect(data.zone.id).toBe(zone.id);
      expect(errors).toBeUndefined();
    });

    test('Unauthorized Access', async () => {
      const authorizedUser = await factory.for(User).create(1);
      const user = await factory.for(User).create(1);

      const zone = await factory.for(Zone).create(1);

      await factory.for(ZonePermissions).create(1, {
        zoneId: zone.id,
        userId: authorizedUser.id,
        accessPermissions: [ZoneAccessPermission.READ],
      });

      await factory
        .for(ResourceRecord)
        .state('NS')
        .create(1, { zoneId: zone.id });

      const { data, errors } = await execute(
        `query {
            zone(zoneId: "${zone.id}") {
              domainName
              id
              resourceRecords {
                host
                type
              }
            }
          }`,
        await getTestContext(user.id),
      );

      expect(data).toBeNull();
      expect(errors).toBeDefined();
      expect(errors![0].message).toBe(
        'Access denied! You need to be authorized to perform this action!',
      );
    });
  });

  test('Create Zone & Permissions Mutation', async () => {
    const user = await factory
      .for(User)
      .state(UserRole.ADMIN)
      .create(1);

    const createZoneResponse = await execute(
      `mutation {
        createZone(
          input: {
            zoneOwnerUserId: "${user.id}"
            domainName: "example.com",
            contact: "me.example.com.",
            ns: "ns1.kristianjones.dev."
          }
        ) {
          domainName
          id
        }
      }
    `,
      await getTestContext(user.id),
    );

    expect(createZoneResponse.data.createZone.domainName).toBe('example.com');
    expect(createZoneResponse.errors).toBeUndefined();
    expect(
      Zone.getUserZone(
        user,
        createZoneResponse.data.createZone.id,
        ZoneAccessPermission.ADMIN,
      ),
    ).resolves.not.toThrow();
  });
});
