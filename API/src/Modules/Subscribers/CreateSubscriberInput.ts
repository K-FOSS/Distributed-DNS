//  API/src/Modules/Subscribers/CreateSubscriberInput.ts
import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateSubscriberInput {
  @Field(() => [String])
  zoneIds: string[];
}
