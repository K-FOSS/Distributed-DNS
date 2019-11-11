// API/src/Modules/Subscribers/UpdateSubscriberInput.ts
import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class UpdateSubscriberInput {
  @Field({ nullable: true })
  name?: string;

  @Field(() => [ID])
  addZoneIds: string[];

  @Field(() => [ID])
  removeZoneIds: string[];
}
