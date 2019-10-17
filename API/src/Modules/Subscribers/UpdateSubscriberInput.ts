// API/src/Modules/Subscribers/UpdateSubscriberInput.ts
import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class UpdateSubscriberInput {
  @Field(() => [ID])
  updateZoneIds: string[];
}
