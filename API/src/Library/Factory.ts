// API/src/Library/Factory.ts
import { Blueprint, EntityFactory } from '@entity-factory/core';
import { TypeormAdapter } from '@entity-factory/typeorm';
import glob from 'glob';
import { resolve } from 'path';
import { getConnectionArgs } from './getDbConnection';

const typeormAdapter = new TypeormAdapter({
  ...getConnectionArgs(true),
  logging: false,
});

let blueprints: Blueprint[] = [];

const filenames = glob.sync(resolve(`${__dirname}/../Modules/*/*Factory.ts`));
for (const filename of filenames) {
  const module = require(filename);
  for (const moduleExport of Object.values(module)) {
    blueprints.push(moduleExport as Blueprint);
  }
}

export const factory = new EntityFactory({
  adapter: typeormAdapter,
  blueprints,
});
