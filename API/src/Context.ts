// API/Context.ts
import { User } from 'API/Modules/Users/UserModel';
import { Context as KoaContext } from 'koa';
import { getCurrentUser } from 'API/Modules/Auth/AuthController';

export interface Context {
  currentUser?: User;
}

export interface AuthContext extends Context {
  currentUser: User;
}

export async function getContext(ctx: KoaContext): Promise<Context> {
  return {
    currentUser: await getCurrentUser(ctx),
  };
}

let testCurrentUser: User | undefined;

export async function getTestContext(currentUserId?: string): Promise<Context> {
  if (currentUserId) {
    testCurrentUser = await User.findOne({ where: { id: currentUserId } });
  }
  return {
    currentUser: testCurrentUser,
  };
}
