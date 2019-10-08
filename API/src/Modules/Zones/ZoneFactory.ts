// API/src/Modules/Zones/ZoneFactory.ts
import { DeepEntityPartial } from '@entity-factory/core';
import { TypeormBlueprint } from '@entity-factory/typeorm';
import { Zone } from './ZoneModel';

export class ZoneFactory extends TypeormBlueprint<Zone> {
  constructor() {
    super();

    this.type(Zone);

    this.define(
      async ({ faker, factory }): Promise<DeepEntityPartial<Zone>> => {
        return {
          domainName: faker.internet.domainName(),
          contact: faker.internet.email(),
        };
      },
    );
  }
}
