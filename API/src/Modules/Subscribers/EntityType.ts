// API/src/Modules/Subscribers/EntityType.ts
import { registerEnumType } from 'type-graphql';

export enum EntityType {
  TLS = 'TLS',
  ZONE = 'Zone',
}

registerEnumType(EntityType, {
  name: 'EntityType',
});
