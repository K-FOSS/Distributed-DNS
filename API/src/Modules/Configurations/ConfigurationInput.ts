// API/src/Modules/Configurations/ConfigurationInput.ts
import { InputType, Field } from 'type-graphql';

@InputType()
export class ConfigurationInput {
  @Field()
  name: string;
}
