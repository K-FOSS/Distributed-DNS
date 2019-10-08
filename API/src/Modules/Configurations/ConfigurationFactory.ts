// API/src/Modules/Configurations/ConfigurationFactory.ts
import { DeepEntityPartial } from '@entity-factory/core';
import { TypeormBlueprint } from '@entity-factory/typeorm';
import { Configuration } from './ConfigurationModel';

export class ConfigurationFactory extends TypeormBlueprint<Configuration> {
  constructor() {
    super();

    this.type(Configuration);

    this.define(
      async ({
        faker,
        factory,
      }): Promise<DeepEntityPartial<Configuration>> => ({ id: 1 }),
    );
  }
}
