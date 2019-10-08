// API/Modules/Auth/AuthController.ts
import { hash, compare } from 'bcryptjs';
import { Context } from 'koa';
import { User } from 'API/Modules/Users/UserModel';
import { sign, verify } from 'jsonwebtoken';
import { config } from 'API/Config';
import { AuthenticationError } from 'apollo-server-koa';

export interface AuthPayload {
  userId: string;
}

/**
 * Salts & Hashes a plaintext password
 * @param password Plain Text password
 * @returns Hashed and salted password.
 */
export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12);
}

/**
 * Checks is a provided password is the correct password for the hashed password
 * @param plainText User's PlainText Password
 * @param hashedPassword User's DB Record
 * @returns If the plainText password is the correct password
 */
export async function validatePassword(
  plainText: string,
  hashedPassword: string,
): Promise<boolean> {
  return compare(plainText, hashedPassword);
}

export function generateToken(user: User): string {
  const payload: AuthPayload = { userId: user.id };
  return sign(payload, config.secretKey);
}

/**
 * Verifies JWT and gets the User from the UserId decoded from JWT
 * @param token JWT Token
 * @returns Returns User extracted from passed JWT Token
 */
async function getUserFromToken(token: string): Promise<User> {
  let payload;
  try {
    payload = verify(token, config.secretKey) as AuthPayload;
  } catch (e) {}
  if (payload && payload.userId) {
    const user = await User.findOne(payload.userId);
    if (!user)
      throw new AuthenticationError(
        `Cannot find User for id ${payload.userId}`,
      );
    return user;
  }
  throw new AuthenticationError('Invalid token');
}

/**
 * Extracts user from Koa Headers
 * @param ctx Koa Context
 * @returns User if Authorization Header is valid
 */
export async function getCurrentUser(ctx: Context): Promise<User | undefined> {
  const authorization = ctx.headers.authorization;

  if (!authorization) return;

  const token: string = authorization.replace(/^Bearer\s/, '');
  return getUserFromToken(token);
}
