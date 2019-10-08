// API/src/Modules/Configurations/InitialConfigurationInput.ts
import { Field, InputType } from 'type-graphql';
import { UserInput } from '../Users/UserInput';

@InputType()
export class InitialConfigurationInput {
  @Field(() => UserInput)
  initialUser: UserInput;
}
