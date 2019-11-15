// API/src/Modules/Zones/ZoneSettingsFactory.ts
import { DeepEntityPartial } from '@entity-factory/core';
import { TypeormBlueprint } from '@entity-factory/typeorm';
import { ZoneSettings } from './ZoneSettingsModel';

export class ZoneSettingsFactory extends TypeormBlueprint<ZoneSettings> {
  constructor() {
    super();

    this.type(ZoneSettings);

    this.define(
      async ({ factory, faker }): Promise<DeepEntityPartial<ZoneSettings>> => ({
        contact: faker.internet.email(),
      }),
    );
  }
}
