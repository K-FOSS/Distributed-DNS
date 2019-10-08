// API/src/Modules/ResourceRecords/ResourceRecordFactory.ts
import { DeepEntityPartial } from '@entity-factory/core';
import { TypeormBlueprint } from '@entity-factory/typeorm';
import { ResourceRecord } from './ResourceRecordModel';
import { ResourceRecordType } from './ResourceRecordTypes';

export class ResourceRecordFactory extends TypeormBlueprint<ResourceRecord> {
  constructor() {
    super();

    this.type(ResourceRecord);

    this.state(
      ResourceRecordType.A,
      async ({
        faker,
        factory,
      }): Promise<DeepEntityPartial<ResourceRecord>> => ({
        type: ResourceRecordType.A,
        host: faker.internet.domainSuffix(),
        data: JSON.stringify({ value: faker.internet.ip() }),
      }),
    );

    this.state(
      ResourceRecordType.NS,
      async ({
        faker,
        factory,
      }): Promise<DeepEntityPartial<ResourceRecord>> => ({
        type: ResourceRecordType.NS,
        host: faker.internet.domainSuffix(),
        data: JSON.stringify({ value: faker.internet.domainName() }),
      }),
    );

    this.define(async () => ({}));
  }
}
