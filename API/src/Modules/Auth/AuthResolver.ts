// API/Modules/Auth/AuthResolver.ts
import {
  Resolver,
  Mutation,
  Arg,
  ArgumentValidationError,
  Query,
  Ctx,
} from 'type-graphql';
import { AuthResponse, RegisterResponse } from './AuthResponse';
import { LoginInput, RequestPasswordResetInput } from './AuthInput';
import { User } from 'API/Modules/Users/UserModel';
import { hasSetup } from '../Utilities/hasSetup';
import { AuthContext } from 'API/Context';
import { CurrentUser } from './CurrentUser';
import { UserInput } from '../Users/UserInput';

@Resolver()
export class AuthResolver {
  @Query(() => CurrentUser, { nullable: true })
  async currentUser(@Ctx() { currentUser }: AuthContext): Promise<CurrentUser> {
    return currentUser;
  }

  @Mutation(() => AuthResponse)
  async login(@Arg('input') { username, password }: LoginInput): Promise<
    AuthResponse
  > {
    const user = await User.findOne({ where: { username } });
    if (!user)
      throw new ArgumentValidationError([
        {
          property: 'username',
          constraints: {
            isValid: 'User not found',
          },
          children: [],
        },
      ]);

    return { token: user.generateToken(password), currentUser: user };
  }

  @hasSetup(true)
  @Mutation(() => RegisterResponse)
  async register(@Arg('input')
  {
    username,
    password,
    email,
  }: UserInput): Promise<RegisterResponse> {
    const user = User.create({ username, email });
    await user.setPassword(password);
    await user.save();
    return {
      success: true,
      currentUser: user,
      token: user.generateToken(password),
    };
  }

  @Mutation(() => Boolean)
  async resetPasswordReset(@Arg('input')
  {
    email,
  }: RequestPasswordResetInput): Promise<boolean> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new ArgumentValidationError([
        {
          property: 'email',
          constraints: {
            isValid: 'Email not found.',
          },
          children: [],
        },
      ]);
    }

    // await user.requestUserPasswordReset();
    return true;
  }
}
