// API/Modules/Auth/AuthResponse.ts
import { ObjectType, Field } from 'type-graphql';
import { CurrentUser } from './CurrentUser';

@ObjectType()
export class AuthResponse {
  @Field(() => String)
  token: Promise<string>;

  @Field(() => CurrentUser)
  currentUser: CurrentUser;
}

@ObjectType()
export class RegisterResponse {
  @Field()
  success: boolean;

  @Field(() => String)
  token: Promise<string>;

  @Field(() => CurrentUser)
  currentUser: CurrentUser;
}
