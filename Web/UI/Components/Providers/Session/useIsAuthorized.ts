// Web/UI/Components/Providers/Session/useIsAuthorized.ts
import { useSession } from './SessionProvider';
import { UserRole } from 'UI/GraphQL/graphqlTypes.gen';
import { useMemo } from 'react';

export function useIsAuthorized(requiredRoles: UserRole[]): boolean {
  const { roles } = useSession();

  return useMemo(
    () => requiredRoles.every((requiredRole) => roles.includes(requiredRole)),
    [roles, requiredRoles],
  );
}
