// API/src/Modules/Zones/ZonePermissionFactory.ts
import { DeepEntityPartial } from '@entity-factory/core';
import { TypeormBlueprint } from '@entity-factory/typeorm';
import { ZonePermissions } from './ZonePermissionModel';
import { Zone } from './ZoneModel';

export class ZonePermissionFactory extends TypeormBlueprint<ZonePermissions> {
  constructor() {
    super();

    this.type(ZonePermissions);

    this.define(
      async ({ factory }): Promise<DeepEntityPartial<ZonePermissions>> => {
        const zone = await factory.for(Zone).create(1);
        return {
          zoneId: zone.id,
        };
      },
    );
  }
}
