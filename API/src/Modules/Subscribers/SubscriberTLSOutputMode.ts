// API/src/Modules/Subscribers/SubscriberTLSOutput.ts
import { registerEnumType } from 'type-graphql';

export enum SubscriberTLSOutputMode {
  DUAL = 'Dual',
  SINGLE = 'Single',
}

registerEnumType(SubscriberTLSOutputMode, {
  name: 'SubscriberTLSOutputMode',
});
