//  API/src/Modules/Subscribers/SubscriberInput.ts
import { InputType, Field } from 'type-graphql';

@InputType()
export class SubscriberInput {
  @Field()
  name: string;
}
