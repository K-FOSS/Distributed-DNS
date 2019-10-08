// API/src/Modules/Users/UserResolver.ts
import { Resolver, Query, Arg } from 'type-graphql';
import { User } from './UserModel';

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return User.find();
  }

  @Query(() => User)
  async user(@Arg('userId') userId: string): Promise<User> {
    return User.findOneOrFail(userId);
  }
}
