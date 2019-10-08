// API/src/Modules/Utilities/CreateUtilityInput.ts
import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateUtilityInput {
  @Field()
  name: string;
}
