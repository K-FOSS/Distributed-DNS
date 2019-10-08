// API/src/Modules/Users/UserRole.ts
import { registerEnumType } from 'type-graphql';

export enum UserRole {
  GUEST = 'GUEST',
  USER = 'USER',
  ADMIN = 'ADMIN',
}

registerEnumType(UserRole, { name: 'UserRole' });
