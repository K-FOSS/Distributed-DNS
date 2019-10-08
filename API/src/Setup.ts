// API/src/alias.ts
import 'reflect-metadata';
import alias from 'module-alias';
import { resolve } from 'path';

alias.addAlias('API', resolve(__dirname));
