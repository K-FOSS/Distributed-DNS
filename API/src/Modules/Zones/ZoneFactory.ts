// API/src/Modules/Zones/ZoneFactory.ts
import { DeepEntityPartial } from '@entity-factory/core';
import { TypeormBlueprint } from '@entity-factory/typeorm';
import { Zone } from './ZoneModel';
import { ZoneSettings } from './ZoneSettingsModel';

export class ZoneFactory extends TypeormBlueprint<Zone> {
  constructor() {
    super();

    this.type(Zone);

    this.define(
      async ({ faker, factory }): Promise<DeepEntityPartial<Zone>> => {
        const zoneSettings = await factory.for(ZoneSettings).create(1);
        return {
          domainName: faker.internet.domainName(),
          zoneSettingsId: zoneSettings.id,
        };
      },
    );
  }
}
