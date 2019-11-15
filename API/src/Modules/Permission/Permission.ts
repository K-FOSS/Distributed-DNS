// API/src/Modules/Permission/Permission.ts
import { registerEnumType } from 'type-graphql';

export enum Permission {
  READ = 'READ',
  WRITE = 'WRITE',
  ADMIN = 'ADMIN',
}

registerEnumType(Permission, { name: 'Permission' });

export async function getPermission(
  permissions: Permission[],
): Promise<Permission> {
  if (permissions.includes(Permission.ADMIN)) return Permission.ADMIN;
  else if (permissions.includes(Permission.WRITE)) return Permission.WRITE;
  else if (permissions.includes(Permission.READ)) return Permission.READ;
  else throw new Error('INVALID INPUT');
}
