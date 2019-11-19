// API/src/Modules/Subscribers/SubscriberType.ts
import { registerEnumType } from 'type-graphql';

export enum SubscriberType {
  TLS = 'TLS',
  ZONE = 'Zone',
}

registerEnumType(SubscriberType, {
  name: 'SubscriberType',
});
