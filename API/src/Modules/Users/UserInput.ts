// API/src/Modules/Users/UserInput.ts
import { InputType, Field } from 'type-graphql';
import { User } from './UserModel';
import { IsEmail, Validate } from 'class-validator';
import {
  UniqueUsernameConstraint,
  UniqueEmailConstraint,
} from '../Auth/AuthValidator';

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  @Validate(UniqueUsernameConstraint)
  username: string;

  @Field()
  @IsEmail()
  @Validate(UniqueEmailConstraint)
  email: string;

  @Field()
  password: string;
}
