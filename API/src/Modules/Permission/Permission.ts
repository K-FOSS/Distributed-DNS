// API/src/Modules/Permission/Permission.ts
import { registerEnumType } from 'type-graphql';

export enum Permission {
  READ = 'READ',
  WRITE = 'WRITE',
  ADMIN = 'ADMIN',
}

registerEnumType(Permission, { name: 'Permission' });
