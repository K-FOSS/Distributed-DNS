// API/src/API/Middleware/AuthChecker.ts
import { AuthChecker } from 'type-graphql';
import { Context } from 'API/Context';
import { UserRole } from '../Users/UserRole';

export const authChecker: AuthChecker<Context> = (
  { root, args, context: { currentUser }, info },
  roles,
): boolean => {
  // If no roles are being requested then just check the user is logged in.
  if (roles.length === 0) return currentUser !== undefined;

  // If no user then no role to check.
  if (!currentUser) return false;

  if (roles.every((role) => currentUser.roles.includes(role as UserRole)))
    return true;

  // no roles matched, restrict access
  return false;
};
