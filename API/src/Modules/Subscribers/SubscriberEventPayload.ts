// API/src/Modules/Subscribers/SubscriberEventPayload.ts
import { ObjectType, registerEnumType, Field, ID } from 'type-graphql';
import { SubscriberEntities } from './SubscriberModel';

export enum SubscriberEventPayloadType {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

registerEnumType(SubscriberEventPayloadType, {
  name: 'SubscriberPayloadType',
});

@ObjectType()
export class SubscriberEventPayload {
  @Field(() => SubscriberEventPayloadType)
  eventType: SubscriberEventPayloadType;

  @Field(() => ID)
  id: string;

  @Field(() => SubscriberEntities)
  entity: typeof SubscriberEntities;
}
