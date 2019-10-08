// Web/UI/Components/Providers/Session/SessionProvider.tsx
import React, {
  createContext,
  useMemo,
  PropsWithChildren,
  useRef,
  useEffect,
  useState,
  useContext,
} from 'react';
import { CurrentUserFragment } from './User.gen';
import { useCurrentUserQuery } from './currentUser.gen';
import { UserRole } from 'UI/GraphQL/graphqlTypes.gen';
import { useToken } from './useToken';

interface Context {
  currentUser: CurrentUserFragment | undefined;
  roles: UserRole[];
}

const SessionContext = createContext<Context>({
  currentUser: undefined,
  roles: [UserRole.Guest],
});

export function SessionProvider({
  children,
}: PropsWithChildren<{}>): React.ReactElement {
  const { token } = useToken();
  const [cache, setCache] = useState<'network-only' | undefined>(undefined);
  const { data, refetch } = useCurrentUserQuery({ fetchPolicy: cache });

  const isFirstRun = useRef(true);
  useEffect(() => {
    async function test(): Promise<void> {
      if (typeof refetch === 'function') {
        setCache('network-only');
        await refetch();
        setCache(undefined);
      }
    }

    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    test();
  }, [token, refetch]);

  const currentUser = useMemo(
    () => (data && data.currentUser ? data.currentUser : undefined),
    [data],
  );

  const roles = useMemo(
    () => (currentUser ? currentUser.roles : [UserRole.Guest]),
    [currentUser],
  );

  return (
    <SessionContext.Provider value={{ currentUser, roles }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession(): Context {
  return useContext(SessionContext);
}
