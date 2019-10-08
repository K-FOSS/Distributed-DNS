// Web/bin/watch.ts
import { build } from './lib/build';

const distServer = '../dist/server';
build(true).then(() => import(distServer));
