//  API/src/Modules/Subscribers/SubscriberInput.ts
import { InputType, Field } from 'type-graphql';
import { SubscriberType } from './SubscriberType';

@InputType()
export class SubscriberInput {
  @Field()
  name: string;

  @Field(() => SubscriberType)
  type: SubscriberType;
}
