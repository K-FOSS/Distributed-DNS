// API/src/Modules/Auth/AuthInput.ts
import { Field, InputType } from 'type-graphql';

@InputType()
export class LoginInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@InputType()
export class RequestPasswordResetInput {
  @Field()
  email: string;
}

@InputType()
export class ResetPasswordInput {
  @Field()
  token: string;

  @Field()
  password: string;
}
