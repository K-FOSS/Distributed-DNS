// API/src/Modules/ResourceRecords/ResourceRecordResolver.test.ts
import { factory } from 'API/Library/Factory';
import { User } from '../Users/UserModel';
import { Zone } from 'API/Modules/Zones/ZoneModel';
import {
  ZoneAccessPermission,
  ZonePermissions,
} from 'API/Modules/Zones/ZonePermissionModel';
import { execute } from 'API/Library/execute';
import { getTestContext } from 'API/Context';
import { ResourceRecordType } from './ResourceRecordTypes';

describe('Resource Records Resolver', () => {
  describe('Create Resource Records', () => {
    describe('NS Records', () => {
      test('Create NS Record', async () => {
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

        const { data, errors } = await execute(
          `mutation {
          createValueResourceRecord(
            input: {
              zoneId: "${zone.id}"
              recordType: NS
              value: "ns1.kristianjones.dev."
              host: "@"
            }
          ) {
            domainName
            resourceRecords {
              type
              host
              data
            }
          }
        }
        `,
          await getTestContext(user.id),
        );

        expect(data.createValueResourceRecord.domainName).toBe(zone.domainName);

        expect(data.createValueResourceRecord.resourceRecords[0].type).toBe(
          ResourceRecordType.NS,
        );

        expect(data.createValueResourceRecord.resourceRecords[0].host).toBe(
          '@',
        );

        expect(
          data.createValueResourceRecord.resourceRecords[0].data,
        ).toMatchInlineSnapshot(`"{\\"value\\":\\"ns1.kristianjones.dev.\\"}"`);

        expect(errors).toBeUndefined();
      });
    });
  });
});
